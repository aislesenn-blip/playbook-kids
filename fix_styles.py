import re

with open("unimonday-web/src/app/layout.tsx", "r") as f:
    content = f.read()

# Make sure tailwind css is actually importing in layout if it somehow got corrupted
if "import './globals.css'" not in content:
    content = content.replace("import type { Metadata } from 'next';", "import type { Metadata } from 'next';\nimport './globals.css';")

with open("unimonday-web/src/app/layout.tsx", "w") as f:
    f.write(content)
