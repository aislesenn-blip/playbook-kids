import re

with open('unimonday-web/src/app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('href="/workspace"', 'href="/products"')
content = content.replace('Start Creating Now', 'Start Exploring Now')
content = content.replace('Start Creating', 'Start Exploring')
content = content.replace('href="/stationary/apply"', 'href="/vendor/apply"')

with open('unimonday-web/src/app/page.tsx', 'w') as f:
    f.write(content)
