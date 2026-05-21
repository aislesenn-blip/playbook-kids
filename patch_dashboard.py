import re

with open("unimonday-web/src/app/dashboard/page.tsx", "r") as f:
    content = f.read()

# 1. Lighten Hero Header
content = content.replace(
    'className="w-full bg-zinc-950 text-white pt-20 pb-32 px-4 rounded-b-[3rem] shadow-2xl relative overflow-hidden"',
    'className="w-full bg-white text-zinc-900 border-b border-gray-200 pt-20 pb-32 px-4 rounded-b-[3rem] shadow-sm relative overflow-hidden"'
)

# 2. Lighten the Stats Cards in Hero
content = content.replace(
    'className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4"',
    'className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex items-center gap-4"'
)

# Fix text colors inside the hero
content = content.replace('text-zinc-400 text-lg md:text-xl max-w-xl', 'text-gray-500 text-lg md:text-xl max-w-xl')
content = content.replace('text-zinc-400 text-sm font-bold uppercase', 'text-gray-500 text-sm font-bold uppercase')

# 3. Lighten Carousel Cards
content = content.replace(
    '<div className="absolute inset-0 bg-zinc-900">',
    '<div className="absolute inset-0 bg-gray-100">'
)
content = content.replace('text-white leading-tight mb-2', 'text-zinc-900 leading-tight mb-2')
content = content.replace('text-white/70 mb-2 block', 'text-gray-500 mb-2 block')
content = content.replace('bg-white/10 text-white/50', 'bg-white text-gray-400')

# 4. Fix Carousel wrapper to flex-nowrap
content = content.replace(
    'className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide snap-x"',
    'className="flex flex-nowrap gap-6 overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide snap-x"'
)

# 5. Fix "Up Next" Card mobile layout (Prevent Play Button Overflow)
content = content.replace(
    '<div className="flex items-center justify-between relative z-10">',
    '<div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10 gap-6">'
)

with open("unimonday-web/src/app/dashboard/page.tsx", "w") as f:
    f.write(content)
