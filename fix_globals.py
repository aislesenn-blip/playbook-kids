import re

with open("unimonday-web/src/app/globals.css", "r") as f:
    content = f.read()

# Make sure tailwind base works
if "@import \"tailwindcss\";" not in content:
    content = "@import \"tailwindcss\";\n" + content

with open("unimonday-web/src/app/globals.css", "w") as f:
    f.write(content)
