"use client";

import { FolderOpen, FileText, Download, Printer, Trash2, Search, Filter } from "lucide-react";
import Link from "next/link";

export default function MyFilesPage() {
  const dummyFiles = [
    { id: 1, name: "Research_Proposal_Final.pdf", type: "PDF", date: "Oct 24, 2023", size: "2.4 MB" },
    { id: 2, name: "Leave_of_Absence_Letter.pdf", type: "PDF", date: "Oct 20, 2023", size: "1.1 MB" },
    { id: 3, name: "Chemistry_Lab_Report_Table.pdf", type: "PDF", date: "Oct 18, 2023", size: "3.5 MB" },
    { id: 4, name: "Group_Assignment_Draft.pdf", type: "PDF", date: "Oct 15, 2023", size: "4.2 MB" },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 pb-24">
      <div className="w-full px-4 md:px-8 mx-auto">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 flex items-center gap-3">
              <FolderOpen className="w-8 h-8 text-primary" /> My Cloud Files
            </h1>
            <p className="text-gray-500 font-medium mt-1">Manage all your formatted and uploaded documents.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/workspace" className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg flex items-center gap-2">
              New Document
            </Link>
          </div>
        </div>

        <div className="bg-white sm:rounded-3xl sm:shadow-sm sm:border border-gray-200 overflow-hidden border-y sm:border-y-0 -mx-4 sm:mx-0">

          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50">
             <div className="relative w-full sm:w-96">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search files..."
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
             </div>
             <button className="flex items-center gap-2 text-gray-600 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 w-full sm:w-auto justify-center">
               <Filter className="w-4 h-4" /> Filter
             </button>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-bold">
                  <th className="p-4 pl-6 border-b border-gray-100">File Name</th>
                  <th className="p-4 border-b border-gray-100">Date Modified</th>
                  <th className="p-4 border-b border-gray-100">Size</th>
                  <th className="p-4 pr-6 border-b border-gray-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dummyFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0 border border-red-100">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500 font-medium">Formatted Document</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 font-medium">{file.date}</td>
                    <td className="p-4 text-sm text-gray-600 font-medium">{file.size}</td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                        <Link href="/print-station" className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Send to Print">
                          <Printer className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
