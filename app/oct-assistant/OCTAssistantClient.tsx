'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWindow from '@/components/oct-assistant/ChatWindow';
import BotIcon from '@/components/icons/BotIcon';
import { Message } from './types';
import { generateAnswer } from './services/chatService';
import { reportError } from '@/lib/report-client-error';

export default function OCTAssistantClient() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'system',
      content: '👋 Welcome! I’m the OCT Assistant. I can help you with tech support, answer questions about policies and processes, and guide you to the right pages on this site.\n\nAsk me anything to get started!',
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSendMessage = async (userMessage: string) => {
    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMessage,
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsChatLoading(true);

    try {
      // Unified API call - no documents or context needed client-side
      const modelResponse = await generateAnswer(userMessage);

      const newModelMessage: Message = {
        id: crypto.randomUUID(),
        role: 'model',
        content: modelResponse,
      };
      setMessages((prevMessages) => [...prevMessages, newModelMessage]);
    } catch (error) {
      reportError(error instanceof Error ? error : String(error), { module: 'oct-assistant' });
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'model',
        content: 'I encountered an error connecting to the server. Please try again.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      {/* Chat Header Bar */}
      <div className="bg-dark-blue shadow-md p-4">
        <div className="container mx-auto max-w-7xl flex items-center justify-between text-white">
          <h1 className="text-xl font-bold flex items-center gap-3">
            <div className="bg-white/10 p-1.5 rounded-full">
              <BotIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight">OCT Service Assistant</span>
              <span className="text-[10px] uppercase tracking-wider font-normal text-process-blue">
                Unified Support
              </span>
            </div>
          </h1>
        </div>
      </div>

      {/* Chat Area */}
      <main className="flex-grow container mx-auto max-w-7xl p-4 md:p-6">
        <div className="h-full w-full max-w-4xl mx-auto" style={{ height: 'calc(100vh - 280px)' }}>
          <ChatWindow
            messages={messages}
            isLoading={isChatLoading}
            onSendMessage={handleSendMessage}
            selectedCategory="OCT Assistant"
            disabled={false} // Always ready
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
