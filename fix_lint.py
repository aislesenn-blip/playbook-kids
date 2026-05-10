import re

with open('unimonday-web/src/app/products/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('<img src=', '<img src=')

# Actually, Next.js image warnings are just warnings, but let's try to remove it if possible by adding an eslint disable.
content = "/* eslint-disable @next/next/no-img-element */\n" + content

with open('unimonday-web/src/app/products/page.tsx', 'w') as f:
    f.write(content)
