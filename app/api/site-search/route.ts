import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { siteMapData } from '@/lib/siteMapData';

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
        const body = await request.json();
        const { question } = body;

        if (!question) {
            return NextResponse.json(
                { error: 'Missing required field: question' },
                { status: 400 }
            );
        }

        const ai = getAIClient();

        const siteContext = siteMapData
            .map(page => `Page: ${page.title}\nPath: ${page.path}\nDescription: ${page.description}\nKeywords: ${page.keywords.join(', ')}`)
            .join('\n\n---\n\n');

        const systemInstruction = `You are the "OCT Site Guide", an intelligent assistant for the Open City & Technology (OCT) branch website.
Your goal is to help users find the specific page they are looking for based on their query.

Rules:
1. Use the provided "Site Map" as your ONLY source of truth for page locations.
2. If a user asks about a topic, identify the most relevant page from the Site Map.
3. **CRITICAL:** Your response MUST include a direct link to the relevant page(s) using Markdown format: [Page Title](Path).
4. **NEVER** mention a page without providing its link.
5. If multiple pages might be relevant, list them all with their links.
6. If you cannot find a relevant page, suggest the "Home" page ([Home](/)) or "Contact" page ([Contact](/contact)), but admit you aren't sure.
7. Do NOT invent paths that are not in the Site Map.

Example Interaction:
User: "Where can I see the budget?"
You: "You can find financial information on the [Budget](/budget) page."

User: "Who is the CIO?"
You: "Information about our leadership, including the CIO, can be found on the [Leadership](/leadership) page."
`;

        const userPrompt = `--- SITE MAP ---
${siteContext}
--- END OF SITE MAP ---

User Query: "${question}"
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction,
            },
        });

        return NextResponse.json({
            response: response.text || 'I could not generate a response.'
        });

    } catch (error) {
        console.error('Gemini Site Search API error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
