"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { Image } from '@tiptap/extension-image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Sparkles, Wand2, Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter } from 'lucide-react';
import { useWorkspaceStore } from '@/lib/store/workspace-store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PdfExportButton from './PdfExportButton';

export default function TipTapModal() {
  const router = useRouter();
  const { blocks, activeBlockId, setActiveBlock } = useWorkspaceStore();
  const activeBlock = blocks.find((b) => b.id === activeBlockId);
  const [isAiEditing, setIsAiEditing] = useState(false);

  // Initialize TipTap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Image,
    ],
    content: '', // Will be updated via effect
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base max-w-none w-full outline-none min-h-[1056px] bg-white p-12 sm:p-24 shadow-xl mb-12', // A4 Paper styling
      },
    },
  });

  // Sync content when active block changes
  useEffect(() => {
    if (editor && activeBlock && activeBlock.content) {
      editor.commands.setContent(activeBlock.content);

      // Highlight animation (Dopamine hit) for new content
      setTimeout(() => setIsAiEditing(true), 0);
      setTimeout(() => setIsAiEditing(false), 2000);
    }
  }, [editor, activeBlock]);

  if (!activeBlockId || !activeBlock) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-50 flex flex-col bg-gray-100"
      >
        {/* Top Navigation Bar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveBlock(null)}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-tight">{activeBlock.title}</span>
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Generated
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <PdfExportButton documentContent={activeBlock.content} title={activeBlock.title} />

            <button
              onClick={() => {
                setActiveBlock(null);
                router.push('/print-station');
              }}
              className="bg-gray-900 hover:bg-black text-white px-4 sm:px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Print Locally</span>
            </button>
          </div>
        </div>

        {/* Floating Contextual Toolbar (Bubble Menu) */}
        {editor && (
          <BubbleMenu editor={editor} className="bg-white border border-gray-200 shadow-xl rounded-xl p-1.5 flex gap-1 items-center">
            <button
               onClick={() => alert("This opens the micro AI chat to edit this specific selection.")}
               className="p-2 rounded hover:bg-emerald-50 text-emerald-600 font-bold flex items-center gap-1 text-sm border-r border-gray-100 pr-3 mr-1"
            >
              <Wand2 className="w-4 h-4" /> Chat to Edit
            </button>
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}><Bold className="w-4 h-4" /></button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}><Italic className="w-4 h-4" /></button>
            <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded ${editor.isActive('underline') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}><UnderlineIcon className="w-4 h-4" /></button>
            <div className="w-px h-5 bg-gray-300 mx-1" />
            <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}><AlignLeft className="w-4 h-4" /></button>
            <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}><AlignCenter className="w-4 h-4" /></button>
          </BubbleMenu>
        )}

        {/* Scrollable Canvas Area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-8 flex justify-center custom-scrollbar relative">
          <motion.div
            animate={{
              boxShadow: isAiEditing ? "0 0 0 4px rgba(16, 185, 129, 0.5)" : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[800px] relative transition-all"
          >
            {isAiEditing && (
              <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10 animate-pulse shadow-sm">
                <Sparkles className="w-3 h-3" /> Updated
              </div>
            )}
            {/* The actual Editor content */}
            <EditorContent editor={editor} />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
