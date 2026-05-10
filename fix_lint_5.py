import re

with open('unimonday-web/src/app/products/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("Shopping Cart, Tractor, Wheat, ArrowRight", "ShoppingCart, Tractor")
content = content.replace("ShoppingCart, Tractor, Wheat, ArrowRight", "ShoppingCart, Tractor")
content = content.replace('import Link from "next/link";\n', '')

with open('unimonday-web/src/app/products/page.tsx', 'w') as f:
    f.write(content)
