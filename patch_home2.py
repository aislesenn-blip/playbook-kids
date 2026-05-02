import re

with open('unimonday-web/src/app/page.tsx', 'r') as f:
    content = f.read()

# Wrap "Find a Technician" etc with Link
content = content.replace(
    '<button className="mt-auto flex items-center gap-2 text-blue-500 font-bold hover:underline">\n               Find a Technician <ArrowRight className="w-4 h-4" />\n            </button>',
    '<Link href="/services" className="mt-auto flex items-center gap-2 text-blue-500 font-bold hover:underline">\n               Find a Technician <ArrowRight className="w-4 h-4" />\n            </Link>'
)

content = content.replace(
    '<button className="mt-auto flex items-center gap-2 text-amber-500 font-bold hover:underline">\n               Book Delivery <ArrowRight className="w-4 h-4" />\n            </button>',
    '<Link href="/services" className="mt-auto flex items-center gap-2 text-amber-500 font-bold hover:underline">\n               Book Delivery <ArrowRight className="w-4 h-4" />\n            </Link>'
)

content = content.replace(
    '<button className="mt-auto flex items-center gap-2 text-primary font-bold hover:underline">\n               Find a Pro <ArrowRight className="w-4 h-4" />\n            </button>',
    '<Link href="/services" className="mt-auto flex items-center gap-2 text-primary font-bold hover:underline">\n               Find a Pro <ArrowRight className="w-4 h-4" />\n            </Link>'
)


with open('unimonday-web/src/app/page.tsx', 'w') as f:
    f.write(content)
