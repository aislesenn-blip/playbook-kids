import re

with open("src/app/workspace/page.tsx", "r") as f:
    content = f.read()

# Fix the unknown error typing correctly
content = content.replace("    throw new Error(`Failed to parse JSON: ${err.message}`);", "    throw new Error(`Failed to parse JSON.`);")

with open("src/app/workspace/page.tsx", "w") as f:
    f.write(content)
