import re

with open("unimonday-web/src/app/admin/dashboard/page.tsx", "r") as f:
    content = f.read()

# Make sure the UI doesn't use the word "Vendor" unnecessarily in staff tools now that it's 1st party.
content = content.replace("Reputation Engine (Vendor Spoofing)", "Reputation Engine")
content = content.replace("Boost Vendor", "Boost Storefront/Promo")

with open("unimonday-web/src/app/admin/dashboard/page.tsx", "w") as f:
    f.write(content)
