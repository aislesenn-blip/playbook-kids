with open('unimonday-web/src/app/product/[id]/page.tsx', 'r') as f:
    prod = f.read()

prod = prod.replace('export const handleAddToCart', 'const handleAddToCart')

import re
# We need to make sure handleAddToCart is actually used. In step 4, we replaced the onClick but it seems it didn't catch properly or was unused. Let's fix the button directly.
prod = re.sub(r'<button className="w-full bg-gray-100.*?</button>', '<button onClick={handleAddToCart} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 rounded-2xl transition-colors">Add to Cart</button>', prod, flags=re.DOTALL)

with open('unimonday-web/src/app/product/[id]/page.tsx', 'w') as f:
    f.write(prod)
