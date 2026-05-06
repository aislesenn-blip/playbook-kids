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

const BASE_BUILDER_RULES = `
THIS IS NOT A PROTOTYPE OR DEMO. DO NOT USE "COMING SOON" PLACEHOLDERS. DO NOT USE "TODO" or "Insert here". EVERY SINGLE BUTTON MUST BE SYNCED END-TO-END AND HAVE LOGIC BEHIND IT.
EVERY APP MUST HAVE A STUNNING AD-RELEVANT LANDING PAGE.

You MUST adhere to the following STRICT rules:
- Maintain world-class layout with immense negative space, elegant typography, and zero clutter.
- Use Lucide SVG icons exclusively. ABSOLUTELY NO EMOJIS.
- WARNING: Provide \`aria-labelledby\` and \`aria-describedby\` for Modals/Dialogs.
- NO PLACEHOLDER NAVIGATION: If you build a 'Login' button, 'Profile' tab, or any interactive navigation, you MUST build the corresponding functional modal/screen for it. Everything must sync end-to-end.
- UNSPLASH IMAGES ONLY: Do NOT use colored squares or gray boxes for images. You MUST use the Unsplash API (\`https://api.unsplash.com/photos/random?query=KEYWORD&client_id=\${UNSPLASH_ACCESS_KEY}\`).
- ALWAYS ADD IMAGE FALLBACKS: To prevent broken images, all \`<img>\` tags MUST include an onerror attribute handling fallbacks (e.g., \`onerror="this.src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'"\`).
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, prompt, prd, html, css } = body;

    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

    if (!DEEPSEEK_API_KEY) {
      // Mock logic for when key is missing to prevent crash
      if (action === 'architect') {
         return NextResponse.json({ product_understanding: "Simulated..." });
      } else if (action === 'build_html') {
         return NextResponse.json({ code: "<div class='mock-html'>Mock HTML Generated</div>" });
      } else if (action === 'build_css') {
         return NextResponse.json({ code: "body { background: #f0f0f0; }" });
      } else if (action === 'build_js') {
         return NextResponse.json({ code: "console.log('Mock JS loaded');" });
      }
    }

    let messages: { role: string, content: string }[] = [];

    if (action === 'architect') {
       messages = [{ role: 'user', content: ARCHITECT_PROMPT.replaceAll('${UNSPLASH_ACCESS_KEY}', UNSPLASH_ACCESS_KEY) + '\n\nUser Request: ' + prompt }];
    } else if (action === 'build_html') {
       messages = [{ role: 'user', content: `You are an expert Apple/Gemini-level Software Engineer.\n\n${BASE_BUILDER_RULES.replaceAll('${UNSPLASH_ACCESS_KEY}', UNSPLASH_ACCESS_KEY)}\n\nTASK: Generate ONLY the fully functional, semantic HTML structure based on the PRD.\nDo NOT include <style> or <script> tags. Use Tailwind CSS classes thoroughly.\n\nPRD:\n${JSON.stringify(prd)}\n\nOUTPUT FORMAT MUST BE VALID JSON enclosed in markdown code blocks:\n{ "code": "<div>...</div>" }` }];
    } else if (action === 'build_css') {
       messages = [{ role: 'user', content: `You are an expert Apple/Gemini-level UI Designer.\n\n${BASE_BUILDER_RULES.replaceAll('${UNSPLASH_ACCESS_KEY}', UNSPLASH_ACCESS_KEY)}\n\nTASK: Generate ONLY the custom CSS based on the PRD and the provided HTML. Tailwind is already loaded, so only generate custom keyframes, complex gradients, or layout fixes that Tailwind cannot easily handle natively. If no custom CSS is needed, return empty string.\n\nPRD:\n${JSON.stringify(prd)}\n\nHTML CONTEXT:\n${html}\n\nOUTPUT FORMAT MUST BE VALID JSON enclosed in markdown code blocks:\n{ "code": ".custom-class { ... }" }` }];
    } else if (action === 'build_js') {
       messages = [{ role: 'user', content: `You are an expert Apple/Gemini-level Full-Stack Developer.\n\n${BASE_BUILDER_RULES.replaceAll('${UNSPLASH_ACCESS_KEY}', UNSPLASH_ACCESS_KEY)}\n\nTASK: Generate ONLY the complete JavaScript logic based on the PRD, HTML, and CSS. Implement real functionality, DOM manipulation, open-source APIs (like Leaflet for maps), and local state management. NO PLACEHOLDERS.\n\nPRD:\n${JSON.stringify(prd)}\n\nHTML CONTEXT:\n${html}\n\nCSS CONTEXT:\n${css}\n\nOUTPUT FORMAT MUST BE VALID JSON enclosed in markdown code blocks:\n{ "code": "document.addEventListener('DOMContentLoaded', () => { ... });" }` }];
    } else if (action === 'edit') {
       messages = [{ role: 'user', content: `You are an expert Apple/Gemini-level Software Architect.\n\n${BASE_BUILDER_RULES.replaceAll('${UNSPLASH_ACCESS_KEY}', UNSPLASH_ACCESS_KEY)}\n\nTASK: Modify the following application codebase based strictly on the user's edit request.\n\nUSER EDIT REQUEST:\n${prompt}\n\nCURRENT HTML:\n${html}\n\nCURRENT CSS:\n${css}\n\nCURRENT JS:\n${prd || ''}\n\nOUTPUT FORMAT MUST BE VALID JSON enclosed in markdown code blocks containing the FULL updated codebase:\n{ "html": "...", "css": "...", "js": "..." }` }];
    } else {
       return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
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
