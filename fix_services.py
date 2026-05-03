import re

file_path = "unimonday-web/src/app/services/page.tsx"

with open(file_path, "r") as f:
    content = f.read()

# Replace Verified Services
content = content.replace('Verified <span className="text-primary">Services</span>', 'uNiMONDAY <span className="text-primary">Services</span>')

# Replace description
content = content.replace('Trusted professionals for repairs, delivery, printing, and more—all vetted for safety.', 'Trusted in-house professionals for repairs, delivery, printing, and more.')

# Replace providers in array
content = re.sub(r'provider:\s*"[^"]+",\n\s*', '', content)

# Replace By {service.provider}
content = re.sub(r'<p className="text-muted-foreground text-sm font-medium flex items-center gap-2">\s*By \{service\.provider\} <ShieldCheck className="w-4 h-4 text-primary" />\s*</p>', '<p className="text-muted-foreground text-sm font-medium flex items-center gap-2">\n                      uNiMONDAY In-House Expert <ShieldCheck className="w-4 h-4 text-primary" />\n                    </p>', content)


with open(file_path, "w") as f:
    f.write(content)
