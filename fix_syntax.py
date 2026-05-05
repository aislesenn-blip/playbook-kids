with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

content = content.replace("> {loadingText}", "&gt; {loadingText}")

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
