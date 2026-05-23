# uNiMONDAY Learning System Architecture

This document defines the deep, production-ready backend architecture of the UniMonday educational engine. It proves that the learning system is not merely conceptual but structurally engineered for implementation.

## 1. System Components & Flow

The Learning Engine consists of 5 core backend modules communicating in real-time during a 5-minute session:

### 1.1 Context & Memory Manager
Before a session starts, this module fetches the `StudentProfile`. It loads:
- **Immediate Context**: What happened yesterday (e.g., "Learned 'Apple', struggled with 'R' sound").
- **Long-term Context**: The child's overall confidence score, native language, interests.
- **Curriculum Node**: The exact episode ID they are meant to learn today.

### 1.2 Conversational AI Controller (Gemini Live API Integration)
We utilize **Gemini 2.0 Flash** via the **Gemini Live API (WebSockets)** using the `google-genai` Python/Node SDK for ultra-low latency real-time voice interaction.
- **Connection**: Established via `client.live.connect(model='gemini-2.0-flash-live-api', config=live_config)`.
- **Context Injection**: The `system_instruction` is compiled in the `LiveConnectConfig` before connection. It explicitly defines the conversational rules, persona, and the 3-Phase logic.
- **Tool Calling (Function Calling)**: Instead of parsing raw JSON blocks from text, we define tools (`types.FunctionDeclaration`) such as `update_metrics(confidence, vocabulary_used, error_detected)`. The system instruction explicitly dictates: "At the end of every turn, you MUST invoke `update_metrics`."
- **Voice Configuration**: We use `speech_config=types.SpeechConfig(language_code="en-US")` (or the child's target language) and instruct the model to use the designated female voice persona.
- **VAD (Voice Activity Detection)**: Handled automatically by the Live API, but we monitor `explicit_vad_signal` to give visual feedback on the frontend orb when the child starts/stops speaking.
- **Context Caching**: For long-term memory across sessions, we do not rely on passing the entire history every turn. We use the **Context Caching API** to cache the child's historical profile and curriculum progress if the token count exceeds the cache threshold, reducing latency and cost.

### 1.3 State Machine (The 3-Phase Logic)
The AI is strictly bounded by a state machine injected into its context window. It cannot freely hallucinate.
- **State 1: Connection**: AI greets in native language, references memory. (e.g., "Jambo Ernest! Yesterday you were so good at..."). AI waits for response.
- **State 2: Pattern Drop**: AI introduces the formula. "When I say X, you say Y. Let's try."
- **State 3: Roleplay**: AI initiates the scenario. "Now pretend we are at the store..."

### 1.4 The Real-time Correction Engine (Implicit Correction)
If the AI detects an error (via audio transcription confidence or grammar check), it does *not* explicitly correct ("That's wrong"). The system prompt dictates **Implicit Modeling**.
- *Child*: "I want apple."
- *AI*: "Yes, exactly! You want *an* apple. Here is *an* apple. Your turn, say: 'I want an apple.'"

### 1.5 Evaluation & Telemetry Router
Every turn, the AI outputs a JSON block containing metrics. The backend parses this and sends telemetry to the database asynchronously.
- `fluency_score`: 1-10
- `vocabulary_hit`: ["apple", "want"]
- `hesitation_detected`: boolean
These metrics feed the **Parent Dashboard Intelligence**.

---

## 2. Walkthrough: The Actual Educational Flow

### Example: Lesson 7 (Week 2) - "Morning Routine"
**Goal:** Learn "I am [action]".

**Start (Backend initialization):**
Backend fetches profile. *Ernest, Swahili native, learning English, struggled with 'am' yesterday.*
System prompt is generated and sent to Gemini.

**Turn 1 (State 1: Connection):**
- **AI (Swahili/English mix)**: "Jambo Ernest! Good morning. Yesterday we talked about colors. Today, we are going to talk about waking up!"
- **Child**: "Good morning!"
- **AI internal JSON**: `{"state_transition": "PATTERN_DROP", "confidence": 9}`

**Turn 2 (State 2: Pattern Drop):**
- **AI**: "When we wake up, we say 'I am awake'. Can you try? Say: 'I am awake'."
- **Child (Hesitant)**: "I... awake."
- **AI internal JSON**: `{"state_transition": "PATTERN_DROP_RETRY", "confidence": 4, "error_detected": "Missing 'am'"}`
- **AI (Correction Flow)**: "Almost! Listen closely to the magic word in the middle. I *am* awake. Let's try together: I am awake."
- **Child**: "I am awake!"

**Turn 3 (State 3: Roleplay):**
- **AI internal JSON**: `{"state_transition": "ROLEPLAY_START"}`
- **AI**: "Perfect, Ernest! Now, close your eyes. Pretend you are sleeping. *Yawn*... Wake up! Tell me, what are you?"
- **Child**: "I am awake!"
- **AI**: "Amazing! Now, stretch your arms..."

**Turn 4 (Wrap-up):**
- **AI**: "You did a fantastic job waking up today, Ernest. I am so proud of you. See you tomorrow!"
- **Backend**: AI outputs final JSON `{"lesson_complete": true, "xp_earned": 20, "mastered_patterns": ["I am awake"]}`. Backend updates PostgreSQL database. Client routes to Success Screen.

---

## 3. Progression Across the Year

### Month 1 (Lessons 1-20): Foundation
- **Feel**: Highly guided, bilingual (Native + Target). Focus on removing fear.
- **Flow**: High repetition, simple callbacks ("Yes", "No", "Hello").
- **Emotional State**: "This is a safe game."

### Month 3 (Lessons 60-80): Contextual Building
- **Feel**: Mostly Target Language. AI asks open questions requiring 2-3 word answers.
- **Flow**: Less pattern dropping, more direct roleplay. "What color is the car?"
- **Emotional State**: "I understand what she is asking me."

### Advanced Stage (Month 6+): Spontaneous Storytelling
- **Feel**: Fully Target Language. AI acts as a conversational partner, not just a teacher.
- **Flow**: "Ernest, what happened at the park today?" The child leads. The AI reacts, gently fixing tense errors by repeating sentences back correctly.
- **Emotional State**: True communicative confidence.

---

## 4. Hallucination Prevention, Guardrails & Best Practices
- **Prompt Bounding**: The AI is explicitly instructed: `You are bounded by the CURRENT LESSON GOAL. If the user says something unrelated (e.g. "Let's talk about space aliens"), say: "Space aliens are fun! But right now, we are waking up. Say 'I am awake'."`
- **Output Validation (Tool Use)**: By strictly defining `update_metrics` as a required tool call, we enforce structured output generation natively through the Gemini API rather than relying on brittle markdown parsing.
- **Session Resumption**: Disconnections happen. We configure `session_resumption=types.SessionResumptionConfig(transparent=True)` and maintain the `session_handle` so that if a child's iPad drops Wi-Fi, the lesson resumes exactly where it left off seamlessly without starting the connection phase over.
- **Context Window Compression**: Native audio tokens accumulate rapidly (25 tokens/sec). We enable `context_window_compression` in `LiveConnectConfig` to prevent the session from exhausting the token limit during a 10-minute roleplay, ensuring the model retains the immediate conversational context cleanly.

## 5. Parent Dashboard Intelligence
Metrics from the daily 5-minute sessions are aggregated.
- **Consistency**: Streak logic.
- **Speaking Confidence**: Derived from average `confidence` JSON scores. Plotted on a trendline.
- **Actionable Homework**: If the DB registers `struggled_patterns = ["I am"]`, the backend automatically generates a Parent Action: "Ernest is learning 'I am'. Tonight at dinner, ask him: 'What are you doing?' and encourage him to say 'I am eating.'"
