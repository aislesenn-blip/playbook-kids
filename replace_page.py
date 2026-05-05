import re

with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# Let's inspect the imports
print(content[:500])
