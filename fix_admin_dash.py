import re
with open("unimonday-web/src/app/admin/dashboard/page.tsx", "r") as f:
    content = f.read()

content = content.replace("const { logout } = useAppStore();", "const { setUser } = useAppStore();")
content = content.replace("logout();", "setUser(null);")

with open("unimonday-web/src/app/admin/dashboard/page.tsx", "w") as f:
    f.write(content)
