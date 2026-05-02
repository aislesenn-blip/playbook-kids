with open('unimonday-web/src/app/product/[id]/page.tsx', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'Add to Cart' in line and '<button' in line:
        lines[i] = line.replace('<button ', '<button onClick={handleAddToCart} ')

with open('unimonday-web/src/app/product/[id]/page.tsx', 'w') as f:
    f.writelines(lines)
