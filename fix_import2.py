with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# I missed updating the array where the icons are used:
# { title: "Real Estate", desc: "List properties", icon: Home, prompt: "A real estate property listing website" }

content = content.replace("icon: Home,", "icon: HomeIcon,")

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
