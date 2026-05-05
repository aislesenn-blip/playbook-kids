import re

with open("src/app/workspace/page.tsx", "r") as f:
    content = f.read()

# Make the workspace responsive
content = content.replace("className=\"flex h-screen bg-gray-100 pt-14 pb-20 overflow-hidden\"", "className=\"flex flex-col md:flex-row h-screen bg-gray-100 pt-14 pb-20 overflow-hidden\"")

# Hide the left panel on mobile, make it a floating drawer or just handle it nicely
content = content.replace("className=\"w-1/2 flex flex-col border-r border-gray-300 bg-[#1E1E1E]\"", "className=\"w-full md:w-1/2 h-1/2 md:h-full flex flex-col border-b md:border-b-0 md:border-r border-gray-300 bg-[#1E1E1E]\"")

# Hide the divider on mobile
content = content.replace("className=\"w-8 flex flex-col items-center justify-center bg-gray-200 z-10 shadow-inner\"", "className=\"hidden md:flex w-8 flex-col items-center justify-center bg-gray-200 z-10 shadow-inner\"")

# Make the right panel responsive
content = content.replace("className=\"w-1/2 flex flex-col bg-gray-100 overflow-y-auto items-center p-8 custom-scrollbar\"", "className=\"w-full md:w-1/2 h-1/2 md:h-full flex flex-col bg-gray-100 overflow-y-auto items-center p-4 md:p-8 custom-scrollbar\"")

with open("src/app/workspace/page.tsx", "w") as f:
    f.write(content)
