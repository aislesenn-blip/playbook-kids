with open("unimonday-web/src/types/index.ts", "r") as f:
    content = f.read()

content = content.replace("  vendorName: string;", "  vendorName: string;\n  region?: string;\n  nationwideDelivery?: boolean;")

with open("unimonday-web/src/types/index.ts", "w") as f:
    f.write(content)
