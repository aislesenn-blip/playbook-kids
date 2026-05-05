import re

def update_file(filepath, replacements):
    with open(filepath, "r") as f:
        content = f.read()

    for old, new in replacements:
        content = content.replace(old, new)

    with open(filepath, "w") as f:
        f.write(content)

update_file("src/app/auth/signup/page.tsx", [
    ("placeholder=\"e.g. UDSM Main Campus\"", "placeholder=\"e.g. Harvard University\"")
])

update_file("src/app/auth/login/page.tsx", [
    ("campusName: \"UDSM - Main Campus\"", "campusName: \"Stanford University\""),
    ("setLocation(\"Dar es Salaam\", \"UDSM - Main Campus\");", "setLocation(\"California\", \"Stanford University\");")
])

update_file("src/lib/store/app-store.ts", [
    ("campusName: userMeta.campusName || \"UDSM - Main Campus\"", "campusName: userMeta.campusName || \"Global\""),
    ("currentCampusName: userMeta.campusName || \"UDSM - Main Campus\"", "currentCampusName: userMeta.campusName || \"Global\"")
])

update_file("src/lib/mockData.ts", [
    ("storeName: 'TechZone UDSM',", "storeName: 'AI Cloud Storage',"),
    ("vendorName: 'TechZone UDSM',", "vendorName: 'AI Cloud Storage',")
])

update_file("README.md", [
    ("- **Hyper-Local Discovery**: Automatically detects if a user is at UDSM, UDOM, etc., using geolocation.", "- **Universal Accessibility**: Available instantly globally without geolocation limits.")
])

print("Cleaned up legacy vendor/location strings.")
