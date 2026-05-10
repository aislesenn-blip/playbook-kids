import re

with open('unimonday-web/src/components/layout/TopNav.tsx', 'r') as f:
    content = f.read()

content = content.replace('<Shirt className="w-4 h-4" /> Fashion', '<Tractor className="w-4 h-4" /> Tractors')
content = content.replace('<Smartphone className="w-4 h-4" /> Tech', '<Sprout className="w-4 h-4" /> Fertilizers')
content = content.replace('<Sparkles className="w-4 h-4" /> Beauty', '<Wheat className="w-4 h-4" /> Produce')
content = content.replace('<LampDesk className="w-4 h-4" /> Decor', '<Egg className="w-4 h-4" /> Livestock')
content = content.replace('<ShieldCheck className="w-4 h-4" /> Services', '<Wrench className="w-4 h-4" /> Services')

with open('unimonday-web/src/components/layout/TopNav.tsx', 'w') as f:
    f.write(content)
