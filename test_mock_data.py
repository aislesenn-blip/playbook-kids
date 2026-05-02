import os
import re

with open("unimonday-web/src/lib/mockData.ts", "r") as f:
    content = f.read()

print("Categories in mockData.ts:")
matches = re.findall(r'category:\s*"([^"]+)"', content)
print(set(matches))
