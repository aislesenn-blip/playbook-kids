with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# Fix the duplicate useState declarations caused by the previous python script replace running multiple times
duplicate_str = """  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentNavView, setCurrentNavView] = useState("builder");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentNavView, setCurrentNavView] = useState("builder"); // builder, showcase, docs"""

fixed_str = """  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentNavView, setCurrentNavView] = useState("builder");"""

content = content.replace(duplicate_str, fixed_str)

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
