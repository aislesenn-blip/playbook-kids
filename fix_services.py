import re

with open("unimonday-web/src/app/services/page.tsx", "r") as f:
    content = f.read()

# Replace description
content = content.replace("Trusted professionals for repairs, delivery, printing, and more—all vetted for safety.", "Premium, managed services provided directly by uNiMONDAY. We guarantee the quality and safety.")

# Replace providers to be uNiMONDAY
content = content.replace("provider: \"TechFix Pros\"", "provider: \"uNiMONDAY Team\"")
content = content.replace("provider: \"QuickBites Delivery\"", "provider: \"uNiMONDAY Express\"")
content = content.replace("provider: \"Geek Squad UDSM\"", "provider: \"uNiMONDAY Tech\"")
content = content.replace("provider: \"InkHouse TZ\"", "provider: \"uNiMONDAY Custom\"")

with open("unimonday-web/src/app/services/page.tsx", "w") as f:
    f.write(content)
