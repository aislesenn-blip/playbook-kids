import re

with open('unimonday-web/src/app/explore/page.tsx', 'r') as f:
    content = f.read()

# Make sure we have Link
if 'import Link from "next/link";' not in content:
    content = content.replace('import { useState } from "react";', 'import { useState } from "react";\nimport Link from "next/link";')

# Wrap product cards in Explore page
content = content.replace(
    '<motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">',
    '<Link href="/product/1" className="block">\n            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">'
)

content = content.replace(
    '</button>\n                </div>\n              </div>\n            </motion.div>',
    '</button>\n                </div>\n              </div>\n            </motion.div>\n            </Link>'
)


with open('unimonday-web/src/app/explore/page.tsx', 'w') as f:
    f.write(content)
