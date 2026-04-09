# AI Assistant (OCT Assistant)

The OCT Assistant is a Google Gemini-powered chatbot that helps City of Edmonton employees with HR questions, IT troubleshooting, and site navigation.

## How It Works

```
User Question
  │
  ▼
Intent Classification (Gemini 2.5 Flash, temperature=0)
  │
  ├─ HR → Fetch docs from Google Drive (HR Policies folder)
  ├─ IT → Fetch docs from Google Drive (Service Desk folder)
  ├─ SiteSearch → Load site map from lib/siteMapData.ts
  └─ General → No documents (greeting/generic response)
  │
  ▼
Build prompt with:
  - System instruction (per-intent personality and rules)
  - Document context (retrieved docs or site map)
  - Conversation history (last 10 messages)
  - User question
  │
  ▼
Gemini 2.5 Flash generates response
```

## Intent Classification

The classifier analyzes the user's question and routes to one of four intents:

| Intent | Triggers | Document Source | Example |
|--------|----------|-----------------|---------|
| **HR** | HR policies, overtime, leave, benefits, CSU 52, collective agreement, union, pay, holidays | Google Drive (`HR_POLICIES_FOLDER_ID`) | "How does overtime work?" |
| **IT** | Technical issues, passwords, VPN, hardware, software, wifi, printers, SAP, service desk | Google Drive (`SERVICE_DESK_FOLDER_ID`) | "My VPN won't connect" |
| **SiteSearch** | "Where is...", "show me...", navigation, finding pages | Static site map (`lib/siteMapData.ts`) | "Where can I find the budget page?" |
| **General** | Greetings, generic questions, anything that doesn't fit above | None | "Hello" |

Classification uses Gemini with `temperature: 0` for deterministic results. If classification fails, the intent defaults to `General`.

## System Instructions

Each intent has a tailored system prompt that controls the assistant's behavior:

- **HR**: Acts as an HR & Labour Relations partner. Prioritizes the CSU 52 Collective Agreement. Asks clarifying questions before dumping rules (e.g., "Are you permanent or temporary?"). Must include citations in `[[Source: DocName | Quote: Exact text]]` format.

- **IT**: Acts as a friendly Service Desk assistant. Critically, it must **ask for the specific device/system** before providing troubleshooting steps — never guesses. Citations only when directly relevant to the user's specific device.

- **SiteSearch**: Provides direct Markdown links from the site map. If the query is ambiguous (e.g., "network info"), provides the link but also asks if they need troubleshooting.

- **General**: Polite conversational responses. Mentions it can help with HR, IT, and site navigation.

## Input Validation

| Constraint | Limit |
|------------|-------|
| Question length | 2,000 characters max |
| History array | 20 messages max |
| History message content | 5,000 characters max per message |
| History used for context | Last 10 messages only |

## Circuit Breaker

The chat endpoint includes a circuit breaker to prevent cascading failures when the Gemini API is down:

- After **3 consecutive failures**, the circuit opens for **60 seconds**
- While open, requests immediately return a friendly message directing users to the Service Desk (780-944-4311)
- A single successful request resets the failure counter

## Rate Limiting

The `/api/chat` endpoint is rate-limited to **20 requests per minute per IP**, enforced in `proxy.ts`.

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `HR_POLICIES_FOLDER_ID` | For HR intent | Google Drive folder ID for HR documents |
| `SERVICE_DESK_FOLDER_ID` | For IT intent | Google Drive folder ID for IT documents |
| `GOOGLE_APPLICATION_CREDENTIALS` | For Drive access | Path to GCP service account JSON |

## Key Files

| File | Purpose |
|------|---------|
| `app/api/chat/route.ts` | API endpoint: intent classification, document retrieval, response generation |
| `app/oct-assistant/services/documentService.ts` | Fetches documents from Google Drive by collection name |
| `lib/siteMapData.ts` | Static site map used for SiteSearch intent |
| `components/GeminiSearch.tsx` | Frontend chat UI component |

## Adding a New Intent

1. Add the new intent name to the `classifyIntent` function's classification prompt in `app/api/chat/route.ts`
2. Update the return type union to include the new intent
3. Add an `else if (intent === 'NewIntent')` block that:
   - Sets `contextName` for logging
   - Fetches relevant `documents` (from Drive, static data, or database)
   - Writes a `systemInstruction` tailored to the intent's behavior
4. The rest of the pipeline (history formatting, prompt assembly, Gemini call) handles it automatically
