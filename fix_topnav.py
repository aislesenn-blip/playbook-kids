with open("unimonday-web/src/components/layout/TopNav.tsx", "r") as f:
    content = f.read()

content = content.replace("const { currentUser, getCartCount } = useAppStore();", "const { currentUser } = useAppStore();\n  const getCartCount = () => 0;")

with open("unimonday-web/src/components/layout/TopNav.tsx", "w") as f:
    f.write(content)
