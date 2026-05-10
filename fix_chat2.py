import re

with open('unimonday-web/src/app/chat/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('v: any', 'v: AgriVendor')
content = content.replace('c: any', 'c: { id: string, name: string, avatar: string, lastMsg: string, unread: number }')
content = content.replace('chat: any', 'chat: { id: string, name: string, avatar: string, lastMsg: string, unread: number }')
content = content.replace("role === 'stationary'", "role === 'vendor'")

with open('unimonday-web/src/app/chat/page.tsx', 'w') as f:
    f.write(content)
