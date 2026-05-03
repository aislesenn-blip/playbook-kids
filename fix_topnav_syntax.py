with open("unimonday-web/src/components/layout/TopNav.tsx", "r") as f:
    content = f.read()

content = content.replace("""                {isVendor ? (
          <div className="hidden sm:flex items-center gap-6 font-medium">""", """          <div className="hidden sm:flex items-center gap-6 font-medium">""")

with open("unimonday-web/src/components/layout/TopNav.tsx", "w") as f:
    f.write(content)
