import re

with open("unimonday-web/src/app/store/[vendor_id]/page.tsx", "r") as f:
    content = f.read()

# Add Truck import if not there
if "Truck" not in content:
    content = content.replace("Star, Search,", "Star, Search, Truck,")

# Update Store Info to remove "UDSM - Main Campus" and replace with "Dar es Salaam", and add Delivery Badge
content = content.replace('MapPin className="w-4 h-4 text-primary" /> UDSM - Main Campus', 'MapPin className="w-4 h-4 text-primary" /> Dar es Salaam')

delivery_badge = """
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit">
              <Truck className="w-4 h-4" /> Available for delivery anywhere
            </div>
"""

content = re.sub(
    r'<div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-white/50 px-3 py-1\.5 rounded-full w-fit backdrop-blur-md">\s*<MapPin className="w-4 h-4 text-primary" /> Dar es Salaam\s*</div>',
    r'<div className="flex flex-col sm:flex-row gap-2">\n              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-white/50 px-3 py-1.5 rounded-full w-fit backdrop-blur-md">\n                <MapPin className="w-4 h-4 text-primary" /> Dar es Salaam\n              </div>\n' + delivery_badge + '\n            </div>',
    content
)

with open("unimonday-web/src/app/store/[vendor_id]/page.tsx", "w") as f:
    f.write(content)

print("Store patched")
