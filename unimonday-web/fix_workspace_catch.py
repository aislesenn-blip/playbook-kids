import re

with open("src/app/workspace/page.tsx", "r") as f:
    content = f.read()

# Fix the error handling to gracefully set error instead of throwing
content = content.replace("    if (err instanceof Error) throw new Error(`Failed to parse JSON.`); else setError('Unknown error');", "    if (err instanceof Error) setError(err.message); else setError('Unknown error');")
content = content.replace("    if (err instanceof Error) setError(err.message); else setError('Unknown error');\n      if (err instanceof Error) setError(err.message); else setError('Unknown error');", "    if (err instanceof Error) setError(err.message); else setError('Unknown error');")

with open("src/app/workspace/page.tsx", "w") as f:
    f.write(content)
