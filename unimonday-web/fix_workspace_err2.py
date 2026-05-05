import re

with open("src/app/workspace/page.tsx", "r") as f:
    content = f.read()

# Fix the unknown error typing correctly
content = content.replace("setError(err.message);", "if (err instanceof Error) setError(err.message); else setError('Unknown error');")

with open("src/app/workspace/page.tsx", "w") as f:
    f.write(content)
