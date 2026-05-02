import os
import glob

files_to_check = [
    "src/app/page.tsx",
    "src/app/explore/page.tsx",
    "src/app/search/page.tsx",
    "src/app/product/[id]/page.tsx",
    "src/app/checkout/page.tsx",
    "src/app/orders/page.tsx",
    "src/app/chat/page.tsx",
    "src/app/store/[vendor_id]/page.tsx",
    "src/components/layout/TopNav.tsx",
    "src/components/layout/BottomNav.tsx",
    "src/lib/store/app-store.ts"
]

for filepath in files_to_check:
    full_path = os.path.join("unimonday-web", filepath)
    if os.path.exists(full_path):
        print(f"\n--- {filepath} ---")
        # Just print lines with Link, button, router.push, onClick, handleAddToCart, href
        with open(full_path, "r") as f:
            lines = f.readlines()
            for i, line in enumerate(lines):
                if any(x in line for x in ["<Link", "<button", "router.push", "onClick", "href=", "handleAddToCart", "useAppStore", "addToCart"]):
                    print(f"{i+1}: {line.strip()}")
