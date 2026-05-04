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
import { X, Sparkles, Wand2, Bold, Italic, AlignLeft, AlignCenter, GripVertical } from 'lucide-react';
import { useWorkspaceStore } from '@/lib/store/workspace-store';
import { useEffect, useState } from 'react';
import PdfExportButton from './PdfExportButton';

export default function VirtualTipTapModal() {
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
        class: 'prose prose-sm sm:prose-base max-w-none w-full outline-none min-h-[1056px] bg-white p-12 sm:p-24 shadow-xl mb-12 custom-a4-canvas', // A4 Paper styling
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-50 flex flex-col bg-[#E3E6E6]"
      >
        {/* Top Navigation Bar */}
        <div className="h-14 sm:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-6 shadow-sm shrink-0 z-20 relative">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveBlock(null)}
              className="p-1.5 sm:p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-tight text-sm sm:text-base">{activeBlock.title}</span>
              <span className="text-[10px] sm:text-xs font-medium text-emerald-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Cloud Document
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <PdfExportButton documentContent={activeBlock.content} title={activeBlock.title} />
          </div>
        </div>

        {/* Floating Contextual Toolbar (Bubble Menu) */}
        {editor && (
          <BubbleMenu editor={editor} className="bg-white border border-gray-200 shadow-xl rounded-xl p-1 sm:p-1.5 flex gap-0.5 sm:gap-1 items-center">
            <button
               onClick={() => alert("This triggers the AI micro-edit for this selection.")}
               className="p-1.5 sm:p-2 rounded hover:bg-emerald-50 text-emerald-600 font-bold flex items-center gap-1 text-xs sm:text-sm border-r border-gray-100 pr-2 sm:pr-3 mr-0.5 sm:mr-1"
            >
              <Wand2 className="w-3 h-3 sm:w-4 sm:h-4" /> Chat
            </button>
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 sm:p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}><Bold className="w-3 h-3 sm:w-4 sm:h-4" /></button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 sm:p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}><Italic className="w-3 h-3 sm:w-4 sm:h-4" /></button>
            <div className="w-px h-4 sm:h-5 bg-gray-300 mx-0.5 sm:mx-1" />
            <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-1.5 sm:p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}><AlignLeft className="w-3 h-3 sm:w-4 sm:h-4" /></button>
            <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-1.5 sm:p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}><AlignCenter className="w-3 h-3 sm:w-4 sm:h-4" /></button>
          </BubbleMenu>
        )}

        {/* Scrollable Canvas Area (Virtualization Ready Layout) */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-8 flex flex-col items-center custom-scrollbar relative bg-[#E3E6E6]">

          <motion.div
            animate={{
              boxShadow: isAiEditing ? "0 0 0 4px rgba(16, 185, 129, 0.5)" : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[800px] relative transition-all bg-white"
          >
            {/* Edge Grip for Mobile (Simulated) */}
            <div className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 p-1 bg-white border border-gray-200 rounded shadow-sm text-gray-400 cursor-grab hover:text-gray-600 hidden sm:flex">
                <GripVertical className="w-4 h-4" />
            </div>

            {isAiEditing && (
              <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10 animate-pulse shadow-sm">
                <Sparkles className="w-3 h-3" /> Updating via AI
              </div>
            )}

            {/* The actual Editor content inside A4 container */}
            <div className="w-full relative">
               <EditorContent editor={editor} />
            </div>

          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
