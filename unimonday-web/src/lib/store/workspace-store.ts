import { create } from 'zustand';
import { z } from 'zod';
import JSON5 from 'json5';

// 1. Zod Schema for TipTap Content Validation
// This ensures that the data coming from the AI is always structured correctly for TipTap.
const TipTapContentSchema = z.object({
  type: z.literal('doc'),
  content: z.array(z.any()), // Simplified for prototype, but in production, we'd recursively validate block types (paragraph, table, etc.)
});

export type TipTapDocument = z.infer<typeof TipTapContentSchema>;

// 2. Define the Document Block Interface
export interface DocumentBlock {
  id: string;
  title: string;
  content: TipTapDocument;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

// 3. Define the Chat Message Interface
export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
  draftBlockId?: string; // Links a message to a generated block
}

interface WorkspaceState {
  // Data
  blocks: DocumentBlock[];
  messages: ChatMessage[];
  activeBlockId: string | null;
  isProcessing: boolean;

  // Actions
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateBlock: (id: string, updates: Partial<DocumentBlock>) => void;
  setActiveBlock: (id: string | null) => void;
  processAIResponse: (jsonString: string, blockTitle: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  blocks: [],
  messages: [
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Hello! I am your AI Stationary Assistant. Upload your messy documents or type instructions, and I will format them perfectly into A4 pages.',
      timestamp: Date.now() - 10000,
    }
  ],
  activeBlockId: null,
  isProcessing: false,

  addMessage: (message) => {
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: `msg-${Date.now()}`,
          timestamp: Date.now(),
        },
      ],
    }));
  },

  updateBlock: (id, updates) => {
    set((state) => ({
      blocks: state.blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    }));
  },

  setActiveBlock: (id) => {
    set({ activeBlockId: id });
  },

  // 4. The Bulletproof JSON Parsing Logic (The Shield)
  processAIResponse: (rawAIResponse, blockTitle) => {
    set({ isProcessing: true });

    // Simulate network delay
    setTimeout(() => {
      try {
        // Step 1: Use JSON5 to parse potentially malformed JSON (trailing commas, etc.)
        // In a real scenario, we might extract JSON from Markdown code blocks first.
        let parsedData;
        try {
           parsedData = JSON5.parse(rawAIResponse);
        } catch (parseError) {
           console.error("JSON5 Parsing failed, attempting manual cleanup", parseError);
           // Fallback cleanup logic could go here
           throw new Error("Unable to parse AI response structure.");
        }

        // Step 2: Validate against our strict TipTap Schema using Zod
        const validatedContent = TipTapContentSchema.parse(parsedData);

        // Step 3: Create the Block and Update State Seamlessly
        const newBlockId = `block-${Date.now()}`;

        set((state) => ({
          blocks: [
            ...state.blocks,
            {
              id: newBlockId,
              title: blockTitle,
              content: validatedContent,
              status: 'completed',
            },
          ],
          messages: [
            ...state.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'ai',
              text: `Draft generated: ${blockTitle}. Tap to review.`,
              timestamp: Date.now(),
              draftBlockId: newBlockId,
            },
          ],
          isProcessing: false,
        }));

      } catch (error) {
        console.error("AI Output Validation Failed:", error);

        // Graceful Error Handling - Don't crash the UI!
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'ai',
              text: "I encountered a formatting issue while building that section. Let me fix it and try again.",
              timestamp: Date.now(),
            },
          ],
          isProcessing: false,
        }));
      }
    }, 2000);
  },
}));
