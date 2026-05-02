with open('unimonday-web/src/app/admin/dashboard/page.tsx', 'r') as f:
    content = f.read()

# Add reputation tab and fix mobile responsiveness for tables

# 1. Update the tabs state and buttons
content = content.replace("const [activeTab, setActiveTab] = useState<'overview' | 'algorithm' | 'godseye'>('algorithm');", "const [activeTab, setActiveTab] = useState<'overview' | 'algorithm' | 'godseye' | 'reputation'>('algorithm');")

tabs_html = """
          <div className="flex flex-wrap gap-2 bg-gray-800 p-1 rounded-xl">
             <button onClick={() => setActiveTab('overview')} className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'overview' ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'}`}>
                <LayoutDashboard className="w-4 h-4"/> <span className="hidden sm:inline">Overview</span>
             </button>
             <button onClick={() => setActiveTab('algorithm')} className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'algorithm' ? 'bg-emerald-400 text-gray-900' : 'text-gray-300 hover:text-emerald-400'}`}>
                <Settings2 className="w-4 h-4"/> <span className="hidden sm:inline">Algorithm</span>
             </button>
             <button onClick={() => setActiveTab('reputation')} className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'reputation' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-blue-400'}`}>
                <Star className="w-4 h-4"/> <span className="hidden sm:inline">Reputation</span>
             </button>
             <button onClick={() => setActiveTab('godseye')} className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'godseye' ? 'bg-red-500 text-white' : 'text-gray-300 hover:text-red-400'}`}>
                <Eye className="w-4 h-4"/> <span className="hidden sm:inline">Gods Eye</span>
             </button>
          </div>
"""
import re
content = re.sub(r'<div className="flex gap-2 bg-gray-800 p-1 rounded-xl">.*?</div>', tabs_html, content, flags=re.DOTALL)

# Add Star import if not present
if "Star," not in content and "Star " not in content:
   content = content.replace("ShieldAlert, Users,", "ShieldAlert, Users, Star, Award, MessageCircle,")

# Add Reputation content block
reputation_block = """
        {activeTab === 'reputation' && (
           <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
             <div>
               <h2 className="text-2xl font-black text-blue-600 flex items-center gap-2">
                  <Star className="w-6 h-6" /> Reputation Engine
               </h2>
               <p className="text-muted-foreground font-medium">Control brand perception. Moderate reviews and assign badges to top vendors.</p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Review Moderation */}
                <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                   <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                     <h3 className="font-black flex items-center gap-2"><MessageCircle className="w-5 h-5"/> Pending Reviews</h3>
                   </div>
                   <div className="p-4 space-y-4">
                      <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                         <div className="flex justify-between items-start mb-2">
                            <div>
                               <p className="font-bold text-sm">Review for: Pro Wireless Earbuds</p>
                               <div className="flex text-amber-400 mt-1">
                                 <Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/>
                               </div>
                            </div>
                            <span className="text-xs font-bold text-gray-500">By Student_12</span>
                         </div>
                         <p className="text-sm font-medium text-gray-700 italic">"Amazing product and fast delivery!"</p>
                         <div className="mt-4 flex gap-2">
                            <button className="flex-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-xs font-bold py-2 rounded-lg transition-colors">Approve & Pin</button>
                            <button className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold py-2 rounded-lg transition-colors">Hide / Delete</button>
                         </div>
                      </div>

                      <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                         <div className="flex justify-between items-start mb-2">
                            <div>
                               <p className="font-bold text-sm">Review for: Vintage Jacket</p>
                               <div className="flex text-amber-400 mt-1">
                                 <Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 text-gray-300"/><Star className="w-3 h-3 text-gray-300"/><Star className="w-3 h-3 text-gray-300"/><Star className="w-3 h-3 text-gray-300"/>
                               </div>
                            </div>
                            <span className="text-xs font-bold text-gray-500">By Jane_Doe</span>
                         </div>
                         <p className="text-sm font-medium text-gray-700 italic">"Terrible quality, total scam."</p>
                         <div className="mt-4 flex gap-2">
                            <button className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-bold py-2 rounded-lg transition-colors">Keep Visible</button>
                            <button className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold py-2 rounded-lg transition-colors">Hide (Flagged)</button>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Vendor Profile Boosts */}
                <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                   <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                     <h3 className="font-black flex items-center gap-2"><Award className="w-5 h-5"/> Profile Boosts</h3>
                   </div>
                   <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between p-4 border border-emerald-100 bg-emerald-50/30 rounded-xl">
                         <div>
                            <p className="font-black">TechZone UDSM</p>
                            <p className="text-xs text-gray-500 font-medium">98% positive ratings</p>
                         </div>
                         <div className="flex items-center gap-2">
                            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Top Seller</span>
                            <button className="text-xs font-bold text-red-500 hover:underline">Revoke</button>
                         </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                         <div>
                            <p className="font-black">SneakerHeadz</p>
                            <p className="text-xs text-gray-500 font-medium">85% positive ratings</p>
                         </div>
                         <button className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1">
                            <Award className="w-3 h-3"/> Assign Badge
                         </button>
                      </div>
                   </div>
                </div>
             </div>
           </div>
        )}
"""

content = content.replace("        {activeTab === 'godseye' && (", reputation_block + "\n        {activeTab === 'godseye' && (")

with open('unimonday-web/src/app/admin/dashboard/page.tsx', 'w') as f:
    f.write(content)
