import re

with open('unimonday-web/src/app/product/[id]/page.tsx', 'r') as f:
    content = f.read()

if 'import Link' not in content:
    content = content.replace('import { useRouter } from "next/navigation";', 'import { useRouter } from "next/navigation";\nimport Link from "next/link";')

# Replace "Order Now" button with Link to checkout
content = content.replace(
    '<button className="flex-1 bg-gray-900 text-white hover:bg-gray-800 font-bold py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-colors shadow-xl shadow-gray-900/20 text-lg">\n              <ShoppingBag className="w-6 h-6" /> Order Now\n            </button>',
    '<Link href="/checkout" className="flex-1 bg-gray-900 text-white hover:bg-gray-800 font-bold py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-colors shadow-xl shadow-gray-900/20 text-lg">\n              <ShoppingBag className="w-6 h-6" /> Order Now\n            </Link>'
)

with open('unimonday-web/src/app/product/[id]/page.tsx', 'w') as f:
    f.write(content)
