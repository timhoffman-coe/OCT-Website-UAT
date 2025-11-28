import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

interface Document {
  name: string;
  content: string;
}

interface ChatRequest {
  question: string;
  documents: Document[];
  context: string;
}

const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable not set');
  }
  if (apiKey.startsWith('github_pat_')) {
    throw new Error('Invalid GEMINI_API_KEY: It looks like a GitHub PAT. Please use a Google Gemini API key.');
  }
  return new GoogleGenAI({ apiKey });
};

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { question, documents, context } = body;

    if (!question || !context) {
      return NextResponse.json(
        { error: 'Missing required fields: question and context' },
        { status: 400 }
      );
    }

    if (!documents || documents.length === 0) {
      return NextResponse.json({
        response: `I can't answer questions about ${context} because I couldn't find any documents in that folder.`
      });
    }

    const ai = getAIClient();

    const documentContext = documents
      .map(doc => `Document: ${doc.name}\nContent:\n${doc.content}`)
      .join('\n\n---\n\n');

    const systemInstruction = `You are an expert intelligent assistant for the "${context}" domain.
Your goal is to answer user questions based *strictly* and *only* on the provided documents.

Rules:
1. Use the provided documents as your ONLY source of truth.
2. If the answer is not in the documents, state clearly: "I cannot find this information in the ${context} documents."
3. Do not use outside knowledge or hallucinate.
4. Be professional, concise, and direct.

IMPORTANT: CITATION RULE
Every time you state a fact based on the documents, you MUST provide a citation immediately following the statement.
Use the exact format: [[Source: <Document Name> | Quote: <Exact text from the document>]]
Example: "Change requests require a risk assessment [[Source: Policy_v1.pdf | Quote: Changes must include a risk assessment: Low, Medium, or High]]."
Ensure the quote is a direct excerpt from the text.`;

    const userPrompt = `--- ${context.toUpperCase()} DOCUMENTS ---
${documentContext}
--- END OF DOCUMENTS ---

Now, answer the following question based only on the documents provided above.
Question: "${question}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
      },
    });

    return NextResponse.json({
      response: response.text || 'No response generated.'
    });

  } catch (error) {
    console.error('Gemini API error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `AI service error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
