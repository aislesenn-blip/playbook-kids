import re

with open("unimonday-web/src/lib/mockData.ts", "r") as f:
    content = f.read()

# While we have 1st-party frontend UX, the backend data models technically
# still route everything into `stores` or `promo_fronts`.
# We'll just change the mock data 'campusName' to 'Region' conceptually,
# and remove 'UDSM - Main Campus' as it's no longer the focus.
content = content.replace("UDSM - Main Campus", "HQ")

with open("unimonday-web/src/lib/mockData.ts", "w") as f:
    f.write(content)
