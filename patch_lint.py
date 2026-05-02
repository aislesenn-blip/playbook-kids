with open('unimonday-web/src/app/checkout/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('import { CheckCircle } from "lucide-react";\n', '')

with open('unimonday-web/src/app/checkout/page.tsx', 'w') as f:
    f.write(content)
