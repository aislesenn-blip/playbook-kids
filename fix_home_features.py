import re

with open('unimonday-web/src/app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("1. Dump your raw text", "1. Browse Products")
content = content.replace("Just paste your unformatted notes, assignment draft, or rough ideas.", "Discover high-quality seeds, fertilizers, and farm equipment from verified sellers.")
content = content.replace("2. AI Auto-Formats", "2. Order Instantly")
content = content.replace("Our DeepSeek-R1 engine perfectly formats it into a ready-to-print official PDF.", "Connect with sellers, negotiate or purchase directly with secure mobile money.")
content = content.replace("Send it to any verified campus stationary and pick it up instantly using a secure code.", "Get it delivered or pick it up directly from the nearest verified vendor.")
content = content.replace("Join thousands of students who have upgraded to the Cloud Stationary. Professional letters, assignments, and CVs generated in seconds.", "Join thousands of farmers optimizing their agriculture supply chain today.")
content = content.replace("<BrainCircuit className=\"w-8 h-8\" />", "<Sparkles className=\"w-8 h-8\" />")

with open('unimonday-web/src/app/page.tsx', 'w') as f:
    f.write(content)
