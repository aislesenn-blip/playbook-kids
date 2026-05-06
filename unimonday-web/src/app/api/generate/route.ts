export const maxDuration = 300;
import { NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'GFRGVmxF64zpxZL22-o3BaVyGxphiGAwXLMfQxLCC2U';

const ARCHITECT_PROMPT = `You are a World-Class AI Product Architect, Prompt Engineer, and Full-Stack Builder Agent.

Your mission is NOT to simply generate code yet.
Your mission is to deeply understand, expand, design, and plan a complete production-ready application from the user input.

---
🔥 PHASE 1: INTENT EXPANSION (Prompt Engineering Layer)
1. Analyze the user request deeply.
2. Expand it into a fully detailed product definition: What problem is solved? Who are the users? Core features? Hidden expectations?
3. Convert vague requests into a complete product vision.

---
🧩 PHASE 2: PRODUCT BREAKDOWN
Break the system into Core Features, Supporting Features, Advanced Features. Define User roles, User journeys, UX structure, and UI behavior.

---
🎨 PHASE 3: UX & DESIGN THINKING
Define Layout structure, Navigation flow, Component hierarchy, Aesthetic direction (e.g. Apple-like minimalism, elegant luxury), and Interaction patterns.
AND EVERYTHING YOU BUILD SHOULD START WITH A STUNNING AD-RELEVANT LANDING PAGE.

---
🌐 PHASE 4: REAL DATA & API STRATEGY (NO PLACEHOLDERS RULE)
STRICT RULE:
- NEVER use fake data.
- NEVER use placeholders.
Instead, plan to use real APIs or open-source solutions:
- Maps → OpenStreetMap / Leaflet
- Images → Unsplash API (MANDATORY if images needed: https://api.unsplash.com/photos/random?query=YOUR_KEYWORD&client_id=\${UNSPLASH_ACCESS_KEY})
- Knowledge → Wikipedia API
- Auth → Simple local/session-based system simulation
- Payments → Simulated realistic flow

---
⚙️ PHASE 5: SYSTEM ARCHITECTURE
Define Frontend structure, Data flow, State management, API interactions.

OUTPUT FORMAT MUST BE VALID JSON enclosed in markdown code blocks:
{
  "product_understanding": "...",
  "expanded_product_plan": "...",
  "features_breakdown": "...",
  "ux_ui_plan": "...",
  "data_api_plan": "...",
  "system_architecture": "..."
}
`;

const BUILDER_PROMPT = `You are an expert Apple/Gemini-level Software Engineer and UI/UX Designer.
Your task is to generate a fully functional, 100% complete, production-ready web application based on the detailed Product Requirement Document (PRD) provided.

THIS IS NOT A PROTOTYPE OR DEMO. DO NOT USE "COMING SOON" PLACEHOLDERS. DO NOT USE "TODO" or "Insert here". EVERY SINGLE BUTTON MUST BE SYNCED END-TO-END AND HAVE LOGIC BEHIND IT.
EVERY APP MUST HAVE A STUNNING AD-RELEVANT LANDING PAGE.

You MUST adhere to the following STRICT rules:
1.  **Code Output**: Return ONLY valid HTML, CSS, and JS. Output format MUST be a JSON object with keys "html", "css", "js" enclosed in markdown code blocks.
2.  **Design & UI**:
    - Use Tailwind CSS via CDN.
    - Choose a highly appropriate, professional color palette based on the PRD aesthetics.
    - Maintain world-class layout with immense negative space, elegant typography, and zero clutter.
    - Use Lucide SVG icons exclusively. ABSOLUTELY NO EMOJIS.
    - WARNING: Provide \`aria-labelledby\` and \`aria-describedby\` for Modals/Dialogs.
3.  **Imagery & External APIs (CRITICAL)**:
    - Do NOT use colored squares or gray boxes for images.
    - You MUST use the provided Unsplash Key for EVERY image using: \`https://api.unsplash.com/photos/random?query=KEYWORD&client_id=\${UNSPLASH_ACCESS_KEY}\` or Source URLs.
    - Implement the Open-source APIs defined in the PRD (like Leaflet for maps). Do not draw fake visual dots for maps. Implement the real library via CDN.
4.  **Secrets & Logic**:
    - Build a FULL PRODUCT. Use LocalStorage for state if necessary to make it functional.

OUTPUT FORMAT MUST BE VALID JSON:
{
  "html": "<div>...</div>",
  "css": ".custom-class { ... }",
  "js": "console.log('running');"
}
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, prompt, prd } = body;

    if (!action) {
      return NextResponse.json({ error: 'Action is required (architect or build)' }, { status: 400 });
    }

    if (action === 'architect' && !prompt) {
       return NextResponse.json({ error: 'Prompt is required for architecture phase' }, { status: 400 });
    }

    if (action === 'build' && !prd) {
       return NextResponse.json({ error: 'PRD is required for build phase' }, { status: 400 });
    }

    if (!DEEPSEEK_API_KEY) {
      if (action === 'architect') {
         return NextResponse.json({
            product_understanding: "Simulated understanding...",
            expanded_product_plan: "Simulated plan...",
            features_breakdown: "Simulated breakdown...",
            ux_ui_plan: "Simulated UX...",
            data_api_plan: "Simulated data plan...",
            system_architecture: "Simulated architecture..."
         });
      } else {
         return NextResponse.json({
          html: `<div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8"><h1 class="text-4xl font-bold mb-4">Simulated App</h1><p class="text-gray-600 mb-8">Please provide a DEEPSEEK_API_KEY in your environment.</p><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="rounded-xl shadow-lg max-w-2xl w-full" alt="Coding"></div>`,
          css: `body { font-family: system-ui, sans-serif; }`,
          js: `console.log("Simulated app loaded.");`
        });
      }
    }

    let messages: { role: string, content: string }[] = [];
    if (action === 'architect') {
       messages = [
         { role: 'user', content: ARCHITECT_PROMPT.replaceAll('${UNSPLASH_ACCESS_KEY}', UNSPLASH_ACCESS_KEY) + '\n\nUser Request: ' + prompt }
       ];
    } else if (action === 'build') {
       messages = [
         { role: 'user', content: BUILDER_PROMPT.replaceAll('${UNSPLASH_ACCESS_KEY}', UNSPLASH_ACCESS_KEY) + '\n\nArchitect PRD to implement:\n' + JSON.stringify(prd) }
       ];
    }

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-reasoner',
        messages: messages,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API Error:", errorText);
      return NextResponse.json({ error: 'Failed to generate from DeepSeek' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    let parsedContent;
    try {
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
      const rawJson = jsonMatch ? jsonMatch[1] : content;
      parsedContent = JSON.parse(rawJson);
    } catch (e) {
      console.error("Failed to parse DeepSeek JSON response:", content);
      return NextResponse.json({ error: 'AI returned invalid format' }, { status: 500 });
    }

    return NextResponse.json(parsedContent);

  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
