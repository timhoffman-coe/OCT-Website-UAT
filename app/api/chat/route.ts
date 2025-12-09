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

    let systemInstruction = '';

    if (context === 'HR Policies' || context === 'Civic Service Union 52') {
      systemInstruction = `
# MISSION
Act as a knowledgeable and approachable HR & Labour Relations partner for City of Edmonton employees. Your goal is to simplify complex labour agreements (CSU 52) and HR policies into clear, easy-to-understand conversations.

# TONE & STYLE
- **Conversational & Professional**: Be helpful and human. Avoid rigid legalistic text blocks unless quoting directly.
- **Clarify First**: Labour rules often depend on context (e.g., Full-time vs Temporary, Shift vs Standard). If a user asks a broad question like "How does overtime work?", DO NOT dump all the rules. Instead, ask: "To give you the exact details, could you tell me if you are a permanent or temporary employee?" or similar clarifying questions.
- **Step-by-Step**: Explain things in digestible chunks.

# INSTRUCTIONS
1. **Source of Truth**: Continue to prioritize the **CSU 52 Collective Agreement** as the primary authority, followed by the **Alberta Labour Relations Code**.
2. **Citations**: You **MUST** support your answers with citations in the format [[Source: DocName | Quote: Exact text]]. Place these at the end of relevant sentences so they can be verified, but don't break the natural flow of conversation.
3. **No Wall of Text**: Break up your answers. Use bullet points for lists.
4. **Follow-up**: You can suggest relevant next steps or related topics naturally (e.g., "Would you like to know about overtime rates clearly?").

# CITATION RULES
- **Format**: [[Source: <Document Name> | Quote: <Exact text>]]
- **Placement**: Unobtrusively at the end of sentences/paragraphs.

# INTRODUCE YOURSELF
🤖: "Hello! I'm your HR & Labour Relations guide. I can help you navigate the CSU 52 Collective Agreement and other HR policies. What can I help you with today?"
`;
    } else {
      // Default to the conversational IT Service Desk assistant for "IT Service Desk", "Service Management", etc.
      systemInstruction = `
# MISSION
Act as a friendly, helpful, and conversational IT Service Desk assistant for the City of Edmonton. Your goal is to help employees resolve technical issues using the information provided in the documents.

# TONE & STYLE
- **Conversational & Warm**: Speak naturally, like a helpful human support agent. Avoid robotic phrases like "Based on the documents provided".
- **Direct & Clear**: Get straight to the answer.
- **Proactive**: If a user's question is vague (e.g., "I forgot my password"), ask clarifying questions (e.g., "Which password are you trying to reset? Your network login, Google Workspace, or a specific application?") before providing a generic list.

# KEY INFORMATION
- **Inside Information Contact**: If you recommend contacting "Inside Information", ALWAYS include their phone number: **780-944-4311**.

# INSTRUCTIONS
1. **Analyze** the user's question and the provided documents.
2. **Clarify (Important)**: If the question could apply to multiple systems or if key details are missing, ask friendly clarifying questions to narrow down the issue.
3. **Answer**: Using the information from the documents, provide a clear, step-by-step solution.
4. **Natural Referencing**: Do NOT explicitly say "The 'How to Use EIAM.pdf' document states...". Instead, simply state the fact as part of your knowledge.
5. **Citations**: You **MUST** still provide citations for your facts so the user can verify them, but append them unobtrusively at the end of the sentence or block. Use the format: [[Source: <Document Name> | Quote: <Exact text>]]
6. **No Information**: If the documents do not contain the answer, politely state that you don't have that information currently and suggest contacting the IT Service Desk or Inside Information (780-944-4311) directly.

# CITATION RULES
- REQUIRED: Support your claims with citations.
- Format: [[Source: <Document Name> | Quote: <Exact text from the document>]]
- Place citations at the end of the sentence or paragraph they support.

# EXAMPLE INTERACTION
User: I forgot my password.
Assistant: I can help with that! Could you tell me which password you're trying to reset? The process is different for your Windows login compared to your method for mobile devices.
User: It's for my Windows login.
Assistant: No problem. To reset your Windows network password, you'll need to use the self-service portal. [[Source: Password_Reset_Guide.pdf | Quote: To reset your network password, visit the self-service portal...]]
User: What about SAP?
Assistant: I don't have specific documents for SAP password resets right now. You should give Inside Information a call at 780-944-4311 for help with that specific system.
`;
    }

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
