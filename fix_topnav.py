import re

with open('unimonday-web/src/components/layout/TopNav.tsx', 'r') as f:
    content = f.read()

content = content.replace("students Deals & Discounts ....", "The Ultimate Agriculture Marketplace")
content = content.replace("isStationary", "isVendor")
content = content.replace("stationary", "vendor")
content = content.replace("Fashion & Apparels", "Tractors & Machinery")
content = content.replace("Tech & Accessories", "Fertilizers & Seeds")
content = content.replace("Beauty & Cosmetics", "Farm Produce")
content = content.replace("Home & Decor", "Livestock")
content = content.replace("Verified Services", "Expert Services")

with open('unimonday-web/src/components/layout/TopNav.tsx', 'w') as f:
    f.write(content)
