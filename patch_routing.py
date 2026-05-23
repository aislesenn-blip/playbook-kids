import sys

with open('unimonday-web/src/app/session/[id]/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("if (session.id === '1') router.push('/upgrade'); else router.push('/dashboard');", "router.push('/dashboard');")

with open('unimonday-web/src/app/session/[id]/page.tsx', 'w') as f:
    f.write(content)
