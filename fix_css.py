import re

with open("unimonday-web/src/app/globals.css", "r") as f:
    content = f.read()

# HSL for #dda359 is approximately hsl(34, 65%, 61%)
content = content.replace("--background: 48 33% 97%;", "--background: 34 65% 61%;")

with open("unimonday-web/src/app/globals.css", "w") as f:
    f.write(content)
