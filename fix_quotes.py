with open('unimonday-web/src/app/admin/dashboard/page.tsx', 'r') as f:
    content = f.read()

new_content = content.replace("God's Eye", "Gods Eye")

with open('unimonday-web/src/app/admin/dashboard/page.tsx', 'w') as f:
    f.write(new_content)
