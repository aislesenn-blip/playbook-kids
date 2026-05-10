import re

with open('unimonday-web/src/app/auth/login/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('role: "student"', 'role: "farmer"')
content = content.replace('name: "Student User"', 'name: "Farmer User"')
content = content.replace('campusName: "UDSM - Main Campus"', 'farmLocation: "Dodoma - Kibaigwa"')
content = content.replace('region: "Dar es Salaam"', 'region: "Dodoma"')
content = content.replace('placeholder="student@example.com"', 'placeholder="farmer@example.com"')

with open('unimonday-web/src/app/auth/login/page.tsx', 'w') as f:
    f.write(content)
