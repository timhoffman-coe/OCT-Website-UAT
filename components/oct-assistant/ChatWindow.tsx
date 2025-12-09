import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Message } from '@/app/oct-assistant/types';
import SendIcon from '@/components/icons/SendIcon';
import BotIcon from '@/components/icons/BotIcon';
import UserIcon from '@/components/icons/UserIcon';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  selectedCategory: string;
  disabled?: boolean;
}

const CitationTooltip: React.FC<{ source: string; quote: string; index: number }> = ({ source, quote, index }) => {
  return (
    <span className="relative group inline-block ml-1 align-baseline">
      <span className="cursor-help text-xs font-bold text-primary-blue bg-blue-50 px-1.5 py-0.5 rounded border border-process-blue hover:bg-process-blue hover:text-white transition-colors">
        [{index}]
      </span>

      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-dark-blue text-white text-sm rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none border border-primary-blue">
        <div className="font-semibold text-process-blue text-xs mb-1 uppercase tracking-wider">
          Source: {source}
        </div>
        <div className="italic text-gray-300 text-xs border-l-2 border-complement-grey-flannel pl-2">
          &quot;{quote}&quot;
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dark-blue"></div>
      </div>
    </span>
  );
};

const FormattedMessageContent: React.FC<{ content: string }> = ({ content }) => {
  // Pre-process content to replace internal citation format with markdown links that we can intercept
  const { processedContent, citations } = useMemo(() => {
    // Regex to match "[[Source: ... | Quote: ...]]" with flexible whitespace and case insensitivity
    const citationRegex = /\[\[\s*Source:\s*([\s\S]*?)\s*\|\s*Quote:\s*([\s\S]*?)\s*\]\]/gi;
    const citationsList: { source: string; quote: string }[] = [];

    const processed = content.replace(citationRegex, (match, source, quote) => {
      citationsList.push({ source: source.trim(), quote: quote.trim() });
      // Replace with a special markdown link format: [CITATION](citation:<index>)
      // We use the index to retrieve the source/quote later
      return `[CITATION](citation:${citationsList.length - 1})`;
    });

    return { processedContent: processed, citations: citationsList };
  }, [content]);

  const markdownComponents: Components = {
    // Intercept links to render citations
    a: ({ href, children, ...props }) => {
      if (href?.startsWith('citation:')) {
        const indexStr = href.split(':')[1];
        const index = parseInt(indexStr, 10);

        if (!isNaN(index) && citations[index]) {
          return (
            <CitationTooltip
              source={citations[index].source}
              quote={citations[index].quote}
              index={index + 1}
            />
          );
        }
      }
      // Default link rendering
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-blue hover:underline break-all"
          {...props}
        >
          {children}
        </a>
      );
    },
    // Style basic markdown elements to match the design system
    ul: (props) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
    ol: (props) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
    li: (props) => <li className="pl-1" {...props} />,
    h1: (props) => <h1 className="text-xl font-bold mb-3 mt-4 text-dark-blue first:mt-0" {...props} />,
    h2: (props) => <h2 className="text-lg font-bold mb-2 mt-3 text-dark-blue" {...props} />,
    h3: (props) => <h3 className="text-md font-bold mb-2 mt-2 text-dark-blue" {...props} />,
    p: (props) => <p className="mb-3 last:mb-0 leading-relaxed" {...props} />,
    strong: (props) => <strong className="font-bold text-dark-blue" {...props} />,
    blockquote: (props) => <blockquote className="border-l-4 border-gray-200 pl-4 italic my-2 text-gray-600" {...props} />,
    code: (props) => <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono text-red-600" {...props} />,
    pre: (props) => <pre className="bg-gray-100 rounded p-3 overflow-x-auto text-sm font-mono my-3" {...props} />,
  };

  return (
    <div className="text-dark-blue message-content">
      <ReactMarkdown
        components={markdownComponents}
        urlTransform={(value) => value} // Allow all protocols including citation:
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};
const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="text-center my-4">
        <p className="text-sm text-complement-grey-flannel px-4 py-2 bg-gray-100 rounded-full inline-block border border-gray-200">
          {message.content}
        </p>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-dark-blue flex items-center justify-center flex-shrink-0 shadow-sm">
          <BotIcon className="w-5 h-5 text-white" />
        </div>
      )}
      <div
        className={`px-4 py-3 rounded-lg max-w-md md:max-w-lg lg:max-w-xl shadow-sm ${isUser
          ? 'bg-primary-blue text-white rounded-br-none'
          : 'bg-white text-dark-blue rounded-bl-none border border-gray-200'
          }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <FormattedMessageContent content={message.content} />
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-complement-grey-flannel flex items-center justify-center flex-shrink-0 shadow-sm">
          <UserIcon className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};

const LoadingIndicator: React.FC = () => (
  <div className="flex items-start gap-3 my-4">
    <div className="w-8 h-8 rounded-full bg-dark-blue flex items-center justify-center flex-shrink-0 shadow-sm">
      <BotIcon className="w-5 h-5 text-white" />
    </div>
    <div className="px-4 py-3 rounded-lg bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-process-blue rounded-full animate-pulse"></span>
        <span className="w-2 h-2 bg-process-blue rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></span>
        <span className="w-2 h-2 bg-process-blue rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
      </div>
    </div>
  </div>
);

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, onSendMessage, selectedCategory, disabled }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="bg-white rounded shadow w-full h-full flex flex-col border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t">
        <h2 className="text-lg font-bold text-dark-blue flex items-center gap-2">
          {selectedCategory}
        </h2>
        <span className={`text-xs font-semibold px-2 py-1 rounded transition-colors duration-300 ${disabled
          ? "text-complement-grey-flannel bg-gray-200"
          : "text-green-700 bg-green-100 border border-green-200"
          }`}>
          {disabled ? "Connecting..." : "Connected to Drive"}
        </span>
      </div>
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50/50">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && <LoadingIndicator />}
        {disabled && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-complement-grey-flannel opacity-70">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-process-blue rounded-full animate-pulse"></span>
              <span className="w-2 h-2 bg-process-blue rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-process-blue rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
            </div>
            <p className="text-sm font-medium">Connecting to knowledge base...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 bg-white rounded-b">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={disabled ? "Connecting to knowledge base..." : "Ask a question..."}
            className="flex-grow w-full px-4 py-3 bg-white text-dark-blue rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-process-blue focus:border-transparent transition placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-500"
            disabled={isLoading || disabled}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || disabled}
            className="bg-primary-blue text-white p-3 rounded hover:bg-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-process-blue disabled:bg-complement-grey-flannel disabled:cursor-not-allowed transition-colors duration-200 flex-shrink-0 shadow-sm"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
