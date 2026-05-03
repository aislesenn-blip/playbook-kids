with open("unimonday-web/src/components/layout/BottomNav.tsx", "r") as f:
    content = f.read()

# Replace vendor logic
content = content.replace("const isVendor = currentUser?.role === 'vendor';", "const isVendor = currentUser?.role === 'vendor'; // Deprecated")
content = content.replace("  const navItems = isVendor ? [\n    { href: \"/vendor/dashboard\", icon: LayoutDashboard, label: \"Dashboard\" },\n    { href: \"/chat\", icon: MessageCircle, label: \"Inbox\" },\n    { href: \"/profile\", icon: User, label: \"Profile\" },\n  ] : [\n    { href: \"/\", icon: Store, label: \"Home\" },\n    { href: \"/explore\", icon: Compass, label: \"Explore\" },\n    { href: \"/chat\", icon: MessageCircle, label: \"Chat\" },\n    { href: \"/orders\", icon: Box, label: \"Orders\" },\n  ];",
"""  const navItems = [
    { href: "/", icon: Store, label: "Home" },
    { href: "/explore", icon: Compass, label: "Explore" },
    { href: "/chat", icon: MessageCircle, label: "Chat" },
    { href: "/orders", icon: Box, label: "Orders" },
  ];""")


with open("unimonday-web/src/components/layout/BottomNav.tsx", "w") as f:
    f.write(content)
