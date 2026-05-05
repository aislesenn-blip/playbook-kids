import re

with open("unimonday-web/src/app/workspace/page.tsx", "r") as f:
    content = f.read()

# Make the right panel A4 canvas responsive so it scales nicely on mobile
content = content.replace("className=\"bg-white w-full max-w-[800px] min-h-[1123px] p-12 sm:p-16 lg:p-24 shadow-2xl rounded-sm mb-12 relative group ring-1 ring-black/5\"", "className=\"bg-white w-full max-w-[800px] min-h-screen md:min-h-[1123px] p-6 sm:p-12 md:p-16 lg:p-24 shadow-2xl rounded-sm mb-12 relative group ring-1 ring-black/5\"")

# Keep the left panel fixed height on mobile or toggleable
content = content.replace("className=\"w-full md:w-1/2 h-1/2 md:h-full flex flex-col border-b md:border-b-0 md:border-r border-gray-300 bg-[#1E1E1E]\"", "className=\"w-full md:w-1/2 h-[40vh] md:h-full flex flex-col border-b md:border-b-0 md:border-r border-gray-300 bg-[#1E1E1E] shrink-0\"")
content = content.replace("className=\"w-full md:w-1/2 h-1/2 md:h-full flex flex-col bg-gray-100 overflow-y-auto items-center p-4 md:p-8 custom-scrollbar\"", "className=\"w-full md:w-1/2 flex-grow flex flex-col bg-gray-100 overflow-y-auto items-center p-4 md:p-8 custom-scrollbar\"")


with open("unimonday-web/src/app/workspace/page.tsx", "w") as f:
    f.write(content)
