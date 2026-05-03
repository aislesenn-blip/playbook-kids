import re

with open("unimonday-web/src/app/explore/page.tsx", "r") as f:
    content = f.read()

# Make sure truck is imported in explore
if 'import { Truck } from "lucide-react"' not in content and 'Truck,' not in content:
    content = content.replace('ShoppingBag,', 'ShoppingBag, Truck,')

with open("unimonday-web/src/app/explore/page.tsx", "w") as f:
    f.write(content)
