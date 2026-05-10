import re

with open('unimonday-web/src/app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("uNiMONDAY - Campus Commerce", "uNiMONDAY - The Ultimate Agriculture Marketplace")
content = content.replace("The Billion Dollar Standard", "The Ultimate Agriculture Marketplace")
content = content.replace("Order food, print documents, and shop from local campus vendors instantly. The operating system for modern university life.", "Discover tractors, buy premium fertilizers, and connect directly with verified vendors. The operating system for modern farming.")
content = content.replace("Browse Vendors", "Browse Products")
content = content.replace("Student Discounts", "Farmer Discounts")
content = content.replace("Get 20% off all printing services this week at UDSM Main Campus.", "Get 20% off all tractor rentals this week in Dodoma.")

with open('unimonday-web/src/app/page.tsx', 'w') as f:
    f.write(content)
