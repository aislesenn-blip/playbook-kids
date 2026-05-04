"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Mock component to render a "Page" without react-window for now due to Next15 TS conflict
interface VirtualCanvasProps {
  totalPages: number;
  renderPageContent: (pageIndex: number) => React.ReactNode;
  pageHeight?: number;
}

export default function VirtualCanvas({ totalPages, renderPageContent, pageHeight = 1122 /* A4 96dpi height */ }: VirtualCanvasProps) {

  return (
    <div className="w-full h-full bg-[#E3E6E6] flex flex-col items-center overflow-y-auto custom-scrollbar">
       {Array.from({ length: totalPages }).map((_, index) => (
           <div key={index} style={{ display: 'flex', justifyContent: 'center', paddingBottom: 32, width: '100%' }}>
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.3 }}
             className="bg-white shadow-xl max-w-[800px] w-full relative"
             style={{ height: pageHeight - 32 }} // -32 for padding
           >
               <div className="absolute top-2 right-4 text-xs text-gray-400 font-medium">Page {index + 1}</div>
               {renderPageContent(index)}
           </motion.div>
         </div>
       ))}
    </div>
  );
}
