'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWindow from '@/components/oct-assistant/ChatWindow';
import CategorySelection from '@/components/oct-assistant/CategorySelection';
import BotIcon from '@/components/icons/BotIcon';
import { Document, Message, Category } from './types';
import { generateAnswer } from './services/chatService';
import { fetchDriveDocuments } from './services/documentService';
import { getAvailableCategories } from './services/categoryService';

export default function OCTAssistantClient() {
  const categories = getAvailableCategories();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isRepoLoading, setIsRepoLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    if (!selectedCategory) return;

    const loadRepository = async () => {
      setIsRepoLoading(true);
      try {
        const docs = await fetchDriveDocuments(selectedCategory);
        setDocuments(docs);
        setMessages([
          {
            id: crypto.randomUUID(),
            role: 'system',
            content: `Hello! I am connected to the ${selectedCategory} knowledge base. How can I help you today?`,
          },
        ]);
      } catch (error) {
        console.error('Failed to load documents', error);
      } finally {
        setIsRepoLoading(false);
      }
    };
    loadRepository();
  }, [selectedCategory]);

  const handleSendMessage = async (userMessage: string) => {
    if (!selectedCategory) return;

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMessage,
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsChatLoading(true);

    try {
      const modelResponse = await generateAnswer(userMessage, documents, selectedCategory);
      const newModelMessage: Message = {
        id: crypto.randomUUID(),
        role: 'model',
        content: modelResponse,
      };
      setMessages((prevMessages) => [...prevMessages, newModelMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'model',
        content: 'An error occurred while getting a response. Please try again.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const resetSelection = () => {
    setSelectedCategory(null);
    setDocuments([]);
    setMessages([]);
  };

  // Landing Page / Category Selection
  if (!selectedCategory) {
    return (
      <div className="bg-white min-h-screen">
        <Header />
        <main className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-4 bg-structural-light-gray">
          <CategorySelection
            categories={categories}
            onSelectCategory={setSelectedCategory}
          />
          <div className="mt-16 text-xs text-complement-grey-flannel">
            <p>&copy; {new Date().getFullYear()} City of Edmonton Internal Services</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Main Chat Interface
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
                City of Edmonton
              </span>
            </div>
          </h1>
          <button
            onClick={resetSelection}
            className="text-sm font-bold text-white bg-process-blue hover:bg-primary-blue transition-all shadow-md px-5 py-2 rounded-lg flex items-center border border-white/10"
          >
            &larr; <span className="ml-2">Switch Topic</span>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <main className="flex-grow container mx-auto max-w-7xl p-4 md:p-6">
        <div className="h-full w-full max-w-4xl mx-auto" style={{ height: 'calc(100vh - 280px)' }}>
          <ChatWindow
            messages={messages}
            isLoading={isChatLoading}
            onSendMessage={handleSendMessage}
            selectedCategory={selectedCategory}
            disabled={isRepoLoading}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
