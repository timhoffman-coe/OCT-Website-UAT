import { reportError } from '@/lib/report-client-error';

export const generateAnswer = async (
  question: string
): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    reportError(error instanceof Error ? error : String(error), { module: 'chat-service' });
    if (error instanceof Error) {
      return `Sorry, I encountered an error: ${error.message}`;
    }
    return 'Sorry, I encountered an unknown error while trying to generate an answer.';
  }
};
