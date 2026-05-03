import re

with open("unimonday-web/src/app/product/[id]/page.tsx", "r") as f:
    content = f.read()

# Add Truck import if not there
if "Truck" not in content:
    content = content.replace("Star, ShieldCheck,", "Star, ShieldCheck, Truck, MapPin,")
else:
    content = content.replace("ShieldCheck", "ShieldCheck, MapPin")

# Update Vendor Info area to remove Vendor reference, change campus to Mkoa (e.g. Dar es Salaam), and add delivery badge
vendor_ui = """
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 mb-6 border border-border">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                 </div>
                 <div>
                   <p className="font-bold text-gray-900">Dar es Salaam</p>
                   <p className="text-xs text-muted-foreground font-medium">Product Location</p>
                 </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
                <Truck className="w-5 h-5" />
                Available for delivery anywhere
              </div>
            </div>
"""

# Try to find the exact Vendor UI block to replace
content = re.sub(
    r'<div className="bg-gray-50 rounded-2xl p-4 sm:p-6 mb-6 border border-border">.*?</div>\s*</div>\s*</div>\s*</div>\s*</main>',
    vendor_ui + '\n          </div>\n        </div>\n      </div>\n    </main>',
    content,
    flags=re.DOTALL
)


with open("unimonday-web/src/app/product/[id]/page.tsx", "w") as f:
    f.write(content)

print("Product patched")
