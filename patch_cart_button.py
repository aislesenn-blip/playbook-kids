with open('unimonday-web/src/app/product/[id]/page.tsx', 'r') as f:
    prod = f.read()

import re
# Ah! It's a <Link href="/checkout"> not a button.
prod = re.sub(
    r'<Link href="/checkout" className="flex-1 bg-gray-900 text-white hover:bg-gray-800 font-bold py-5 rounded-\[1.5rem\] flex items-center justify-center gap-3 transition-colors shadow-xl shadow-gray-900/20 text-lg">',
    '<button onClick={() => { handleAddToCart(); router.push("/checkout"); }} className="flex-1 bg-gray-900 text-white hover:bg-gray-800 font-bold py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-colors shadow-xl shadow-gray-900/20 text-lg">',
    prod
)

prod = prod.replace('</Link>\n            <button', '</button>\n            <button')

with open('unimonday-web/src/app/product/[id]/page.tsx', 'w') as f:
    f.write(prod)
