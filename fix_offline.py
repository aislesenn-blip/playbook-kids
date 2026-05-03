import re
with open("unimonday-web/src/components/ui/OfflineBanner.tsx", "r") as f:
    content = f.read()

content = re.sub(r"/\*[\s\S]*?\*/", "", content)

with open("unimonday-web/src/components/ui/OfflineBanner.tsx", "w") as f:
    f.write(content)
