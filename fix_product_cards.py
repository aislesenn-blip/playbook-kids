import os
import re

files_to_check = [
    "src/app/page.tsx",
    "src/app/explore/page.tsx",
    "src/app/fashion/page.tsx",
    "src/app/tech/page.tsx",
    "src/app/beauty/page.tsx",
    "src/app/home-decor/page.tsx"
]

def process_file(filepath):
    full_path = os.path.join("unimonday-web", filepath)
    if not os.path.exists(full_path):
        return

    with open(full_path, "r") as f:
        content = f.read()

    # Replace generic Vendor names on cards: <p className="text-sm text-muted-foreground mb-3 truncate">By TechZone UDSM</p>
    content = re.sub(r'<p className="text-sm text-muted-foreground mb-3 truncate">By .*?</p>',
                     '<p className="text-xs text-emerald-600 font-bold mb-3 truncate flex items-center gap-1"><Truck className="w-3 h-3"/> Delivery Anywhere</p>', content)

    # Check if there are other By XYZ occurrences in different classes
    content = re.sub(r'<p className="text-sm text-muted-foreground mb-2">By .*?</p>',
                     '<p className="text-xs text-emerald-600 font-bold mb-2 flex items-center gap-1"><Truck className="w-3 h-3"/> Delivery Anywhere</p>', content)

    # Change "Verified Sellers" or "Verified Vendors" to "Featured Brands" or "Featured Stores"
    content = content.replace("Verified Vendors", "Featured Stores")
    content = content.replace("Verified Sellers", "Featured Brands")

    # Ensure Truck icon is imported if we injected it
    if '<Truck className=' in content and 'import { Truck ' not in content and 'Truck,' not in content:
        # Assuming lucide-react is imported
        if 'lucide-react' in content:
            content = re.sub(r'import \{ ([^\}]+) \} from "lucide-react";', r'import { \1, Truck } from "lucide-react";', content)

    with open(full_path, "w") as f:
        f.write(content)

for f in files_to_check:
    process_file(f)
print("Files patched.")
