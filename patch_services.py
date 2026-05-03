import re

with open("unimonday-web/src/app/services/page.tsx", "r") as f:
    content = f.read()

# Update title and descriptions to be 1st party
content = content.replace("Verified Student Services", "uNiMONDAY Services")
content = content.replace("Book trusted, verified student freelancers and campus professionals.", "Book our trusted, in-house experts and professionals for all your needs.")

# Change "Provider" references to "uNiMONDAY Expert"
content = re.sub(r'By .*?</div>', 'By uNiMONDAY Expert</div>', content)

with open("unimonday-web/src/app/services/page.tsx", "w") as f:
    f.write(content)

print("Services patched")
