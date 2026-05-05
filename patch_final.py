with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# Update name to uNiMONDAY
content = content.replace(">BuilderAI<", ">uNiMONDAY<")

# Add tagline under the main heading
heading = """<h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-center mb-10 text-black">
              What do you want to build?
            </h1>"""

new_heading = """<h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-center mb-4 text-black">
              What do you want to build?
            </h1>
            <p className="text-xl md:text-2xl font-bold text-black/70 text-center mb-10 max-w-2xl">
              From Idea to Live Website in 60 Seconds. No coding required.
            </p>"""

content = content.replace(heading, new_heading)

# Hide scrollbar in main div wrappers
# We'll just add it to the global layout of page.tsx
content = content.replace('className="w-full min-h-screen bg-[#DDA359] flex flex-col items-center font-sans text-black selection:bg-neutral-800 selection:text-white relative overflow-hidden"', 'className="w-full min-h-screen bg-[#DDA359] flex flex-col items-center font-sans text-black selection:bg-neutral-800 selection:text-white relative overflow-hidden no-scrollbar"')

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)

# Add .no-scrollbar to globals.css
with open("unimonday-web/src/app/globals.css", "a") as f:
    f.write("\n\n/* Hide scrollbar for Chrome, Safari and Opera */\n.no-scrollbar::-webkit-scrollbar {\n  display: none;\n}\n\n/* Hide scrollbar for IE, Edge and Firefox */\n.no-scrollbar {\n  -ms-overflow-style: none;  /* IE and Edge */\n  scrollbar-width: none;  /* Firefox */\n}\n")
