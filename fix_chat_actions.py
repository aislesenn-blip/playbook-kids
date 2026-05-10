import re

with open('unimonday-web/src/app/chat/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('Start Print Job', 'Confirm Order')
content = content.replace('toast.success("Print job started.")', 'toast.success("Order confirmed.")')
content = content.replace('Issue with file. Student notified.', 'Issue with order. Buyer notified.')
content = content.replace('Issue with file', 'Report Issue')

with open('unimonday-web/src/app/chat/page.tsx', 'w') as f:
    f.write(content)
