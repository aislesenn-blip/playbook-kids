"use client";

import React, { useState } from 'react';
import { Document, Page, pdf } from '@react-pdf/renderer';
import { parseTipTapNodeToPdf, TipTapNode } from '@/lib/utils/tiptapToPdf';
import { Download, Loader2 } from 'lucide-react';

interface PdfExportButtonProps {
  documentContent: TipTapNode;
  title: string;
}

// The PDF Document Component
const TipTapPdfDocument = ({ content }: { content: TipTapNode }) => (
  <Document>
    <Page size="A4" style={{ padding: 40, backgroundColor: '#ffffff' }}>
      {parseTipTapNodeToPdf(content)}
    </Page>
  </Document>
);

export default function PdfExportButton({ documentContent, title }: PdfExportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  // We generate the PDF Blob on the fly when the button is clicked to avoid slowing down the initial render
  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(<TipTapPdfDocument content={documentContent} />).toBlob();
      const url = URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/\s+/g, '_')}_Generated.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating || !documentContent}
      className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-lg items-center gap-2 disabled:bg-emerald-400"
    >
      {isGenerating ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      <span>Export PDF</span>
    </button>
  );
}
