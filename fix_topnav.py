with open("unimonday-web/src/components/layout/TopNav.tsx", "r") as f:
    content = f.read()

# Replace vendor logic
content = content.replace("const isVendor = currentUser?.role === \"vendor\";", "const isVendor = currentUser?.role === \"vendor\"; // Deprecated, remove later")
content = content.replace("          <div className=\"hidden sm:flex items-center gap-6 font-medium\">\n            <Link href=\"/vendor/dashboard\" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/vendor/dashboard' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>\n              <Store className=\"w-4 h-4\" /> Dashboard\n            </Link>\n            <Link href=\"/chat\" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/chat' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>\n              <MessageCircle className=\"w-4 h-4\" /> Inbox\n            </Link>\n          </div>\n        ) : (\n          <div className=\"hidden sm:flex items-center gap-6 font-medium\">",
"          <div className=\"hidden sm:flex items-center gap-6 font-medium\">")

# Remove the ending `)}`
content = content.replace("""            </Link>\n          </div>\n        )}""", """            </Link>\n          </div>""")

with open("unimonday-web/src/components/layout/TopNav.tsx", "w") as f:
    f.write(content)
