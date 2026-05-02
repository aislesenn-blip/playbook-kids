import re

with open('unimonday-web/src/app/explore/page.tsx', 'r') as f:
    content = f.read()

# Make the stores section horizontally scrollable
content = content.replace(
    '<div className="grid grid-cols-1 md:grid-cols-3 gap-6">',
    '<div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>'
)

# Add min-w classes to the store cards to ensure they don't squish
content = content.replace(
    '<motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl p-6 border border-border shadow-sm flex items-center gap-5 cursor-pointer">',
    '<motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl p-6 border border-border shadow-sm flex items-center gap-5 cursor-pointer min-w-[300px] shrink-0" style={{ scrollSnapAlign: "start" }}>'
)

with open('unimonday-web/src/app/explore/page.tsx', 'w') as f:
    f.write(content)
