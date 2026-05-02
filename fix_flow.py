import re
import os

files_to_fix = [
    "src/app/page.tsx",
    "src/app/explore/page.tsx",
    "src/app/search/page.tsx",
    "src/app/product/[id]/page.tsx",
    "src/app/store/[vendor_id]/page.tsx",
    "src/app/fashion/page.tsx",
    "src/app/beauty/page.tsx",
    "src/app/tech/page.tsx",
    "src/app/home-decor/page.tsx"
]

def fix_file(filepath):
    full_path = os.path.join("unimonday-web", filepath)
    if not os.path.exists(full_path):
        return

    with open(full_path, "r") as f:
        content = f.read()

    # Make sure we import toast if we're adding it
    if "import { toast } from" not in content and "handleAddToCart" in content:
        content = content.replace('import { useAppStore } from "@/lib/store/app-store";', 'import { useAppStore } from "@/lib/store/app-store";\nimport { toast } from "sonner";')
        content = content.replace('import { useAppStore } from "../lib/store/app-store";', 'import { useAppStore } from "../lib/store/app-store";\nimport { toast } from "sonner";')

    with open(full_path, "w") as f:
        f.write(content)

for filepath in files_to_fix:
    fix_file(filepath)
