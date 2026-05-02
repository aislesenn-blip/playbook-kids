import os
import glob

# For all page files, ensure e.stopPropagation() and e.preventDefault() are present in handleAddToCart
def fix_handle_add_to_cart(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, "r") as f:
        content = f.read()

    # if handleAddToCart is defined as (e: React.MouseEvent, productId: string)
    if "const handleAddToCart = (e: React.MouseEvent, productId: string) => {" in content:
        if "e.preventDefault();" not in content and "e.stopPropagation();" not in content:
            content = content.replace(
                "const handleAddToCart = (e: React.MouseEvent, productId: string) => {",
                "const handleAddToCart = (e: React.MouseEvent, productId: string) => {\n    e.preventDefault();\n    e.stopPropagation();"
            )
            with open(filepath, "w") as f:
                f.write(content)

for filepath in glob.glob("unimonday-web/src/app/**/page.tsx", recursive=True):
    fix_handle_add_to_cart(filepath)
