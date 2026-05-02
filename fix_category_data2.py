import os
import re

directories = ["fashion", "tech", "beauty", "home-decor"]
mapping = {
    "fashion": "Fashion & Apparels",
    "tech": "Tech & Accessories",
    "beauty": "Beauty & Cosmetics",
    "home-decor": "Home & Decor"
}

for dir_name in directories:
    file_path = f"unimonday-web/src/app/{dir_name}/page.tsx"
    if not os.path.exists(file_path):
        continue

    with open(file_path, "r") as f:
        content = f.read()

    category_name = mapping[dir_name]
    replacement = f"""  const products = mockProducts.filter(p => p.category === '{category_name}');"""

    # Regex to match the entire const products = [ ... ]; block
    content = re.sub(r'const products = \[.*?\];', replacement, content, flags=re.DOTALL)

    with open(file_path, "w") as f:
        f.write(content)
