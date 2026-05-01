import { FolderOpen } from "lucide-react";

export default function LibraryPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
        <FolderOpen className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-black text-gray-900 mb-4">Your Library</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        Upload your PDFs, slides, and textbooks here. The Cognitive Engine will process them for study.
      </p>
      <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg">
        Upload New Document
      </button>
    </div>
  );
}
