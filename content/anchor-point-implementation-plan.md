# Anchor Point Integration — Implementation Plan

## Context

Anchor Point is a centralized "Knowledge Broker" connecting enterprise data to Google Gemini within Google Workspace. It replaces the existing Gemini-powered OCT Assistant (which uses direct Gemini API + Google Drive document fetching). The existing assistant code is archived in `_archive/oct-assistant-gemini/` so it can be restored if Anchor Point has issues. The UI (header "Ask OCT..." button, `/oct-assistant` page, ChatWindow) stays the same — only the backend services and API route swap out.

### Anchor Point Platform Overview

- **Architecture:** 100% In-Tenant Google Workspace solution using Google Apps Script for orchestration
- **Access Layer:** Internal API Gateway + custom Client SDK
- **Security:** Governance-First model — users only see stores they have explicit access to. Every request verified via Identity Token in 100% in-tenant identity chain. Permanent, non-editable audit trail.
- **Intelligence Layer:** Powered by Google Gemini 3 with File Search and RAG
- **Data Layer:** Hybrid Database Model using Google Sheets + Vector Store
- **Data Ingestion:** Atomic Rotation (zero downtime syncs), Resume-on-Failure chunking, automated Encoding Repair

---

## Implementation Steps

### Step 1 — Archive Existing Assistant

Move the following files into `_archive/oct-assistant-gemini/`, preserving directory structure:

| Source | Archive destination |
|---|---|
| `app/api/chat/route.ts` | `_archive/oct-assistant-gemini/app/api/chat/route.ts` |
| `app/oct-assistant/services/chatService.ts` | `_archive/oct-assistant-gemini/app/oct-assistant/services/chatService.ts` |
| `app/oct-assistant/services/documentService.ts` | `_archive/oct-assistant-gemini/app/oct-assistant/services/documentService.ts` |
| `app/oct-assistant/services/categoryService.ts` | `_archive/oct-assistant-gemini/app/oct-assistant/services/categoryService.ts` |
| `app/lib/google-drive.ts` | `_archive/oct-assistant-gemini/app/lib/google-drive.ts` |
| `scripts/verify-service.ts` | `_archive/oct-assistant-gemini/scripts/verify-service.ts` |
| `scripts/verify-service-desk.ts` | `_archive/oct-assistant-gemini/scripts/verify-service-desk.ts` |

**Keep in place (reused by Anchor Point):**
- `app/oct-assistant/page.tsx` — page wrapper
- `app/oct-assistant/OCTAssistantClient.tsx` — main client component
- `app/oct-assistant/types.ts` — Message/Document types
- `components/oct-assistant/ChatWindow.tsx` — chat UI
- `components/oct-assistant/CategorySelection.tsx` — category UI (may be simplified)
- `components/GeminiSearch.tsx` — header search drawer
- `components/Header.tsx` — "Ask OCT..." button
- `lib/siteMapData.ts` — search index entry

Add a `_archive/oct-assistant-gemini/README.md` with:
- What this archive contains and why
- Instructions to restore: copy files back, restore env vars, revert chatService.ts
- List of env vars needed: `GEMINI_API_KEY`, `GOOGLE_APPLICATION_CREDENTIALS`, `HR_POLICIES_FOLDER_ID`, `SERVICE_DESK_FOLDER_ID`

### Step 2 — Environment Variables & Feature Flag

**File:** `lib/env.ts`

- Add `ANCHOR_POINT_URL` (optional, `z.string().url()`)
- Add `ANCHOR_POINT_STORE_ID` (optional, `z.string()`)
- Add `FF_ANCHOR_POINT` (optional, `z.enum(['true','false'])`)
- Follow existing pattern for `FF_DATA_PORTAL`, `FF_VENDOR_DASHBOARD`

### Step 3 — Type Definitions

**New file:** `lib/anchor-point/types.ts`

```typescript
// Core interfaces to define:
AnchorPointConfig     // url, storeId from env
AnchorPointQuery      // question, history (max 30 turns)
AnchorPointResponse   // text, sources[], metadata
AnchorPointSource     // title, snippet, documentId
RateLimitState        // lastQueryMs, dailyCount, dailyResetAt
```

### Step 4 — Client Library

**New file:** `lib/anchor-point/client.ts`

Core module:
1. **Session management** — `initSession()` using identity token from `google-auth-library` (same pattern as `lib/service-health/iap-client.ts`). If Anchor Point only supports Apps Script library, create an Apps Script web app intermediary that our server calls via HTTP POST.
2. **Per-user rate limiting** — in-memory `Map<string, RateLimitState>` keyed by email. Enforces 3000ms gap + 300/day. Stale entry cleanup matching existing `MAX_RATE_LIMIT_ENTRIES` pattern in middleware.
3. **Circuit breaker** — replicate pattern from archived `app/api/chat/route.ts`: failures counter, circuitOpenUntil, threshold=3, recovery=60s.
4. **`queryAnchorPoint(email, question, history)`** — checks flag → circuit → rate limit → HTTP POST → returns structured response with sources.
5. Pass user email to Anchor Point for governance enforcement (users only see authorized stores).

### Step 5 — New Chat API Route

**New file:** `app/api/chat/route.ts` (replaces archived version)

Simplified POST handler (no intent classification needed — Anchor Point handles RAG internally):
- Feature flag check → 503 with message if disabled
- Auth via `getCurrentUser()` → 401
- Input validation (question length, history length) → 400
- Call `queryAnchorPoint()` → return `{ reply, sources }`
- 429 with Retry-After for rate limits
- 503 for circuit breaker open

Cache: `private, no-store`

### Step 6 — Update Chat Service (Client-side)

**New file:** `app/oct-assistant/services/chatService.ts` (replaces archived version)

- Send `{ question, history }` to `/api/chat`
- Receive `{ reply, sources }` — map to existing Message type
- Handle 429 responses: parse Retry-After, surface cooldown to UI

### Step 7 — Middleware Update

**File:** `middleware.ts`

- Update existing chat rate limit (currently 20 req/min) to 10 req/min to stay within Anchor Point's tighter limits
- `/api/chat` path is already in the middleware matcher — no change needed there

### Step 8 — UI Adjustments

**Files:** `components/GeminiSearch.tsx`, `components/oct-assistant/ChatWindow.tsx`

Minimal changes:
- Display source citations from Anchor Point responses (title + snippet)
- Show cooldown indicator when 429 received (countdown timer)
- Update placeholder text from Gemini-specific to Anchor Point-specific
- CategorySelection component: simplify or remove if Anchor Point handles all categories internally

### Step 9 — Health Check

**File:** `app/api/health/route.ts`

Add `checkAnchorPoint()`:
- If `FF_ANCHOR_POINT !== 'true'` → return `'disabled'`
- Attempt lightweight ping to `ANCHOR_POINT_URL` → `'healthy'` or `'unavailable'`
- Include in health check response object

---

## API Access Strategy (TO BE CONFIRMED)

Anchor Point's client library (`AnchorPoint_Client_Lib`) is designed for Apps Script. For our Next.js server, two possible approaches:

**Option A — Direct REST API (Preferred):** If Anchor Point's API Gateway accepts standard HTTP POST with identity tokens, call it directly from `lib/anchor-point/client.ts`.

**Option B — Apps Script Intermediary:** If REST isn't available, create a thin Apps Script web app deployed as "Execute As: User (Accessing)" that:
1. Receives POST from our Next.js server
2. Calls `AnchorPoint_Client_Lib.createSession(ANCHOR_POINT_URL, MY_STORE_ID)` and queries
3. Returns JSON response

Our Next.js API route would call this intermediary. The intermediary's `appsscript.json` needs three OAuth scopes:
- `https://www.googleapis.com/auth/script.external_request`
- `https://www.googleapis.com/auth/drive`
- `https://www.googleapis.com/auth/userinfo.email`

### Developer Implementation Notes (from Anchor Point docs)

**Deployment:** Must be "Execute As: User (Accessing)" — NOT "Me" (breaks security logs/permissions).

**Tool Registration (Function Calling):** Gemini can run local scripts to retrieve live data from City systems. Tools registered with structured schema (type, properties, descriptions, required args) before calling chat. Tool functions should return JSON for multi-source synthesis.

---

## Security Notes

- `ANCHOR_POINT_URL` and `ANCHOR_POINT_STORE_ID` are server-only (never in client bundles)
- User email forwarded to Anchor Point for governance enforcement (strict visibility rule)
- All responses DOMPurify-sanitized before rendering (existing XSS pattern)
- Archived code preserves original env var references for restoration
- Identity token via `google-auth-library` (existing pattern in codebase)

## Key Limits to Enforce

| Limit | Value |
|---|---|
| Min query gap | 3000ms per user |
| Daily quota | 300 requests/user/24hr |
| Context window | 30 turns (15 user + 15 model) |
| Max output | 4096 tokens |
| Max file upload | 20MB |
| Model | gemini-3-flash-preview |
| Data sources per store | 100 Google Sheets + 100 manual documents |

## Verification Checklist

1. Confirm `_archive/oct-assistant-gemini/` contains all original files with README
2. Set `FF_ANCHOR_POINT=true` in `.env.local` with test URL/store ID
3. Hit `/api/health` — verify `anchorPoint: 'healthy'`
4. Send query via "Ask OCT..." — verify response with sources
5. Send rapid queries — verify 3000ms rate limit surfaces cooldown in UI
6. Simulate API failures — verify circuit breaker opens after 3 failures
7. Restore test: copy archived files back, verify Gemini assistant works again

## Existing Patterns to Reuse

| Pattern | Source file |
|---|---|
| IAP identity token acquisition | `lib/service-health/iap-client.ts` |
| Circuit breaker | `app/api/chat/route.ts` (archived) |
| Rate limiting (in-memory map) | `middleware.ts` |
| Feature flags | `lib/env.ts` (FF_DATA_PORTAL pattern) |
| Health check | `app/api/health/route.ts` |
| Structured logging | `lib/logger.ts` |
| DOMPurify sanitization | `components/oct-assistant/ChatWindow.tsx` |
| Auth guard | `lib/auth.ts` → `getCurrentUser()` |
