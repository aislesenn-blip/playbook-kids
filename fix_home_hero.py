import re

with open('unimonday-web/src/app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("Introducing the world&apos;s first AI Cloud Stationary", "Introducing the world&apos;s first Agriculture Marketplace")
content = content.replace("Don&apos;t stress over formatting.<br className=\"hidden sm:block\" />\n            <span className=\"text-primary\">Let AI do the paperwork.</span>", "Don&apos;t stress over logistics.<br className=\"hidden sm:block\" />\n            <span className=\"text-primary\">Connect with top farmers.</span>")

with open('unimonday-web/src/app/page.tsx', 'w') as f:
    f.write(content)
