# Strategy Research & Psychological Analysis

## 1. Demo Psychology & Placement (Before vs. After Signup)
### Goal: Determine optimal conversion funnel for European parents.

**Current Setup:** Demo -> Signup -> Paywall.
**Analysis of Top-Tier EdTech (e.g., Duolingo, Babbel, Novakid):**
*   **The "Aha!" Moment First (Gradual Engagement):** Apps like Duolingo allow users to experience a micro-lesson *before* creating an account. This is called **"Delayed Registration"** or **"Gradual Engagement"**.
*   **The Psychology:** Parents are highly protective of their data (especially in Europe due to GDPR). Forcing an email before showing value causes high bounce rates. By letting the child play a 2-minute demo first, the parent sees the child's *delight* and *engagement* (the "Aha!" moment). Once the child says, "I want to do more!", the parent is emotionally primed to convert. The signup then becomes a necessity to save progress, not a barrier to entry.
*   **The Risk:** Too much free content reduces urgency. The demo must be short, highly polished, and end on a cliffhanger ("Great job! Create an account to save your points and unlock tomorrow's mission").
*   **Recommendation for uNiMONDAY:** Keep the demo *before* signup, but make it shorter (2-3 minutes max). The moment the child succeeds, freeze the screen with a "Dopamine Hit" (confetti) and immediately transition to the Parent: "Your child just spoke their first words in French! Create a free profile to save their progress and get their full curriculum."

## 2. Multi-Language System in Pro
### Goal: How parents manage multiple languages without confusing the child.

**UX Structure:**
*   **The Profile Switcher:** A child should NOT mix languages in the same learning path (e.g., doing Spanish in the morning, German in the afternoon creates cognitive overload and vocabulary bleed).
*   **Implementation:** The Parent Dashboard allows the parent to set an "Active Target Language". The child's UI only shows that language.
*   **Switching:** To switch, the parent must authenticate (e.g., solve a simple math problem to prove they are an adult) and change the Active Language.
*   **Progression:** Each language has its own independent 365-day track. Points/Streaks can be global (to encourage daily habit), but lesson progress is siloed.

## 3. Lesson Time Confusion
### Goal: Keeping it to 5 minutes.

**Current Problem:** The 3-Phase structure (Connection -> Pattern -> Roleplay) can drag on if the AI allows open-ended responses.
**Solution:**
*   **Strict Turn Limits:** The AI must be prompted to limit the conversation. Example: Phase 1 (1 turn), Phase 2 (3 turns), Phase 3 (3 turns).
*   **Concise Prompts:** The AI must speak in short sentences (max 15-20 words). Long paragraphs cause children to lose focus and artificially inflate the session time.
*   **Fast Pacing:** The visual UI must transition quickly. No long loading spinners.

## 4. Language Selection & Flags
### Goal: Visual clarity vs. Premium feel.

*   **Flags:** Using country flags for languages is common but can be problematic (e.g., Spanish: Spain vs. Mexico flag? English: US vs. UK flag?). It can feel slightly dated or politically sensitive.
*   **Modern Premium Approach:** Apple and high-end apps often use beautiful, abstract representations or simply very clean, large typography with subtle cultural motifs (e.g., subtle architectural icons or elegant gradients).
*   **Recommendation:** Use a mix of beautiful typography, a subtle native-language translation (e.g., "Spanish - Español"), and a premium vector icon representing the culture (e.g., Eiffel Tower for French) instead of crude flag emojis.

## 5. Expanded Language Coverage
### Goal: Strategic European/Global expansion.

*   **High Demand in Europe:** English (universal), Spanish, French, German (major economies).
*   **Growing/Strategic:** Mandarin (business/future-proofing), Arabic (large diaspora/heritage learners), Italian (cultural/heritage), Portuguese, Japanese.
