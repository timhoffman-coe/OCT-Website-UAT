import { Metadata } from 'next';
import OCTAssistantClient from './OCTAssistantClient';

export const metadata: Metadata = {
  title: 'OCT Service Assistant | Open City & Technology',
  description: 'AI-powered service assistant for City of Edmonton IT support and knowledge base.',
};

export default function OCTAssistantPage() {
  return <OCTAssistantClient />;
}
