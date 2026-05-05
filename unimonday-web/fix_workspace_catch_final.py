import re

with open("src/app/workspace/page.tsx", "r") as f:
    content = f.read()

# Make sure only one statement sets the error
content = content.replace("    if (err instanceof Error) setError(err.message); else setError('Unknown error');\n      if (err instanceof Error) setError(err.message); else setError('Unknown error');", "    if (err instanceof Error) setError(err.message); else setError('Unknown error');")

with open("src/app/workspace/page.tsx", "w") as f:
    f.write(content)
