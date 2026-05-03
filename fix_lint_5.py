with open("unimonday-web/src/app/auth/signup/page.tsx", "r") as f:
    c = f.read()

c = c.replace('className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"\n                  />\n                </div>\n              </div>', '')

with open("unimonday-web/src/app/auth/signup/page.tsx", "w") as f:
    f.write(c)
