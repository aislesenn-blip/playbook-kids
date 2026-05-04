import re

with open('src/app/workspace/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('useState<any[]>', 'useState<Array<{id: number, text: string, sender: string, isDraftCard?: boolean, documentId?: string}>>')

with open('src/app/workspace/page.tsx', 'w') as f:
    f.write(content)
