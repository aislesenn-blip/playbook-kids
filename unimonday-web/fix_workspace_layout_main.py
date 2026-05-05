import re

with open("src/app/layout.tsx", "r") as f:
    content = f.read()

# Fix the constrained layout container which is squishing the workspace
content = content.replace("<main className=\"max-w-5xl mx-auto px-0 sm:px-6 lg:px-8 sm:py-6 w-full\">", "<main className=\"w-full\">")

with open("src/app/layout.tsx", "w") as f:
    f.write(content)
