import re

with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

content = re.sub(r'<p className="text-muted-foreground text-sm mb-4">By .*?</p>',
                 '<p className="text-xs text-emerald-600 font-bold mb-4 flex items-center gap-1"><Truck className="w-4 h-4"/> Delivery Anywhere</p>',
                 content)

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
