import re

with open('unimonday-web/src/app/admin/dashboard/page.tsx', 'r') as f:
    content = f.read()

# Make sure all table wrappers have min-w-max inside overflow-x-auto to ensure they don't crush on mobile
content = content.replace('<table className="w-full text-left">', '<table className="w-full text-left min-w-max">')

with open('unimonday-web/src/app/admin/dashboard/page.tsx', 'w') as f:
    f.write(content)
