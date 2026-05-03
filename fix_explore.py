import re
with open("unimonday-web/src/app/explore/page.tsx", "r") as f:
    content = f.read()

# Add region and nationwide delivery info to product cards
replacement = """
                <div className="mt-3 sm:mt-4 space-y-1">
                  <h3 className="font-bold text-sm sm:text-base line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Store className="w-3 h-3" />
                    <span className="line-clamp-1 font-medium">{product.vendorName}</span>
                  </div>
                  {product.region && (
                    <div className="flex items-center gap-1 text-[10px] text-primary bg-primary/10 w-fit px-1.5 py-0.5 rounded-full">
                      <MapPin className="w-2.5 h-2.5" />
                      <span className="font-bold">{product.region}</span>
                    </div>
                  )}
                  {product.nationwideDelivery && (
                    <div className="flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50 w-fit px-1.5 py-0.5 rounded-full mt-1">
                      <ShoppingBag className="w-2.5 h-2.5" />
                      <span className="font-bold">Delivery Popote</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold">{product.rating}</span>
                  </div>
                </div>"""

# Replace in Explore
content = re.sub(r"""<div className="mt-3 sm:mt-4 space-y-1">\s*<h3 className="font-bold text-sm sm:text-base line-clamp-1">\{product.name\}</h3>\s*<div className="flex items-center gap-1 text-xs text-muted-foreground">\s*<Store className="w-3 h-3" />\s*<span className="line-clamp-1 font-medium">\{product.vendorName\}</span>\s*</div>\s*<div className="flex items-center gap-1">\s*<Star className="w-3 h-3 fill-amber-400 text-amber-400" />\s*<span className="text-xs font-bold">\{product.rating\}</span>\s*</div>\s*</div>""", replacement, content)

with open("unimonday-web/src/app/explore/page.tsx", "w") as f:
    f.write(content)
