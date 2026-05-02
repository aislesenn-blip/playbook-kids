with open('unimonday-web/src/app/admin/dashboard/page.tsx', 'r') as f:
    content = f.read()

new_content = content.replace("""{activeTab === 'godseye' && (
           <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm text-center">
             <h2 className="text-2xl font-black text-red-600">Gods Eye Loading...</h2>
           </div>
        )}""", """{activeTab === 'godseye' && (
           <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
             <div>
               <h2 className="text-2xl font-black text-red-600 flex items-center gap-2">
                  <Eye className="w-6 h-6" /> God's Eye: Chat Moderation
               </h2>
               <p className="text-muted-foreground font-medium">Monitor communications between students and vendors for quality control and security.</p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                {/* Chat List */}
                <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                   <div className="p-4 border-b border-gray-100 bg-gray-50">
                     <h3 className="font-black">Active Threads</h3>
                   </div>
                   <div className="flex-1 overflow-y-auto p-2 space-y-1">
                      {[
                        { id: 1, student: 'Mary J.', vendor: 'TechZone', lastMessage: 'Kaka ile simu imefika, asante sana!', time: '10:42 AM', alert: false },
                        { id: 2, student: 'Peter', vendor: 'SneakerHeadz', lastMessage: 'Nitakutumia kwa namba hii ya TigoPesa...', time: '09:15 AM', alert: true },
                        { id: 3, student: 'Aisha', vendor: 'Campus Eats', lastMessage: 'Chakula kimechelewa sana leo.', time: 'Yesterday', alert: false },
                      ].map((chat) => (
                        <div key={chat.id} className="p-3 rounded-xl hover:bg-gray-50 cursor-pointer flex gap-3 border border-transparent hover:border-gray-100 transition-colors">
                           <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black flex-shrink-0">
                             {chat.student[0]}
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-sm truncate">{chat.student} <span className="text-gray-400 font-medium text-xs">vs</span> {chat.vendor}</span>
                                <span className="text-xs text-gray-400 font-medium">{chat.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {chat.alert && <ShieldAlert className="w-3 h-3 text-red-500 flex-shrink-0" />}
                                <p className={`text-xs truncate ${chat.alert ? 'text-red-600 font-bold' : 'text-gray-500'}`}>{chat.lastMessage}</p>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Chat Log Viewer */}
                <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
                   {/* Overlay Watermark */}
                   <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
                      <Eye className="w-64 h-64" />
                   </div>

                   <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 z-10">
                      <div>
                        <h3 className="font-black text-lg">Peter <span className="text-gray-400 text-sm font-medium">interacting with</span> SneakerHeadz</h3>
                        <p className="text-xs text-red-600 font-bold flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Flagged: Payment mentioned outside platform</p>
                      </div>
                      <button className="bg-red-50 text-red-600 font-bold px-4 py-2 rounded-lg text-sm hover:bg-red-100 transition-colors">
                        Suspend Vendor
                      </button>
                   </div>

                   <div className="flex-1 overflow-y-auto p-6 space-y-4 z-10 bg-[url('https://i.pinimg.com/originals/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover bg-center bg-fixed" style={{boxShadow: 'inset 0 0 0 2000px rgba(255,255,255,0.9)'}}>
                      {/* Mock Messages */}
                      <div className="flex flex-col gap-1 max-w-[80%]">
                         <span className="text-xs font-bold text-gray-500 ml-2">Peter (Student)</span>
                         <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 text-sm font-medium w-fit">
                           Kaka naomba Jordan 1 za blue size 42.
                         </div>
                      </div>

                      <div className="flex flex-col gap-1 max-w-[80%] self-end items-end ml-auto">
                         <span className="text-xs font-bold text-emerald-600 mr-2">SneakerHeadz (Vendor)</span>
                         <div className="bg-emerald-500 text-white p-3 rounded-2xl rounded-tr-sm shadow-sm text-sm font-medium w-fit">
                           Zipo kaka, lakini malipo fanya kwa namba yangu ya TigoPesa ili nikuletee chap.
                         </div>
                      </div>

                      <div className="flex flex-col gap-1 max-w-[80%]">
                         <span className="text-xs font-bold text-gray-500 ml-2">Peter (Student)</span>
                         <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 text-sm font-medium w-fit">
                           Nitakutumia kwa namba hii ya TigoPesa?
                         </div>
                      </div>

                      <div className="flex justify-center my-6">
                         <span className="bg-red-100 text-red-700 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                           <ShieldAlert className="w-3 h-3" /> System Auto-Flagged
                         </span>
                      </div>
                   </div>

                   <div className="p-4 bg-gray-50 border-t border-gray-100 z-10">
                      <div className="relative">
                        <MessageSquare className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Send an admin warning message to this chat..." className="w-full pl-10 pr-24 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none font-medium text-sm" />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white font-bold text-xs px-4 py-1.5 rounded-lg">
                          Warn
                        </button>
                      </div>
                   </div>
                </div>
             </div>
           </div>
        )}""")

with open('unimonday-web/src/app/admin/dashboard/page.tsx', 'w') as f:
    f.write(new_content)
print("Updated godseye")
