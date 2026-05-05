import re

def fix_top_nav():
    file_path = 'unimonday-web/src/components/layout/TopNav.tsx'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Let's replace the desktop links section manually to fix the unused variables
        # The user requested that we wire up the buttons: Showcase, Docs, Sign In

        # 1. First, we need to locate the Desktop Links section
        # Wait, the current links are "New Document, Templates, My Files, Print Station"
        # But the plan/requirements were "Showcase, Docs, Sign In".
        # It seems the previous script was replacing the wrong thing or the file had diverged.

        new_desktop_links = """
        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6 font-medium">
          <button onClick={() => setCurrentNavView('showcase')} className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${currentNavView === 'showcase' ? 'text-primary font-bold' : 'text-gray-900'}`}>
            <LayoutTemplate className="w-4 h-4" /> Showcase
          </button>
          <button onClick={() => setCurrentNavView('docs')} className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${currentNavView === 'docs' ? 'text-primary font-bold' : 'text-gray-900'}`}>
            <FileText className="w-4 h-4" /> Docs
          </button>
        </div>
        """

        # Replace existing desktop links
        content = re.sub(
            r'\{\/\* Desktop Links \*\/\}.*?\{\/\* Right Actions \*\/\}',
            new_desktop_links.strip() + '\n\n        {/* Right Actions */}',
            content,
            flags=re.DOTALL
        )

        # 2. Add the Auth Modal rendering
        # Also need to replace the unused 'showAuthModal' dead code from page.tsx (it shouldn't be there, it should be in TopNav or Page)
        # Actually, let's fix page.tsx first.

        print("TopNav modified in memory.")

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

    except Exception as e:
        print(f"Error: {e}")

fix_top_nav()
