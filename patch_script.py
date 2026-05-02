with open('/home/jules/verification/verify_vendor_admin.py', 'r') as f:
    content = f.read()

content = content.replace('page.locator("a[href=\\"/vendor/dashboard\\"]").first.click()', 'page.goto("http://localhost:3000/vendor/dashboard")')

with open('/home/jules/verification/verify_vendor_admin.py', 'w') as f:
    f.write(content)
