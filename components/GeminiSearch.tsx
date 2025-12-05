'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, Send, Loader2, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

import { createPortal } from 'react-dom';

interface GeminiSearchProps {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}

export default function GeminiSearch({ isOpen: externalIsOpen, onOpenChange }: GeminiSearchProps = {}) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    const isControlled = typeof externalIsOpen !== 'undefined';
    const isOpen = isControlled ? externalIsOpen : internalIsOpen;

    const setIsOpen = (value: boolean) => {
        if (onOpenChange) {
            onOpenChange(value);
        }
        if (!isControlled) {
            setInternalIsOpen(value);
        }
    };

    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState({ top: 0, right: 0, width: 0 });
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Initialize greeting when chat opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                role: 'assistant',
                content: "👋 Hi! I'm the OCT Site Guide. I can help you find dashboards, teams, policies, and more.\n\nTry asking:\n- *Where is the org chart?*\n- *Show me the budget dashboard.*"
            }]);
        }
    }, [isOpen]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const updatePosition = () => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + 12, // Add some spacing
                right: window.innerWidth - rect.right,
                width: Math.max(400, rect.width) // Minimum width 400px
            });
        }
    };

    const handleExpand = () => {
        updatePosition();
        setIsOpen(true);
        // Add resize listener to update position
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);
    };

    const handleClose = () => {
        setIsOpen(false);
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMessage = query.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setQuery('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/site-search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: userMessage }),
            });

            const data = await response.json();

            if (data.response) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
            }
        } catch (error) {
            console.error('Search error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please check your connection.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const ChatInterface = (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[1px]"
                onClick={handleClose}
            />

            {/* Chat Drawer */}
            <div
                className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-[100] flex flex-col border-l border-gray-200 animate-in slide-in-from-right duration-300"
            >
                {/* Header */}
                <div className="bg-primary-blue px-6 py-4 flex justify-between items-center shrink-0">
                    <div className="flex items-center space-x-3 text-white">
                        <MessageSquare className="h-6 w-6" />
                        <div>
                            <h3 className="font-bold text-lg leading-none">OCT Site Guide</h3>
                            <p className="text-xs text-blue-100 mt-1">AI-powered navigation assistant</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Messages Area */}
                <div
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50"
                >
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${msg.role === 'user'
                                    ? 'bg-primary-blue text-white'
                                    : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                                    }`}
                            >
                                {msg.role === 'assistant' ? (
                                    <div className="text-sm text-gray-800 leading-relaxed">
                                        <ReactMarkdown
                                            components={{
                                                a: ({ node, ...props }) => (
                                                    <a
                                                        {...props}
                                                        className="text-primary-blue font-bold underline decoration-2 underline-offset-2 hover:text-blue-800 hover:decoration-blue-800 transition-colors"
                                                    />
                                                ),
                                                p: ({ node, ...props }) => (
                                                    <p {...props} className="mb-2 last:mb-0" />
                                                ),
                                                ul: ({ node, ...props }) => (
                                                    <ul {...props} className="list-disc pl-4 mb-2 space-y-1" />
                                                ),
                                                li: ({ node, ...props }) => (
                                                    <li {...props} className="pl-1" />
                                                )
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    msg.content
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                                <Loader2 className="h-5 w-5 animate-spin text-primary-blue" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white border-t border-gray-100">
                    <form onSubmit={handleSendMessage} className="relative flex items-center">
                        <input
                            autoFocus
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Type your question..."
                            className="w-full pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue bg-gray-50 focus:bg-white transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!query.trim() || isLoading}
                            className="absolute right-2 p-1.5 text-primary-blue hover:bg-blue-50 rounded-full disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );

    return (
        <div ref={containerRef} className="relative w-full md:w-96">
            {/* Initial Search Bar State */}
            <div className="relative transition-all duration-300">
                <div className="relative group">
                    <input
                        type="text"
                        onFocus={handleExpand}
                        onClick={handleExpand}
                        placeholder="Ask OCT Assistant..."
                        className="w-full px-4 py-2 pl-10 pr-4 text-sm rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all shadow-sm backdrop-blur-sm cursor-pointer"
                        readOnly
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300 group-hover:text-white transition-colors" />
                </div>
            </div>

            {/* Render Portal */}
            {mounted && isOpen && createPortal(ChatInterface, document.body)}
        </div>
    );
}
