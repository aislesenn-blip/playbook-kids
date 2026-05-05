import re

with open("src/components/layout/TopNav.tsx", "r") as f:
    content = f.read()

# Remove specific links
content = re.sub(r'<Link href="/print-station".*?</Link>\s*', '', content, flags=re.DOTALL)
content = re.sub(r'<Link href="/templates".*?</Link>\s*', '', content, flags=re.DOTALL)
content = re.sub(r'<Link href="/vendor/apply".*?</Link>\s*', '', content, flags=re.DOTALL)
content = re.sub(r'<hr className="border-border my-2" />\s*<Link href="/vendor/apply".*?</Link>\s*', '', content, flags=re.DOTALL)

with open("src/components/layout/TopNav.tsx", "w") as f:
    f.write(content)
