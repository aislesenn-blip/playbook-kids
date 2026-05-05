import re

def fix_page_nav():
    file_path = 'unimonday-web/src/app/page.tsx'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # The user's feedback says we need to wire up Showcase, Docs, Sign In and there are unused variables
        # We also need to add the Auth Modal view

        # 1. Remove the unused vars from the top (showAuthModal, setShowAuthModal, currentNavView, setCurrentNavView)
        # because the TopNav handles its own thing, OR we pass it down.
        # Oh, TopNav is not in page.tsx, it's globally in layout.tsx!
        # But wait, TopNav isn't rendering in page.tsx. The page.tsx has its own Top Nav built-in!
        # Let's inspect page.tsx top bar.

        # Ah, in page.tsx, the previous agent added:
        # const [showAuthModal, setShowAuthModal] = useState(false);
        # const [currentNavView, setCurrentNavView] = useState('home');

        # Let's find the top nav inside page.tsx
        nav_pattern = r'<nav className="w-full flex items-center justify-between py-6 px-6 sm:px-12 relative z-10">.*?</nav>'
        match = re.search(nav_pattern, content, flags=re.DOTALL)

        if match:
            old_nav = match.group(0)
            # We replace it with interactive buttons
            new_nav = """<nav className="w-full flex items-center justify-between py-6 px-6 sm:px-12 relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-black" />
            <span className="text-xl font-bold tracking-tight text-black">uNiMONDAY</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setCurrentNavView('showcase')} className="text-sm font-medium text-black hover:text-black/70 transition-colors">Showcase</button>
            <button onClick={() => setCurrentNavView('docs')} className="text-sm font-medium text-black hover:text-black/70 transition-colors">Docs</button>
            <button onClick={() => setShowAuthModal(true)} className="text-sm font-medium bg-black text-white px-5 py-2.5 rounded-full hover:bg-black/80 transition-colors">
              Sign In
            </button>
          </div>
        </nav>"""
            content = content.replace(old_nav, new_nav)
            print("Fixed nav inside page.tsx")
        else:
            print("Could not find nav inside page.tsx")

        # 2. Let's add the modals for Showcase, Docs, AuthModal
        # Right after the AnimatePresence starts, if currentNavView is not 'home', we render them.

        modals = """
        {/* State: Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
              <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 p-2 text-black/50 hover:text-black bg-neutral-100 rounded-full">
                 <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold text-black mb-2">Welcome Back</h3>
              <p className="text-black/60 mb-6">Sign in to your uNiMONDAY account to continue.</p>
              <div className="space-y-4">
                <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-black outline-none focus:border-black transition-colors" />
                <button className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-neutral-800 transition-colors">Continue with Email</button>
              </div>
            </motion.div>
          </div>
        )}

        {/* State: Showcase/Docs Views (Mock) */}
        {currentNavView !== 'home' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="absolute inset-0 z-40 bg-[#DDA359] flex flex-col items-center justify-center p-8">
             <button onClick={() => setCurrentNavView('home')} className="absolute top-8 left-8 flex items-center gap-2 text-black font-bold hover:underline">
               <ArrowRight className="w-5 h-5 rotate-180" /> Back to Builder
             </button>
             <h2 className="text-5xl font-bold text-black mb-4 capitalize">{currentNavView}</h2>
             <p className="text-xl text-black/80 max-w-2xl text-center">
               This is a mock view for the {currentNavView} section. In production, this would route to a dedicated page.
             </p>
          </motion.div>
        )}
        """

        # Inject modals right after `<AnimatePresence mode="wait">`
        content = content.replace('<AnimatePresence mode="wait">', '<AnimatePresence mode="wait">\n' + modals)

        # We need to make sure we import ArrowRight
        if 'ArrowRight' not in content:
            content = content.replace('import { Sparkles, Terminal, CheckCircle, Globe, RefreshCcw, Send, Settings, Database, Server, Box, Rocket, Globe2, LayoutTemplate, Smartphone, ShoppingCart, MessageSquare, Briefcase, Camera, Coffee, Music, Video, User } from "lucide-react";',
                                      'import { Sparkles, Terminal, CheckCircle, Globe, RefreshCcw, Send, Settings, Database, Server, Box, Rocket, Globe2, LayoutTemplate, Smartphone, ShoppingCart, MessageSquare, Briefcase, Camera, Coffee, Music, Video, User, X, ArrowRight } from "lucide-react";')

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

    except Exception as e:
        print(f"Error: {e}")

fix_page_nav()
