import { Document } from '../types';

export const generateAnswer = async (
  question: string,
  documents: Document[],
  context: string
): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, documents, context }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Chat service error:', error);
    if (error instanceof Error) {
      return `Sorry, I encountered an error: ${error.message}`;
    }
    return 'Sorry, I encountered an unknown error while trying to generate an answer.';
  }
};
