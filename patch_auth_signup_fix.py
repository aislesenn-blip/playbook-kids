import re

with open("unimonday-web/src/app/auth/signup/page.tsx", "r") as f:
    content = f.read()

content = re.sub(r'\s*if \(role === \'vendor\' && !formData\.storeName\.trim\(\)\) \{\s*toast\.error\("Please enter your store name"\);\s*return;\s*\}', '', content)
# Also need to make sure formData doesn't have storeName if not needed, but keeping it won't break anything.

with open("unimonday-web/src/app/auth/signup/page.tsx", "w") as f:
    f.write(content)
