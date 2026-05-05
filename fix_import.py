with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

content = content.replace("Home, FileText", "HomeIcon, FileText")
content = content.replace("<Home className=", "<HomeIcon className=")

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
