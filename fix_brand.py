with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# Replace all instances of BuilderAI with uNiMONDAY
content = content.replace("BuilderAI", "uNiMONDAY")

# Add a compelling tagline under the main H1 "What do you want to build?"
header_search = '<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center mb-8 text-black">\n              What do you want to build?\n            </h1>'
header_replace = '<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center mb-4 text-black">\n              What do you want to build?\n            </h1>\n            <p className="text-lg md:text-xl text-black/80 font-medium text-center max-w-2xl mb-10 leading-relaxed">\n              Stop coding. Start shipping. Describe your idea and watch uNiMONDAY generate a production-ready application in seconds.\n            </p>'

content = content.replace(header_search, header_replace)

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
