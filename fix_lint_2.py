import re

with open("unimonday-web/src/app/auth/signup/page.tsx", "r") as f:
    content = f.read()

# The line 105 probably has an orphaned } due to our previous regex replacements
# Let's clean it up completely. It's the `role === 'vendor'` conditional that wasn't removed properly
content = re.sub(r'\{role === \'vendor\' && \([\s\S]*?\}\)', '', content)

with open("unimonday-web/src/app/auth/signup/page.tsx", "w") as f:
    f.write(content)

with open("unimonday-web/src/app/vendor/apply/page.tsx", "r") as f:
    c2 = f.read()

c2 = c2.replace("let's", "let&apos;s")

with open("unimonday-web/src/app/vendor/apply/page.tsx", "w") as f:
    f.write(c2)
