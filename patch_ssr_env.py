import re

with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# Fix window.innerWidth SSR crash
pattern_window = r"""x: \[null, window\.innerWidth \? window\.innerWidth \+ 100 : 1500\],"""
replacement_window = """x: [null, typeof window !== 'undefined' ? window.innerWidth + 100 : 1500],"""
content = re.sub(pattern_window.strip(), replacement_window.strip(), content)

# Fix exposed Unsplash API Key - replace with NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
pattern_unsplash = r"""https://api\.unsplash\.com/photos/random\?query=\$\{keywords\}&count=6&client_id=GFRGVmxF64zpxZL22-o3BaVyGxphiGAwXLMfQxLCC2U"""
replacement_unsplash = """https://api.unsplash.com/photos/random?query=${keywords}&count=6&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}"""
content = re.sub(pattern_unsplash.strip(), replacement_unsplash.strip(), content)

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
