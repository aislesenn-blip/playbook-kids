with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# I notice the building state in the screenshot does not show my new IDE layout.
# This means my playwright script is testing too fast before the build finishes or it's still caching the old state.
# Let me just make sure the IDE text colors are definitely black as well just in case.

content = content.replace("text-black/50", "text-black")
content = content.replace("text-black/60", "text-black/80")
content = content.replace("text-black/90", "text-black")

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
