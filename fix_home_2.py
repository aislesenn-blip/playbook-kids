import re

with open('unimonday-web/src/app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("Dump your messy ideas, unformatted assignments, or rough notes. Our AI instantly perfectly formats them into official letters, assignments, or CVs. Print directly from your phone to any verified campus stationary. No prompt engineering needed.", "Discover top-tier agricultural machinery, buy fertilizers, and trade produce directly on the platform. Join thousands of farmers optimizing their yields. No middle-men needed.")
content = content.replace("<Printer className=\"w-5 h-5\" /> Partner as a Stationary", "<UploadCloud className=\"w-5 h-5\" /> Partner as a Vendor")
content = content.replace("<Printer className=\"w-8 h-8\" />", "<Sparkles className=\"w-8 h-8\" />")
content = content.replace("3. Print Anywhere", "3. Farm Smart")

with open('unimonday-web/src/app/page.tsx', 'w') as f:
    f.write(content)
