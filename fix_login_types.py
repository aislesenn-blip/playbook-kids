with open("unimonday-web/src/app/auth/login/page.tsx", "r") as f:
    content = f.read()

content = content.replace("role: isVendor ? \"vendor\" : \"student\",", "role: \"student\",")
content = content.replace("const isVendor = false;", "")
content = content.replace("name: isVendor ? \"Store Vendor\" : \"Student User\",", "name: \"Student User\",")
content = content.replace("id: isVendor ? \"v1\" : \"u1\",", "id: \"u1\",")

with open("unimonday-web/src/app/auth/login/page.tsx", "w") as f:
    f.write(content)
