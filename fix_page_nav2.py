import re

def fix_page_nav():
    file_path = 'unimonday-web/src/app/page.tsx'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        nav_pattern = r'<nav className="w-full flex items-center justify-between p-6 z-20">.*?</nav>'
        match = re.search(nav_pattern, content, flags=re.DOTALL)

        if match:
            old_nav = match.group(0)
            new_nav = """<nav className="w-full flex items-center justify-between p-6 z-20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-black" />
            <span className="text-xl font-bold tracking-tight text-black">uNiMONDAY</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setCurrentNavView('showcase')} className="text-sm font-medium text-black hover:text-black/70 transition-colors">Showcase</button>
            <button onClick={() => setCurrentNavView('docs')} className="text-sm font-medium text-black hover:text-black/70 transition-colors">Docs</button>
            <button onClick={() => setShowAuthModal(true)} className="text-sm font-medium bg-black text-white px-5 py-2.5 rounded-full hover:bg-black/80 transition-colors shadow-lg">
              Sign In
            </button>
          </div>
        </nav>"""
            content = content.replace(old_nav, new_nav)
            print("Fixed nav inside page.tsx")
        else:
            print("Could not find nav inside page.tsx")

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

    except Exception as e:
        print(f"Error: {e}")

fix_page_nav()
