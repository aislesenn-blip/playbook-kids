import re

with open('unimonday-web/src/app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("From chaotic ideas to perfectly printed documents in 3 taps.", "From finding equipment to harvesting produce in 3 taps.")
content = content.replace("Our backend instantly structures your document according to strict academic or professional standards. Tables, bolding, margins—all done automatically.", "Connect with sellers, negotiate or purchase directly with secure mobile money.")
content = content.replace("Stop wasting hours formatting documents.", "Stop wasting hours finding the right farming equipment.")

with open('unimonday-web/src/app/page.tsx', 'w') as f:
    f.write(content)
