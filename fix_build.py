import re

files = [
    "unimonday-web/src/app/page.tsx",
    "unimonday-web/src/app/explore/page.tsx",
    "unimonday-web/src/app/fashion/page.tsx",
    "unimonday-web/src/app/tech/page.tsx",
    "unimonday-web/src/app/beauty/page.tsx",
    "unimonday-web/src/app/home-decor/page.tsx"
]

for f_path in files:
    try:
        with open(f_path, "r") as f:
            content = f.read()

        content = content.replace("Truck, Truck", "Truck")
        content = content.replace("import { Truck } from \"lucide-react\";\nimport { ", "import { ")

        # In explore/page.tsx it had: ShoppingBag, Truck, Truck,
        content = re.sub(r'Truck,\s*Truck', 'Truck', content)

        with open(f_path, "w") as f:
            f.write(content)
    except:
        pass
