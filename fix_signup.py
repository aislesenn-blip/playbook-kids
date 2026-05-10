import re

with open('unimonday-web/src/app/auth/signup/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("role: 'student'", "role: 'farmer'")
content = content.replace("placeholder=\"student@example.com\"", "placeholder=\"farmer@example.com\"")
content = content.replace('campusName: "UDSM"', 'farmLocation: "Dodoma"')

with open('unimonday-web/src/app/auth/signup/page.tsx', 'w') as f:
    f.write(content)
