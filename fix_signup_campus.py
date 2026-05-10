import re

with open('unimonday-web/src/app/auth/signup/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('campusName: formData.campusName', 'farmLocation: formData.campusName')

with open('unimonday-web/src/app/auth/signup/page.tsx', 'w') as f:
    f.write(content)
