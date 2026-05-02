import re

# 1. Update colors in globals.css
with open('unimonday-web/src/app/globals.css', 'r') as f:
    css = f.read()

# Replace the primary green with a softer green (emerald-500 equivalent approx)
css = re.sub(r'--primary:\s*151\s+100%\s+45%;', '--primary: 160 84% 39%; /* Softer Emerald Green */', css)
css = re.sub(r'--color-unidays-green:\s*#00E676;', '--color-unidays-green: #10B981;', css)

with open('unimonday-web/src/app/globals.css', 'w') as f:
    f.write(css)

# 2. Update top nav height in TopNav.tsx
with open('unimonday-web/src/components/layout/TopNav.tsx', 'r') as f:
    topnav = f.read()

topnav = topnav.replace('h-16', 'h-14')
topnav = topnav.replace('top-16', 'top-14')

with open('unimonday-web/src/components/layout/TopNav.tsx', 'w') as f:
    f.write(topnav)

# 3. Update padding top in layout.tsx
with open('unimonday-web/src/app/layout.tsx', 'r') as f:
    layout = f.read()

layout = layout.replace('pt-16', 'pt-14')

with open('unimonday-web/src/app/layout.tsx', 'w') as f:
    f.write(layout)

print("UI Patched successfully")
