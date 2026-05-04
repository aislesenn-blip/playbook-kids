with open("unimonday-web/src/app/auth/login/page.tsx", "r") as f:
    content = f.read()
content = content.replace("const { setUser, setLocation } = useAppStore();", "const { setCurrentUser, setSelectedRegion } = useAppStore();")
content = content.replace("setUser({", "setCurrentUser({")
content = content.replace("setLocation(\"Dar es Salaam\", \"UDSM - Main Campus\");", "setSelectedRegion(\"Dar es Salaam\");")
with open("unimonday-web/src/app/auth/login/page.tsx", "w") as f:
    f.write(content)

with open("unimonday-web/src/app/auth/signup/page.tsx", "r") as f:
    content = f.read()
content = content.replace("const { setUser, setLocation } = useAppStore();", "const { setCurrentUser, setSelectedRegion } = useAppStore();")
content = content.replace("setUser({", "setCurrentUser({")
content = content.replace("setLocation(formData.region, formData.campusName);", "setSelectedRegion(formData.region);")
with open("unimonday-web/src/app/auth/signup/page.tsx", "w") as f:
    f.write(content)
