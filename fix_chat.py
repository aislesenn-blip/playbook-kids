import re

with open('unimonday-web/src/app/chat/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("stationaryPartners", "vendors")
content = content.replace("@/lib/mockData", "@/lib/mockData")

with open('unimonday-web/src/app/chat/page.tsx', 'w') as f:
    f.write(content)
