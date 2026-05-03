import re

with open("unimonday-web/src/app/globals.css", "r") as f:
    content = f.read()

# Add explicit source directory scanning for tailwind v4 if needed, although it should pick up by default.
content = """@import "tailwindcss";
@source "../../src";
""" + content.replace('@import "tailwindcss";', '')

with open("unimonday-web/src/app/globals.css", "w") as f:
    f.write(content)
