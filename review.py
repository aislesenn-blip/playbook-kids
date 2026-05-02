import re
import os

files_to_check = [
    "src/app/page.tsx",
    "src/app/explore/page.tsx",
    "src/app/fashion/page.tsx",
    "src/app/tech/page.tsx",
    "src/app/beauty/page.tsx",
    "src/app/home-decor/page.tsx",
    "src/app/trending/page.tsx"
]

print("Checking handleAddToCart implementations for e.stopPropagation()...")
for f in files_to_check:
    path = os.path.join("unimonday-web", f)
    if os.path.exists(path):
        with open(path, "r") as file:
            content = file.read()
            if "handleAddToCart" in content:
                if "e.stopPropagation()" not in content.split("handleAddToCart")[1][:200]:
                     print(f"Missing e.stopPropagation() in handleAddToCart in {f}")
