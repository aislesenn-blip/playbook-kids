import re

with open('unimonday-web/src/components/layout/TopNav.tsx', 'r') as f:
    content = f.read()

# Add Lucide icons for the new links
content = content.replace(
    'import { ShoppingBag, User, Menu, X, Shirt, Smartphone, ShieldCheck, Box } from "lucide-react";',
    'import { ShoppingBag, User, Menu, X, Shirt, Smartphone, ShieldCheck, Box, Handshake, ShieldAlert } from "lucide-react";'
)

# Add "Partner With Us" and "Staff" links to the mobile menu right above the Sign In button
new_links = """              <hr className="border-border my-2" />
              <Link
                href="/vendor/apply"
                onClick={toggleMenu}
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname.includes('/vendor') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Handshake className="w-5 h-5" /> Partner With Us
              </Link>
              <Link
                href="/admin/dashboard"
                onClick={toggleMenu}
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname.includes('/admin') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <ShieldAlert className="w-5 h-5" /> Staff (Godmode)
              </Link>
              <hr className="border-border my-2" />"""

content = content.replace('<hr className="border-border my-2" />', new_links, 1)

with open('unimonday-web/src/components/layout/TopNav.tsx', 'w') as f:
    f.write(content)
