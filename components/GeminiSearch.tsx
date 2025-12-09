'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Send, Loader2, MessageSquare, MessageSquarePlus, FileText, Quote } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { createPortal } from 'react-dom';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface Citation {
    source: string;
    quote: string;
}

interface GeminiSearchProps {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}

const STORAGE_KEY = 'oct_assistant_chat_history';

// --- Tooltip Component (Copied/Adapted from ChatWindow) ---
const CitationTooltip: React.FC<{ citation: Citation; index: number }> = ({ citation, index }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <span className="relative inline-block ml-1 align-super text-xs">
            <button
                className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-primary-blue bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full transition-colors cursor-help"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                aria-label={`View citation ${index + 1}`}
            >
                {index + 1}
            </button>

            {showTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-white border border-gray-200 rounded-lg shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-start gap-2 mb-2 pb-2 border-b border-gray-100">
                        <FileText className="w-3 h-3 text-gray-400 mt-1 shrink-0" />
                        <span className="text-xs font-semibold text-gray-700 break-words leading-tight">{citation.source}</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <Quote className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-gray-600 italic leading-relaxed">"{citation.quote}"</p>
                    </div>
                    {/* Triangle arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 bg-white border-b border-r border-gray-200 rotate-45"></div>
                </div>
            )}
        </span>
    );
};

// --- Formatted Message Component (Copied/Adapted from ChatWindow) ---
const FormattedMessageContent: React.FC<{ content: string }> = ({ content }) => {
    // Regex to find [[Source: ... | Quote: ...]] pattern
    // Uses non-greedy match *? to handle multiple citations
    const citationRegex = /\[\[Source:\s*(.*?)\s*\|\s*Quote:\s*(.*?)\]\]/g;

    const parts: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    let match;
    let citationIndex = 0;

    // We need to clone the regex for exec loop or use matchAll
    // exec is reliable across browsers
    while ((match = citationRegex.exec(content)) !== null) {
        // Add text before the citation
        if (match.index > lastIndex) {
            parts.push(content.substring(lastIndex, match.index));
        }

        const source = match[1];
        const quote = match[2];

        parts.push(
            <CitationTooltip
                key={`cite-${match.index}`}
                citation={{ source, quote }}
                index={citationIndex++}
            />
        );

        lastIndex = citationRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < content.length) {
        parts.push(content.substring(lastIndex));
    }

    // If no citations found, just return markdown
    if (parts.length === 0) {
        return (
            <ReactMarkdown
                components={{
                    a: ({ node, ...props }) => (
                        <a
                            {...props}
                            className="text-primary-blue font-bold underline decoration-2 underline-offset-2 hover:text-blue-800 hover:decoration-blue-800 transition-colors"
                            target={props.href?.startsWith('/') ? undefined : '_blank'}
                            rel={props.href?.startsWith('/') ? undefined : 'noopener noreferrer'}
                        />
                    ),
                    p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
                    ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-4 mb-2 space-y-1" />,
                    li: ({ node, ...props }) => <li {...props} className="pl-1" />,
                }}
            >
                {content}
            </ReactMarkdown>
        );
    }

    // If citations exist, we need to carefully render the mixed parts
    // The 'parts' array contains strings (markdown text) and Elements (tooltips)
    // We can't wrap a React element inside ReactMarkdown directly as text.
    // Strategy: 
    // 1. Render markdown for the text parts.
    // 2. Insert Tooltips in between.
    // Note: Markdown boundaries (like bolding spanning across citations) might break, 
    // but citations effectively act as inline elements/punctuation, so it's usually fine.

    return (
        <div>
            {parts.map((part, i) => {
                if (typeof part === 'string') {
                    return (
                        <span key={i}>
                            <ReactMarkdown
                                components={{
                                    a: ({ node, ...props }) => (
                                        <a
                                            {...props}
                                            className="text-primary-blue font-bold underline decoration-2 underline-offset-2 hover:text-blue-800 hover:decoration-blue-800 transition-colors"
                                        />
                                    ),
                                    // Render paragraphs as spans to maintain inline flow with citations if needed, 
                                    // but usually block flow is better. Let's stick to standard P but remove margins for inline feel?
                                    // Actually, standard markdown is safer.
                                    p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0 inline-block" />,
                                    ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-4 mb-2 space-y-1" />,
                                    li: ({ node, ...props }) => <li {...props} className="pl-1" />,
                                }}
                            >
                                {part}
                            </ReactMarkdown>
                        </span>
                    );
                }
                return part; // The Tooltip Component
            })}
        </div>
    );
};

const LoadingText = () => {
    const [text, setText] = useState("Analyzing your question...");

    useEffect(() => {
        const messages = [
            "Analyzing your question...",
            "Identifying the right department...",
            "Searching knowledge base...",
            "Reading documents...",
            "Formulating answer..."
        ];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % messages.length;
            setText(messages[i]);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return <span className="text-sm font-medium text-gray-500 animate-pulse">{text}</span>;
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
        // Load history only on client mount
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setMessages(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load chat history", e);
            }
        }
    }, []);

    // Save history whenever messages change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        }
    }, [messages]);

    // Initialize greeting when chat opens (only if empty)
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                role: 'assistant',
                content: "👋 Hi! I'm the OCT Assistant. I can help you with IT issues, HR policies, or finding specific pages on this site.\n\nType a question below to get started!"
            }]);
        }
    }, [isOpen, messages.length]);

    const handleClearChat = () => {
        localStorage.removeItem(STORAGE_KEY);
        setMessages([{
            role: 'assistant',
            content: "👋 Hi! I'm the OCT Assistant. I can help you with IT issues, HR policies, or finding specific pages on this site.\n\nType a question below to get started!"
        }]);
    };

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
            const response = await fetch('/api/chat', { // Updated to unified API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: userMessage,
                    history: messages // Send full history
                }),
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
                            <h3 className="font-bold text-lg leading-none">OCT Assistant</h3>
                            <p className="text-xs text-blue-100 mt-1">AI-powered support & navigation</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={handleClearChat}
                            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                            title="Start New Chat"
                        >
                            <MessageSquarePlus className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleClose}
                            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
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
                                        <FormattedMessageContent content={msg.content} />
                                    </div>
                                ) : (
                                    msg.content
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm flex items-center space-x-3">
                                <Loader2 className="h-5 w-5 animate-spin text-primary-blue" />
                                <LoadingText />
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
                            placeholder="Type a question (e.g., 'Reset password' or 'HR policies')..."
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
