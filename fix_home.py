import re
with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# Add Trust prompt at the very top of home page
trust_banner = """
      {/* Trust Banner */}
      <div className="w-full bg-emerald-50 border-b border-emerald-100 py-3 px-4 flex justify-center items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
        </div>
        <p className="text-sm sm:text-base font-bold text-emerald-900">
          Pay ONLY after you receive and are satisfied with your product! <span className="text-emerald-600">100% Guaranteed.</span>
        </p>
      </div>

      {/* Hero Section - Amazon Style Grid */}
"""

content = content.replace("{/* Hero Section - Amazon Style Grid */}", trust_banner)

# Update product cards on home page with region and delivery info
replacement = """
                    <div className="mt-4 space-y-1">
                      <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{product.vendorName}</p>
                      <div className="flex items-center gap-2 mt-1">
                         {product.region && (
                           <div className="flex items-center gap-1 text-[10px] text-primary bg-primary/10 w-fit px-1.5 py-0.5 rounded-full">
                             <MapPin className="w-2.5 h-2.5" />
                             <span className="font-bold">{product.region}</span>
                           </div>
                         )}
                         {product.nationwideDelivery && (
                           <div className="flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50 w-fit px-1.5 py-0.5 rounded-full">
                             <Truck className="w-2.5 h-2.5" />
                             <span className="font-bold">Delivery Popote</span>
                           </div>
                         )}
                      </div>
                      <div className="flex items-center justify-between mt-2">"""

content = re.sub(r"""<div className="mt-4 space-y-1">\s*<h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">\{product.name\}</h3>\s*<p className="text-sm text-muted-foreground font-medium">\{product.vendorName\}</p>\s*<div className="flex items-center justify-between mt-2">""", replacement, content)


with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
