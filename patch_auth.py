import re

# 1. Patch Signup Page
with open("unimonday-web/src/app/auth/signup/page.tsx", "r") as f:
    signup_content = f.read()

# Remove role state
signup_content = re.sub(r'const \[role, setRole\] = useState<\'student\' \| \'vendor\'>\(\'student\'\);', '', signup_content)

# Remove tabs
tabs_pattern = r'<div className="flex bg-gray-100 p-1 rounded-xl mb-6">.*?</div>'
signup_content = re.sub(tabs_pattern, '', signup_content, flags=re.DOTALL)

# Remove vendor conditional inputs
store_name_pattern = r'\{role === \'vendor\' && \([\s\S]*?\}\)'
signup_content = re.sub(store_name_pattern, '', signup_content)

# Replace role references with 'student'
signup_content = signup_content.replace("role: role,", "role: 'student',")
signup_content = signup_content.replace("...(role === 'vendor' ? { storeName: formData.storeName } : {})", "")
signup_content = signup_content.replace('id: (role === \'vendor\' ? "v" : "u") + Date.now(),', 'id: "u" + Date.now(),')
signup_content = signup_content.replace('name: role === \'vendor\' ? formData.storeName : formData.name,', 'name: formData.name,')
signup_content = signup_content.replace('role: role,', 'role: "student",')

# Remove vendor redirect
vendor_redirect_pattern = r'if \(role === \'vendor\'\) \{[\s\S]*?\} else \{[\s\S]*?router\.push\(redirectTo\);[\s\S]*?\}'
signup_content = re.sub(vendor_redirect_pattern, 'router.push(redirectTo);', signup_content)

with open("unimonday-web/src/app/auth/signup/page.tsx", "w") as f:
    f.write(signup_content)


# 2. Patch Login Page
with open("unimonday-web/src/app/auth/login/page.tsx", "r") as f:
    login_content = f.read()

# Remove role state
login_content = re.sub(r'const \[role, setRole\] = useState<\'student\' \| \'vendor\'>\(\'student\'\);', '', login_content)

# Remove tabs
login_content = re.sub(tabs_pattern, '', login_content, flags=re.DOTALL)

# Fix role references
login_content = login_content.replace("const isVendor = role === 'vendor';", "const isVendor = false;")
login_content = login_content.replace("placeholder={role === 'vendor' ? \"vendor@store.com\" : \"student@example.com\"}", 'placeholder="student@example.com"')

# Remove vendor redirect
login_content = re.sub(r'if \(isVendor\) \{[\s\S]*?\} else \{[\s\S]*?router\.push\(redirectTo\);[\s\S]*?\}', 'router.push(redirectTo);', login_content)

with open("unimonday-web/src/app/auth/login/page.tsx", "w") as f:
    f.write(login_content)

print("Auth patched")
