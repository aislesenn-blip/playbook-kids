import re

with open('unimonday-web/src/app/admin/dashboard/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("assigned to 'Featured'", "assigned to &apos;Featured&apos;")

with open('unimonday-web/src/app/admin/dashboard/page.tsx', 'w') as f:
    f.write(content)
