export const maxDuration = 300;
import { NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const SYSTEM_PROMPT = `You are an expert Apple/Gemini-level Software Engineer and UI/UX Designer.
Your task is to generate a fully functional, 100% complete, production-ready web application based on the user's prompt.
THIS IS NOT A PROTOTYPE OR DEMO. DO NOT USE "COMING SOON" PLACEHOLDERS. DO NOT USE "TODO" or "Insert here". EVERY SINGLE BUTTON MUST BE SYNCED END-TO-END AND HAVE LOGIC BEHIND IT.

You MUST adhere to the following STRICT rules:
1.  **Code Output**: Return ONLY valid HTML, CSS, and JS. Do not wrap the code in Markdown blocks (like \`\`\`html) unless you are returning a JSON object. For this API, you will return a JSON object with three keys: "html", "css", "js".
2.  **Design & UI**:
    - You MUST use Tailwind CSS for styling via CDN.
    - Choose a highly appropriate, professional color palette based on the user's idea. Ensure high contrast and accessibility.
    - Maintain world-class layout with immense negative space, elegant typography, and zero clutter.
    - Use Lucide icons (via CDN/script) where applicable. NEVER use emojis.
    - Implement smooth transitions or basic animations where appropriate.
    - WARNING: If you use Dialogs or Modals, you MUST provide an \`aria-labelledby\` (DialogTitle) and \`aria-describedby\` (DialogDescription) or the frontend UI will CRASH due to Radix UI accessibility requirements.
3.  **Imagery (CRITICAL)**:
    - Do NOT use colored squares or gray boxes for images.
    - You MUST use the provided Unsplash Key for EVERY image so no broken image links occur.
    - Fetch highly relevant, real-world images from Unsplash using this API key: \${UNSPLASH_ACCESS_KEY}.
    - The URL format is: \`https://api.unsplash.com/photos/random?query=YOUR_KEYWORD&client_id=\${UNSPLASH_ACCESS_KEY}\`. You can also use Unsplash Source URLs for simplicity: \`https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80\` (make sure to pick diverse, realistic photos).
4.  **Secrets & Logic**:
    - Build a FULL PRODUCT. If the app requires a database or auth (like Supabase, Firebase, etc.), you MAY hardcode mock login credentials (e.g., admin/password) for demonstration purposes.
    - However, structure the code so that it checks for \`window.ENV.SUPABASE_URL\` or similar injected variables first, falling back to local storage or mock logic if they don't exist.


Output format MUST be valid JSON enclosed in markdown code blocks. The JSON must have EXACTLY these keys:
{
  "html": "<div>...</div>",
  "css": ".custom-class { ... }",
  "js": "console.log('running');"
}
`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (!DEEPSEEK_API_KEY) {
      // Return a simulated high-quality mock if the API key isn't set, to avoid crashing the PoC.
      // In production, this would strictly fail or use a real key.
      console.warn("DEEPSEEK_API_KEY is not set. Returning simulated response.");
      return NextResponse.json({
        html: `<div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8"><h1 class="text-4xl font-bold mb-4">Simulated App for: ${prompt}</h1><p class="text-gray-600 mb-8">Please provide a DEEPSEEK_API_KEY in your environment to generate real code.</p><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="rounded-xl shadow-lg max-w-2xl w-full" alt="Coding"></div>`,
        css: `body { font-family: system-ui, sans-serif; }`,
        js: `console.log("Simulated app loaded.");`
      });
    }

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-reasoner', // DeepSeek-V3 is invoked via deepseek-chat
        messages: [
          { role: 'user', content: SYSTEM_PROMPT.replaceAll('${UNSPLASH_ACCESS_KEY}', UNSPLASH_ACCESS_KEY || 'MOCK_UNSPLASH_KEY_FOR_TESTING') + '\n\nUser Request: ' + prompt }
        ],
        temperature: 0.1, // Keep it deterministic and focused on code
        // response_format not supported by reasoner yet
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
      // Deepseek Reasoner will output reasoning (in reasoning_content) and final text in content.
      // We extract from the markdown block.
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
