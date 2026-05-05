import re

def fix_topnav():
    file_path = 'unimonday-web/src/components/layout/TopNav.tsx'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # The error is because `setCurrentNavView` is not defined in TopNav.tsx.
        # But wait! TopNav is totally separate from `page.tsx`'s Nav!
        # `page.tsx` doesn't even USE TopNav! The TopNav is for the authenticated workspace side of things,
        # and page.tsx is a totally isolated Landing Page that has its own internal nav.

        # Actually, let's restore the original TopNav links, because the user requested the "Showcase, Docs, Sign In"
        # wiring specifically on the Home page (which we just did in `page.tsx`!).

        old_bad_links = """
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

        original_links = """
        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6 font-medium">
          <Link href="/workspace" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/workspace' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <PlusCircle className="w-4 h-4" /> New Document
          </Link>
          <Link href="/templates" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/templates' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <LayoutTemplate className="w-4 h-4" /> Templates
          </Link>
          <Link href="/my-files" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/my-files' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <FolderOpen className="w-4 h-4" /> My Files
          </Link>
          <Link href="/print-station" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/print-station' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <Printer className="w-4 h-4" /> Print Station
          </Link>
        </div>
        """

        # Replace it back
        content = content.replace(old_bad_links.strip(), original_links.strip())

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

    except Exception as e:
        print(f"Error: {e}")

fix_topnav()
