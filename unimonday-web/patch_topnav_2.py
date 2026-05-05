import re

with open("src/components/layout/TopNav.tsx", "r") as f:
    content = f.read()

content = content.replace("Cloud Stationary", "AI Workspace")
content = content.replace("Your print job is ready!", "Your document is formatted!")
content = content.replace("Please pick it up at Mlimani Campus Main Print.", "Check your workspace to review the AI changes.")

with open("src/components/layout/TopNav.tsx", "w") as f:
    f.write(content)
