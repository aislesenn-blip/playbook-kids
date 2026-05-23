# uNiMONDAY Architecture & Market Alignment Report (2026)

## 1. Gemini 3.1 Flash Live API: Validation & Strategy
Based on current (May 2026) Gemini API research:
- **Model:** `gemini-3.1-flash-live-preview` via Gemini Live API (WebSockets).
- **Latency & Audio:** 25 tokens per second of audio. It supports low-latency bidirectional streaming.
- **Costs (per 1M tokens):** Text Input: $1.00, Audio Input: $1.00, Text Output: $6.00, Audio Output: $20.00.
- **Context Caching:** Using Gemini Context Caching drops daily context loading costs drastically (e.g., ~$25/day vs $2500/day for long contexts), allowing us to pass the child's entire profile, previous milestones, and known interests on every session startup.
- **Hallucination Prevention:** The 3.1 model allows tight `system_instruction` control, but relies heavily on *State Machine Constraints*. Our application handles this by enforcing the 3-Phase Lesson (Connection -> Drill -> Roleplay). The AI does not drive the session duration; the frontend state machine bounds the interaction to <5 minutes.

## 2. API Cost Control & Margins
The "Unlimited" model would bankrupt a bootstrapped product due to the $20/1M audio output cost.
A 5-minute session is roughly 300 seconds. Assuming 50% AI speaking time (150 seconds):
- Audio Output: 150s * 25 tokens/s = 3,750 tokens = ~$0.075 per session.
- Audio Input: 150s * 25 tokens/s = 3,750 tokens = ~$0.00375 per session.
- Context + Text: Negligible with caching.
- **Total API cost per session:** ~$0.08.

**Pricing Tiers Validated:**
- **uNiMONDAY X (€14.99/mo):** 1 session/day = ~30 sessions/mo. Cost = ~$2.40/mo. Gross margin on API: ~84%.
- **uNiMONDAY Pro (€29.99/mo):** Up to 3 sessions/day = ~90 sessions/mo. Cost = ~$7.20/mo. Gross margin on API: ~76%.
*Limits are absolutely necessary and financially validated.*

## 3. Product Positioning & Psychology
The product is **not** an educational app. It is **"The Ultimate Guilt-Free Screen Time Solution."**
- Parents buy *peace of mind* (a safe, ad-free environment) and *visible proof of ROI* (Parent Dashboard).
- Children use it because of **Monday**, the digital companion.
- *Retention Strategy:* By keeping sessions short (5 mins) and cutting the session off with "I'm tired today, let's play again tomorrow!", we trigger the Zeigarnik effect. The child leaves wanting more, rather than being forced to study until bored.

## 4. Architectural Readiness (What was completed)
1. **Frontend Foundation:** Next.js 15, React 19, Tailwind v4, Zustand.
2. **Session UI (The "FaceTime" Experience):** Built in `src/app/session/[id]/page.tsx` focusing on a minimal, dark-mode orb (representing "Monday") that reacts to voice, avoiding text inputs entirely.
3. **Parent Dashboard:** Built to track real metrics via Zustand (`learnerMetrics`), rendering dynamic insights (struggling sounds, cognitive milestones).
4. **Data Structures:** Added `CurriculumLesson` and `AIMemoryContext` to `types/index.ts` to support the long-term context cache.
5. **AI Engine Config:** Updated `src/lib/ai/prompts.ts` with strict Gemini 3.1 `system_instruction` requirements and Function Calling definitions (`updateLearnerMetrics`).

The architecture is clean, strictly typed, and completely ready for the real WebSocket integration in the next sprint.
