"use client";

import { useState } from "react";
import { Play, Code, ChevronRight, LayoutTemplate } from "lucide-react";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';

// 1. AST Parser Function (The Engine)
const parseASTtoHTML = (astJsonStr: string) => {
  try {
    const data = JSON.parse(astJsonStr);
    if (!data.Document_Tree) throw new Error("Invalid AST: Missing Document_Tree");

    let html = "";
    data.Document_Tree.forEach((node: { tag: string; style?: Record<string, string | number>; content: string }) => {
      const { tag, style, content } = node;

      let styleString = "";
      if (style) {
        if (style.align) styleString += `text-align: ${style.align}; `;
        if (style.size) styleString += `font-size: ${style.size}px; `;
        if (style.font) styleString += `font-family: '${style.font}', sans-serif; `;
        if (style.spacing) styleString += `line-height: ${style.spacing}; `;
      }

      if (tag === "Kichwa_Kuu") {
        html += `<h1 style="${styleString} margin-bottom: 20px; word-wrap: break-word;"><strong>${content}</strong></h1>`;
      } else if (tag === "Aya") {
        // preserve line breaks
        const formattedContent = content.replace(/\n/g, '<br/>');
        html += `<p style="${styleString} margin-bottom: 12px; word-wrap: break-word;">${formattedContent}</p>`;
      } else {
        html += `<p style="${styleString} margin-bottom: 12px; word-wrap: break-word;">${content}</p>`;
      }
    });

    return html;
  } catch (err: unknown) {
    if (err instanceof Error) throw new Error(`Failed to parse JSON: ${err.message}`);
    throw new Error(`Failed to parse JSON.`);
  }
};

const defaultJSON = `{
  "Metadata": {
    "Type": "Barua Rasmi",
    "Engine": "Format-by-Example AST Parser",
    "Margins": "1.5 inch left"
  },
  "Document_Tree": [
    {
      "tag": "Kichwa_Kuu",
      "style": { "font": "Arial", "size": 16, "align": "center" },
      "content": "BARUA YA KUTHIBITISHA MPANGO KAZI MPYA"
    },
    {
      "tag": "Aya",
      "style": { "spacing": 1.5, "font": "Times New Roman", "size": 12 },
      "content": "YAH: MAPINDUZI YA KUPANGILIA NYARAKA BILA STRESS"
    },
    {
      "tag": "Aya",
      "style": { "spacing": 1.5, "font": "Times New Roman", "size": 12 },
      "content": "Ndugu Mkurugenzi wa Bidhaa, naandika barua hii kudhibitisha kuwa tumepata muarobaini wa kweli. Mfumo wetu sasa hautalazimisha watumiaji kuchat na AI, bali utafanya uchawi wa kunyonya muonekano wa mfano na kuupachika kwenye maneno ghafi ya mtumiaji chini ya milisekunde chache."
    },
    {
      "tag": "Aya",
      "style": { "spacing": 1.5, "font": "Times New Roman", "size": 12 },
      "content": "Huu ni uthibitisho halisi wa jinsi 'Semantic Tagging' inavyofanya kazi nyuma ya pazia. Kama unavyoona kwenye hii JSON, tunatenganisha kabisa 'Muonekano' (Style) na 'Maudhui' (Content). Hii inalinda usahihi wa kazi ya mteja kwa asilimia 100 na kuzuia AI kupotosha (hallucinate) maneno."
    },
    {
      "tag": "Aya",
      "style": { "spacing": 1.5, "font": "Times New Roman", "size": 12 },
      "content": "Wako Kibiashara,\\n\\nChief Engineer."
    }
  ]
}`;

export default function EngineWorkspace() {
  const [jsonInput, setJsonInput] = useState(defaultJSON);
  const [error, setError] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
    ],
    content: '<p style="text-align: center; color: #666;">Document will appear here after execution...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[800px] w-full max-w-[100%]',
        style: 'width: 100%; max-width: 100%; word-wrap: break-word;',
      },
    },
  });

  const handleExecute = () => {
    setError(null);
    try {
      const htmlContent = parseASTtoHTML(jsonInput);
      if (editor) {
        editor.commands.setContent(htmlContent);
      }
    } catch (err: unknown) {
    if (err instanceof Error) throw new Error(`Failed to parse JSON: ${err.message}`);
      if (err instanceof Error) setError(err.message); else setError('Unknown error');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 pt-14 pb-20 overflow-hidden">

      {/* Left Panel: JSON AST Input */}
      <div className="w-1/2 flex flex-col border-r border-gray-300 bg-[#1E1E1E]">
        <div className="flex items-center justify-between p-3 bg-[#2D2D2D] border-b border-gray-600">
          <div className="flex items-center gap-2 text-white">
            <Code className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm tracking-wide">JSON AST Input (Blueprint)</span>
          </div>
          <button
            onClick={handleExecute}
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-md text-sm font-bold transition-colors"
          >
            <Play className="w-4 h-4 fill-white" /> Execute Formatting
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-400 p-2 text-xs font-mono border-b border-red-500/20">
            {error}
          </div>
        )}

        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="flex-grow bg-transparent text-[#D4D4D4] font-mono text-sm p-4 focus:outline-none resize-none custom-scrollbar"
          spellCheck="false"
        />
      </div>

      {/* Center Divider / Magic Indicator */}
      <div className="w-8 flex flex-col items-center justify-center bg-gray-200 z-10 shadow-inner">
         <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shadow-md border border-emerald-200 -ml-8">
           <ChevronRight className="w-5 h-5 text-emerald-600" />
         </div>
      </div>

      {/* Right Panel: A4 Document Viewer */}
      <div className="w-1/2 flex flex-col bg-gray-100 overflow-y-auto items-center p-8 custom-scrollbar">

         <div className="w-full max-w-[800px] mb-4 flex items-center gap-2 text-gray-500">
           <LayoutTemplate className="w-5 h-5" />
           <span className="font-bold text-sm">Live Render Canvas (A4)</span>
         </div>

         {/* A4 Paper Container */}
         <div className="bg-white w-full max-w-[800px] min-h-[1123px] p-12 sm:p-16 lg:p-24 shadow-2xl rounded-sm mb-12 relative group ring-1 ring-black/5">
            <EditorContent editor={editor} />
         </div>

      </div>

    </div>
  );
}
