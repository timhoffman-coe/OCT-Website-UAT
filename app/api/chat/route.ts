import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { fetchDriveDocuments } from '../../oct-assistant/services/documentService';
import { siteMapData } from '@/lib/siteMapData';

interface Document {
  name: string;
  content: string;
}

interface ChatRequest {
  question: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
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

// Intent Classification
async function classifyIntent(question: string, ai: GoogleGenAI): Promise<'HR' | 'IT' | 'SiteSearch' | 'General'> {
  const prompt = `
    You are a classification system for the City of Edmonton OCT Assistant.
    Analyze the user's input and categorize it into exactly one of the following categories:
    
    1. 'HR': Questions about Human Resources, HR policies, overtime, leave, benefits, CSU 52, collective agreement, union, pay, holidays.
    2. 'IT': Questions about technical issues, passwords, VPN, hardware, software, wifi, printers, SAP, specialized applications, service desk.
    3. 'SiteSearch': Questions asking where to find a page, navigation, "where is...", "show me...", or looking for specific sections of the website.
    4. 'General': Greetings, junk, generic questions, or anything that doesn't fit the above.

    Input: "${question}"
    
    Output (just the category name):
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { temperature: 0 },
    });
    const text = response.text?.trim().replace(/['"]/g, '');
    if (text === 'HR' || text === 'IT' || text === 'SiteSearch') return text;
    return 'General';
  } catch (e) {
    console.error('Classification failed', e);
    return 'General';
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { question, history = [] } = body;

    if (!question) {
      return NextResponse.json({ error: 'Missing question' }, { status: 400 });
    }

    const ai = getAIClient();

    // 1. Determine Intent
    // Use last few messages for better intent classification context if needed, 
    // but for now, primarily classify the latest question.
    let intent = await classifyIntent(question, ai);
    console.log(`[Unified Chat] Intent detected: ${intent}`);

    // 2. Fetch Relevant Context
    let documents: Document[] = [];
    let systemInstruction = '';
    let contextName = '';

    if (intent === 'HR') {
      contextName = 'HR Policies / CSU 52';
      documents = await fetchDriveDocuments('HR Policies');

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
`;

    } else if (intent === 'IT') {
      contextName = 'IT Service Desk';
      documents = await fetchDriveDocuments('IT Service Desk');

      systemInstruction = `
# MISSION
Act as a friendly, helpful, and conversational IT Service Desk assistant for the City of Edmonton. Your goal is to help employees resolve technical issues using the information provided in the documents.

# TONE & STYLE
- **Conversational & Warm**: Speak naturally, like a helpful human support agent.
- **Strictly Clarify First**: If the user's question is vague (e.g., "My wifi isn't working"), you must **STOP** and ask clarifying questions first.
- **NO Guessing**: Do NOT assume the user has a specific device (e.g., Motorola, Lenovo) or is using a specific system. Ask them to confirm.
- **NO Info Dumping**: Do NOT provide a list of "try these steps" until you know *exactly* what device or system they are using. The user should not have to scroll through irrelevant instructions.

# INSTRUCTIONS
1. **Analyze** the user's question and the conversation history.
2. **Clarify (CRITICAL)**: If the device, system, or error message is not specified, ask for it.
   - Example Bad: "Here are steps for Android..." (Don't do this if they didn't say Android).
   - Example Good: "I can help with that! Are you using a City laptop, a smartphone, or a personal device?"
   - **Context Awareness**: Check the 'Conversation History' to see if the user has already answered these questions. Do NOT ask for information they just provided.
3. **Answer**: ONLY once the user has clarified the context, provide the specific steps for that situation using the documents.
4. **Natural Referencing**: Do NOT explicitly say "The 'File.pdf' document states...". Instead, simply state the fact as part of your knowledge.
5. **Citations (Strict Relevance)**: Provide citations ONLY if they are directly relevant to the specific device or system the user is asking about. Do NOT cite generic contact numbers from unrelated documents (e.g., do not cite a Chromebook manual if the user has a Windows laptop). Use the format: [[Source: <Document Name> | Quote: <Exact text>]]
6. **No Information**: If the documents do not contain the answer, politely state that you don't have that information currently.

# KEY INFORMATION
- **Inside Information Contact**: ONLY recommend contacting "Inside Information" (780-944-4311) if the troubleshooting steps fail or the documents explicitly say to call them. Do not offer it as a first resort.
`;

    } else if (intent === 'SiteSearch') {
      contextName = 'Site Map';
      // Load site map as documents
      documents = [{
        name: 'Site Map',
        content: siteMapData.map(p => `Title: ${p.title}\nPath: ${p.path}\nDesc: ${p.description}`).join('\n')
      }];

      systemInstruction = `You are the "OCT Site Guide". Help users find specific pages on the website.
      1. Use the provided "Site Map" as your ONLY source.
      2. Provide direct links in Markdown: [Page Title](Path).
      3. If you can't find it, suggest the Home page ([Home](/)).
      4. **Ambiguity Check**: If the user asks for a page related to a common IT issue (e.g., "network info", "vpn page", "password link"), provide the link BUT ALSO ask: "Are you looking for general information, or are you experiencing an issue and need troubleshooting help?"
      `;

    } else {
      // General
      contextName = 'General Assistant';
      documents = []; // No documents for general chat
      systemInstruction = `You are the OCT Service Assistant, a helpful AI for City of Edmonton Internal Services.
      - You can help with IT issues, HR & Labour Relations questions, and finding pages on this website.
      - If the user asks a specific question about those topics, I will route them to the right knowledge base.
      - Currently, just answer politely to their greeting or general query.`;
    }

    // 3. Generate Answer
    // Format History
    // Limit history to last 10 messages to avoid hitting token limits
    const recentHistory = history.slice(-10);
    const historyContext = recentHistory.length > 0
      ? recentHistory.map(msg => `${msg.role.toUpperCase()}: ${msg.content}`).join('\n')
      : 'No previous conversation.';

    // If we have documents, format them.
    const documentContext = documents.length > 0
      ? documents.map(doc => `Document: ${doc.name}\nContent:\n${doc.content}`).join('\n\n---\n\n')
      : 'No specific documents retrieved for this query.';

    const userPrompt = `
--- CONVERSATION HISTORY ---
${historyContext}
--- END HISTORY ---

--- ${contextName.toUpperCase()} CONTEXT ---
${documentContext}
--- END OF CONTEXT ---

User Question: "${question}"

Answer the question using the context above and following the system instructions.
IMPORTANT: Analyze the CONVERSATION HISTORY to see if the user has already provided specific details (like device type or employee status) in previous turns. Do not ask for information that is already in the history.
`;

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
    console.error('Unified Chat API Error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return NextResponse.json(
      { error: 'An unexpected error occurred processing your request.' },
      { status: 500 }
    );
  }
}
