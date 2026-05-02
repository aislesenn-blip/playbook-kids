with open('unimonday-web/src/app/auth/login/page.tsx', 'r') as f:
    login = f.read()
login = login.replace("Don't have an account?", "Don&apos;t have an account?")
with open('unimonday-web/src/app/auth/login/page.tsx', 'w') as f:
    f.write(login)

with open('unimonday-web/src/app/product/[id]/page.tsx', 'r') as f:
    prod = f.read()
prod = prod.replace('const handleAddToCart', 'export const handleAddToCart')
with open('unimonday-web/src/app/product/[id]/page.tsx', 'w') as f:
    f.write(prod)
