import re

with open("unimonday-web/src/app/globals.css", "r") as f:
    content = f.read()

content = content.replace("0 0% 100%", "48 33% 97%") # Replace Pure White with Cream (#FDFCF8 is hsl(48, 33%, 97%))
content = content.replace("160 84% 39%", "0 0% 9%") # Replace Emerald with Black

with open("unimonday-web/src/app/globals.css", "w") as f:
    f.write(content)

print("Updated globals.css")
