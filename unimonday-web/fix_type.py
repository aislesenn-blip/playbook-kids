import re

with open('src/app/workspace/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('const [messages, setMessages] = useState([\n    { id: 1, text: "Welcome to your intelligent workspace. What document are we drafting today?", sender: "ai" }\n  ]);', 'const [messages, setMessages] = useState<any[]>([\n    { id: 1, text: "Welcome to your intelligent workspace. What document are we drafting today?", sender: "ai" }\n  ]);')

# Try more robust replacement if the above doesn't hit exactly
content = re.sub(
    r'const \[messages, setMessages\] = useState\(\[',
    r'const [messages, setMessages] = useState<any[]>([',
    content
)

with open('src/app/workspace/page.tsx', 'w') as f:
    f.write(content)
