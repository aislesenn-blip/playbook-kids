import os

categories = ["fashion", "beauty", "tech", "home-decor", "services"]

for cat in categories:
    filepath = f"unimonday-web/src/app/{cat}/page.tsx"
    if os.path.exists(filepath):
        print(f"\n--- {filepath} ---")
        with open(filepath, "r") as f:
            lines = f.readlines()
            for i, line in enumerate(lines):
                if any(x in line for x in ["<Link", "handleAddToCart", "addToCart"]):
                    print(f"{i+1}: {line.strip()}")
