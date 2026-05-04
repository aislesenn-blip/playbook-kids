import os
import subprocess

# Apply all patches

# patch_hero.py
with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# Replace the Ultimate banner
content = content.replace(
    "The Ultimate Student Cloud Stationary. Upload. Format. Print.",
    "Skip Microsoft Word. Edit documents instantly with your own instructions, spacing. Draw tables. Margins."
)

# Replace the Hero text block
content = content.replace(
    """Your work.<br/>Perfectly formatted.
              </h2>
              <div className="flex-grow flex flex-col justify-center items-center text-center bg-emerald-50 rounded p-4 mb-3">
                <Settings className="w-10 h-10 text-emerald-600 mb-3" />
                <p className="text-sm text-gray-700 font-medium">
                  AI engine fixes grammar, aligns margins, & outputs print-ready PDFs.
                </p>""",
    """Tired of Microsoft Word?<br/>Skip it.
              </h2>
              <div className="flex-grow flex flex-col justify-center items-center text-center bg-emerald-50 rounded p-4 mb-3">
                <Settings className="w-10 h-10 text-emerald-600 mb-3" />
                <p className="text-sm text-gray-700 font-medium">
                  Draw tables, align margins, and edit instantly by just chatting. No hard formatting.
                </p>"""
)

content = content.replace('href="/login"', 'href="/auth/login"')
content = content.replace('href="/signup"', 'href="/auth/signup"')

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)

# patch print station
with open("unimonday-web/src/app/print-station/page.tsx", "r") as f:
    content = f.read()

new_handle_submit = """  const handleSubmit = () => {
    if (!currentUser) {
      toast.error("Please create an account to send a job, to prevent fraud.");
      router.push("/auth/login?redirectTo=/print-station");
      return;
    }
    if (selectedStationary) {
      setIsSubmitted(true);
    }
  };"""

content = content.replace("""  const handleSubmit = () => {
    if (selectedStationary) {
      setIsSubmitted(true);
    }
  };""", new_handle_submit)

if "import { useRouter } from" not in content:
    content = content.replace('import { Printer, MapPin, Search, Send, FileText, CheckCircle, UploadCloud, Star, DollarSign } from "lucide-react";', 'import { Printer, MapPin, Search, Send, FileText, CheckCircle, UploadCloud, Star, DollarSign } from "lucide-react";\nimport { useRouter } from "next/navigation";')
    content = content.replace('export default function PrintStationPage() {', 'export default function PrintStationPage() {\n  const router = useRouter();')

if "import { useState } from" not in content:
    content = content.replace('import { useState } from "react";', 'import { useState } from "react";\nimport { useAppStore } from "@/lib/store/app-store";\nimport { toast } from "sonner";')
elif "import { useAppStore } from" not in content:
    content = content.replace('import { useState } from "react";', 'import { useState } from "react";\nimport { useAppStore } from "@/lib/store/app-store";\nimport { toast } from "sonner";')

if "const { currentUser } = useAppStore();" not in content:
    content = content.replace("export default function PrintStationPage() {\n  const router = useRouter();", "export default function PrintStationPage() {\n  const router = useRouter();\n  const { currentUser } = useAppStore();")

with open("unimonday-web/src/app/print-station/page.tsx", "w") as f:
    f.write(content)

# patch TopNav
with open("unimonday-web/src/components/layout/TopNav.tsx", "r") as f:
    content = f.read()

content = content.replace(
    'import { User, Menu, X, Search, FileText, PenTool, LayoutTemplate, FolderOpen, Printer, PlusCircle } from "lucide-react";',
    'import { User, Menu, X, Search, FileText, PenTool, LayoutTemplate, FolderOpen, Printer, PlusCircle, Bell, CheckCircle } from "lucide-react";'
)

content = content.replace("const [isSearchOpen, setIsSearchOpen] = useState(false);", "const [isNotifOpen, setIsNotifOpen] = useState(false);")
content = content.replace("setIsSearchOpen(true)", "setIsNotifOpen(true)")
content = content.replace("setIsSearchOpen(false)", "setIsNotifOpen(false)")
content = content.replace("isSearchOpen", "isNotifOpen")

content = content.replace(
    """<button onClick={() => setIsNotifOpen(true)} className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>""",
    """<button onClick={() => setIsNotifOpen(true)} className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>"""
)

search_modal = """{/* Search Modal */}
      <AnimatePresence>
        {isNotifOpen && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/50 z-[60] flex flex-col pt-20 px-4"
             onClick={() => setIsNotifOpen(false)}
           >
             <motion.div
               initial={{ y: -20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -20, opacity: 0 }}
               className="bg-white w-full max-w-2xl mx-auto rounded-2xl p-4 shadow-2xl flex items-center gap-3"
               onClick={(e) => e.stopPropagation()}
             >
               <Search className="w-6 h-6 text-gray-400" />
               <input
                 type="text"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onKeyDown={handleSearch}
                 placeholder="Search templates, files, or print shops... (Press Enter)"
                 className="flex-1 bg-transparent border-none outline-none text-lg font-medium"
                 autoFocus
               />
               <button onClick={() => setIsNotifOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                 <X className="w-5 h-5" />
               </button>
             </motion.div>
           </motion.div>
        )}
      </AnimatePresence>"""

notif_modal = """{/* Notification Modal */}
      <AnimatePresence>
        {isNotifOpen && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/20 z-[60] flex flex-col pt-16 px-4 items-end"
             onClick={() => setIsNotifOpen(false)}
           >
             <motion.div
               initial={{ y: -10, opacity: 0, scale: 0.95 }}
               animate={{ y: 0, opacity: 1, scale: 1 }}
               exit={{ y: -10, opacity: 0, scale: 0.95 }}
               className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
               onClick={(e) => e.stopPropagation()}
             >
               <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                 <h3 className="font-black text-gray-900">Notifications</h3>
                 <button onClick={() => setIsNotifOpen(false)} className="p-1 text-gray-400 hover:bg-gray-200 rounded-full transition-colors">
                   <X className="w-5 h-5" />
                 </button>
               </div>

               <div className="p-2 max-h-[60vh] overflow-y-auto">
                 {/* Dummy Notification */}
                 <div className="p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer flex gap-3 items-start">
                   <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                     <CheckCircle className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-gray-900 mb-0.5">Your Document is Ready</p>
                     <p className="text-xs text-gray-500 line-clamp-2">The stationary shop has completed your print job. It is ready for pickup.</p>
                     <p className="text-[10px] font-bold text-gray-400 mt-1">2 mins ago</p>
                   </div>
                 </div>
               </div>

               <div className="p-3 border-t border-gray-100 text-center">
                 <button className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">Mark all as read</button>
               </div>
             </motion.div>
           </motion.div>
        )}
      </AnimatePresence>"""

content = content.replace(search_modal, notif_modal)

with open("unimonday-web/src/components/layout/TopNav.tsx", "w") as f:
    f.write(content)


# app-store
with open("unimonday-web/src/lib/store/app-store.ts", "r") as f:
    content = f.read()

if "savedFiles: {" not in content:
    app_state_interface = """interface AppState {
  currentUser: User | null;"""

    new_app_state_interface = """interface AppState {
  savedFiles: { id: string, name: string, type: string, date: string, size: string }[];
  addSavedFile: (file: { id: string, name: string, type: string, date: string, size: string }) => void;
  currentUser: User | null;"""
    content = content.replace(app_state_interface, new_app_state_interface)

    state_initial = """      cart: [],
      orders: [],
      vendorProducts: [],"""
    new_state_initial = """      savedFiles: [],
      cart: [],
      orders: [],
      vendorProducts: [],"""
    content = content.replace(state_initial, new_state_initial)

    action_impl = """      addVendorProduct: (product) => set((state) => ({ vendorProducts: [product, ...state.vendorProducts] })),"""
    new_action_impl = """      addSavedFile: (file) => set((state) => ({ savedFiles: [file, ...state.savedFiles] })),
      addVendorProduct: (product) => set((state) => ({ vendorProducts: [product, ...state.vendorProducts] })),"""
    content = content.replace(action_impl, new_action_impl)

    reset_app = """resetApp: () => set({ currentUser: null, currentRegion: null, currentCampusName: null, isCartOpen: false, cart: [], pendingMessages: [], orders: [], vendorProducts: [] }),"""
    new_reset_app = """resetApp: () => set({ savedFiles: [], currentUser: null, currentRegion: null, currentCampusName: null, isCartOpen: false, cart: [], pendingMessages: [], orders: [], vendorProducts: [] }),"""
    content = content.replace(reset_app, new_reset_app)

with open("unimonday-web/src/lib/store/app-store.ts", "w") as f:
    f.write(content)

# workspace
with open("unimonday-web/src/app/workspace/page.tsx", "r") as f:
    content = f.read()

content = content.replace(
    'className="flex-grow bg-[#E5E7EB] p-8 overflow-y-auto flex justify-center custom-scrollbar relative"',
    'className="flex-grow bg-[#E5E7EB] p-2 sm:p-8 overflow-y-auto custom-scrollbar relative"'
)

if "const [fileName, setFileName]" not in content:
    content = content.replace(
        "const [showCompletionPopup, setShowCompletionPopup] = useState(false);",
        "const [showCompletionPopup, setShowCompletionPopup] = useState(false);\n  const [showSaveModal, setShowSaveModal] = useState(false);\n  const [fileName, setFileName] = useState('');\n  const { addSavedFile } = useAppStore();"
    )

if "useAppStore" not in content and "addSavedFile" in content:
    content = content.replace('import { useRouter } from "next/navigation";', 'import { useRouter } from "next/navigation";\nimport { useAppStore } from "@/lib/store/app-store";')
elif "import { useAppStore } from" not in content:
    content = content.replace('import { useRouter } from "next/navigation";', 'import { useRouter } from "next/navigation";\nimport { useAppStore } from "@/lib/store/app-store";')

save_modal = """
        {/* Save Naming Modal */}
        <AnimatePresence>
          {showSaveModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl shadow-2xl p-8 w-full md:w-3/4 lg:w-1/3 relative mx-4"
              >
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-2xl font-black text-center text-gray-900 mb-4">Name your document</h3>

                <input
                  type="text"
                  autoFocus
                  placeholder="e.g. Biology Lab Report"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                />

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                        if(fileName.trim()){
                            addSavedFile({
                                id: crypto.randomUUID(),
                                name: fileName.trim() + ".pdf",
                                type: "PDF",
                                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                                size: "1.2 MB"
                            });
                            setShowSaveModal(false);
                            router.push('/my-files');
                        }
                    }}
                    className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all"
                  >
                    Save & Go to Files
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
"""

if "Save Naming Modal" not in content:
    content = content.replace("{/* Completion Pop-up Modal */}", save_modal + "\n        {/* Completion Pop-up Modal */}")

save_btn = """<button onClick={() => setShowSaveModal(true)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-xl text-sm font-bold transition-colors">
                      Save to Files
                    </button>"""

if "Save to Files" not in content:
    content = content.replace(
        """<Link href="/print-station" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
                      <Printer className="w-4 h-4" /> Print PDF
                    </Link>""",
        f"""{save_btn}
                    <Link href="/print-station" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
                      <Printer className="w-4 h-4" /> Print PDF
                    </Link>"""
    )

if "Save to Files" not in content.replace(save_btn, ""):
    content = content.replace(
        """<button
                    onClick={() => setShowCompletionPopup(false)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-xl transition-all"
                  >
                    Review Document First
                  </button>""",
        """<button
                    onClick={() => { setShowCompletionPopup(false); setShowSaveModal(true); }}
                    className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all"
                  >
                    Save to Files
                  </button>
                  <button
                    onClick={() => setShowCompletionPopup(false)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-xl transition-all"
                  >
                    Review Document First
                  </button>"""
    )

with open("unimonday-web/src/app/workspace/page.tsx", "w") as f:
    f.write(content)

# my files
with open("unimonday-web/src/app/my-files/page.tsx", "r") as f:
    content = f.read()

if "import { useAppStore }" not in content:
    content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { useAppStore } from "@/lib/store/app-store";')

if "const { savedFiles } = useAppStore();" not in content:
    content = content.replace("export default function MyFilesPage() {", "export default function MyFilesPage() {\n  const { savedFiles } = useAppStore();")

if "const filesToDisplay = " not in content:
    content = content.replace("const dummyFiles = [", "const dummyFiles = [")
    content = content.replace("{dummyFiles.map((file) => (", "{((savedFiles && savedFiles.length > 0) ? savedFiles : dummyFiles).map((file) => (")

with open("unimonday-web/src/app/my-files/page.tsx", "w") as f:
    f.write(content)
