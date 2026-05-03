with open("unimonday-web/src/app/auth/signup/page.tsx", "r") as f:
    c = f.read()
    if "role === 'vendor'" in c:
        print("Failed to remove all vendor role checks in signup")
    else:
        print("Signup checks passed")

with open("unimonday-web/src/app/auth/login/page.tsx", "r") as f:
    c = f.read()
    if "role === 'vendor'" in c:
        print("Failed to remove all vendor role checks in login")
    else:
        print("Login checks passed")
