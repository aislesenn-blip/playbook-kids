import re

with open('unimonday-web/src/app/orders/page.tsx', 'r') as f:
    content = f.read()

# Add Link import if needed
if 'import Link' not in content:
    content = content.replace('import { motion }', 'import Link from "next/link";\nimport { motion }')

# Replace "View Details" button with Link
content = content.replace(
    '<button className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">\n                    View Details\n                  </button>',
    '<Link href="/orders/details" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">\n                    View Details\n                  </Link>'
)

with open('unimonday-web/src/app/orders/page.tsx', 'w') as f:
    f.write(content)
