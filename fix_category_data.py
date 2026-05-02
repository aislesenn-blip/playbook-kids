import os
import re

directories = ["fashion", "tech", "beauty", "home-decor"]
mapping = {
    "fashion": "Fashion & Apparels",
    "tech": "Tech & Accessories",
    "beauty": "Beauty & Cosmetics",
    "home-decor": "Home & Decor"
}

for dir_name in directories:
    file_path = f"unimonday-web/src/app/{dir_name}/page.tsx"
    if not os.path.exists(file_path):
        continue

    with open(file_path, "r") as f:
        content = f.read()

    # We want to replace the hardcoded `const products = [...]` with filtered mockProducts
    # First, let's inject the required imports if they aren't there
    if 'import { mockProducts }' not in content:
        content = content.replace('import { ShoppingBag } from "lucide-react";',
                                  'import { ShoppingBag } from "lucide-react";\nimport { mockProducts } from "@/lib/mockData";')

    # We will use regex to replace the hardcoded products array
    category_name = mapping[dir_name]
    replacement = f"""  const products = mockProducts.filter(p => p.category === '{category_name}');"""

    # We find the block starting with `const products = [` and ending with `];` right before `return (`
    content = re.sub(r'const products = \[\s*{.*?}  \];', replacement, content, flags=re.DOTALL)

    # Now we need to fix the JSX rendering.
    # The previous mock had .image, mockProducts uses .images[0]
    # The previous mock had .vendor as string, mockProducts has .vendorName and .vendorId
    content = content.replace('src={product.image}', 'src={product.images[0]}')

    # Handle vendor linking
    vendor_block = r'<p className="text-muted-foreground text-sm mb-4">By \{product\.vendor\}</p>'
    new_vendor_block = """<Link href={`/store/${product.vendorId}`} onClick={(e) => e.stopPropagation()} className="text-muted-foreground text-sm mb-4 hover:text-primary hover:underline transition-colors block z-10 relative">By {product.vendorName}</Link>"""
    content = re.sub(vendor_block, new_vendor_block, content)

    # Handle the price formatting. `product.price` in mockProducts is a number.
    content = content.replace('{product.price}', 'Tsh {product.price.toLocaleString()}')

    # Replace handleAddToCart to use actual product id
    content = content.replace(', "p1")', ', product.id)')

    with open(file_path, "w") as f:
        f.write(content)
