// Mock API wrapper to simulate DeepSeek Formatting behavior

export const simulateAiFormatting = async (
  prompt: string,
  processAIResponse: (jsonString: string, blockTitle: string) => void
) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      let mockJsonStructure = "";
      let title = "Generated Draft";

      const lowerPrompt = prompt.toLowerCase();

      // Simple heuristics to mimic intent recognition
      if (lowerPrompt.includes("table") || lowerPrompt.includes("jadwali")) {
        title = "Data Table";
        mockJsonStructure = JSON.stringify({
          type: "doc",
          content: [
            { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Structured Table" }] },
            {
              type: "table",
              content: [
                {
                  type: "tableRow",
                  content: [
                    { type: "tableHeader", content: [{ type: "paragraph", content: [{ type: "text", text: "Item" }] }] },
                    { type: "tableHeader", content: [{ type: "paragraph", content: [{ type: "text", text: "Amount" }] }] }
                  ]
                },
                {
                  type: "tableRow",
                  content: [
                    { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Pens" }] }] },
                    { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "$5" }] }] }
                  ]
                },
                {
                  type: "tableRow",
                  content: [
                    { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Paper (A4 Ream)" }] }] },
                    { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "$12" }] }] }
                  ]
                }
              ]
            }
          ]
        });
      } else if (lowerPrompt.includes("apa") || lowerPrompt.includes("format")) {
        title = "APA Styled Document";
        mockJsonStructure = JSON.stringify({
          type: "doc",
          content: [
            { type: "heading", attrs: { level: 1, textAlign: "center" }, content: [{ type: "text", text: "Title of Your Document" }] },
            { type: "paragraph", attrs: { textAlign: "center" }, content: [{ type: "text", text: "John Doe" }] },
            { type: "paragraph", attrs: { textAlign: "center" }, content: [{ type: "text", text: "Department of Computer Science, University" }] },
            { type: "paragraph", attrs: { textAlign: "center" }, content: [{ type: "text", text: "CS 101: Introduction to Formatting" }] },
            { type: "paragraph", attrs: { textAlign: "center" }, content: [{ type: "text", text: "Prof. Jane Smith" }] },
            { type: "paragraph", attrs: { textAlign: "center" }, content: [{ type: "text", text: "May 5, 2024" }] },
            { type: "paragraph", content: [{ type: "text", text: "" }] },
            { type: "paragraph", attrs: { textAlign: "justify" }, content: [{ type: "text", text: "This is a strictly formatted APA document generated via JSON commands. The margins, line-height, and indentations are handled mathematically behind the scenes, ensuring you do not lose points for bad formatting." }] }
          ]
        });
      } else if (lowerPrompt.includes("barua") || lowerPrompt.includes("letter")) {
        title = "Official Letter";
        mockJsonStructure = JSON.stringify({
          type: "doc",
          content: [
            { type: "paragraph", attrs: { textAlign: "right" }, content: [{ type: "text", marks: [{ type: "bold" }], text: "Mawasiliano Yako Hapa," }] },
            { type: "paragraph", attrs: { textAlign: "right" }, content: [{ type: "text", text: "S.L.P 1234," }] },
            { type: "paragraph", attrs: { textAlign: "right" }, content: [{ type: "text", text: "Dar es Salaam." }] },
            { type: "paragraph", attrs: { textAlign: "right" }, content: [{ type: "text", text: "Tarehe: Leo" }] },
            { type: "paragraph", content: [{ type: "text", text: "Kwa Mkurugenzi," }] },
            { type: "paragraph", content: [{ type: "text", text: "Kituo Cha Ubunifu," }] },
            { type: "paragraph", content: [{ type: "text", text: "S.L.P 4321, Dar es Salaam." }] },
            { type: "paragraph", content: [{ type: "text", text: "" }] },
            { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }, { type: "underline" }], text: "YAH: MAOMBI YA KAZI" }] },
            { type: "paragraph", content: [{ type: "text", text: "Husika na kichwa cha habari hapo juu. Ninakuandikia kuomba nafasi ya kazi katika kituo chenu, nikiwa na uzoefu wa miaka kadhaa katika masuala ya teknolojia." }] },
            { type: "paragraph", content: [{ type: "text", text: "Wako Mtiifu," }] },
            { type: "paragraph", content: [{ type: "text", text: "Jina Langu" }] }
          ]
        });
      } else {
        title = "Formatted Document";
        mockJsonStructure = JSON.stringify({
          type: "doc",
          content: [
            { type: "heading", attrs: { level: 1 }, content: [{ type: "text", text: "Document Title" }] },
            { type: "paragraph", content: [{ type: "text", text: "This is the perfectly formatted text generated by the AI, exactly as requested." }] },
            { type: "paragraph", content: [
                { type: "text", text: "Here is some " },
                { type: "text", marks: [{ type: "bold" }], text: "bolded text" },
                { type: "text", text: ", and some " },
                { type: "text", marks: [{ type: "italic" }], text: "italic text" },
                { type: "text", text: "." }
              ]
            }
          ]
        });
      }

      processAIResponse(mockJsonStructure, title);
      resolve();
    }, 1500); // Simulate network latency
  });
};
