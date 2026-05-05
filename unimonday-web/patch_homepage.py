import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Replace vendor section with Magic AI section
vendor_section_regex = r'<div className="bg-white p-4 md:p-5 rounded flex flex-col h-\[350px\] md:h-\[420px\] lg:col-span-3">.*?</Link>\s*</div>\s*</div>\s*</div>\s*</div>'
magic_ai_section = '''<div className="bg-white p-4 md:p-5 rounded flex flex-col h-[350px] md:h-[420px] lg:col-span-3">
               <div className="flex items-center gap-2 mb-3">
                 <h2 className="text-xl md:text-2xl font-bold text-gray-900">The Magic Dropzone</h2>
               </div>
               <div className="flex-grow w-full rounded overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80" alt="Magic" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-transparent flex items-center p-6 md:p-8">
                     <div className="max-w-md text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">Zero Prompting Required.</h3>
                        <p className="text-sm md:text-base mb-6 text-emerald-100">Upload a beautifully formatted document as a reference, paste your messy text, and watch the AI seamlessly clone the layout in seconds.</p>
                        <Link href="/workspace" className="bg-[#FFD814] hover:bg-[#F7CA00] text-black py-2 px-6 rounded-full font-medium shadow-sm transition-colors text-sm md:text-base">
                          Try The Magic
                        </Link>
                     </div>
                  </div>
               </div>
            </div>

          </div>'''

content = re.sub(vendor_section_regex, magic_ai_section, content, flags=re.DOTALL)

with open("src/app/page.tsx", "w") as f:
    f.write(content)
