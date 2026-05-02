import re

filepath = "unimonday-web/src/components/layout/TopNav.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Replace the max-h constraint with a fixed bottom constraint to avoid any viewport issues
content = content.replace(
    "className=\"fixed top-14 left-0 right-0 bg-white border-b border-border z-40 sm:hidden shadow-lg max-h-[calc(100vh-8.5rem)] overflow-y-auto\"",
    "className=\"fixed top-14 bottom-20 left-0 right-0 bg-white border-b border-border z-40 sm:hidden shadow-lg overflow-y-auto overscroll-contain\""
)

with open(filepath, "w") as f:
    f.write(content)
