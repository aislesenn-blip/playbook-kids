# Script to dump parts of the codebase to analyze the flows
import os

files_to_check = [
    "src/app/page.tsx",
    "src/app/checkout/page.tsx",
    "src/app/chat/page.tsx",
    "src/app/vendor/dashboard/page.tsx", # Checking product upload flow
    "src/app/admin/dashboard/page.tsx",
    "src/types/index.ts",
]

for f in files_to_check:
    print(f"--- {f} ---")
    try:
        with open(os.path.join("unimonday-web", f), "r") as file:
            content = file.read()
            if f == "src/app/page.tsx":
                print("Pay AFTER prompt found:", "Pay AFTER you receive" in content)
            elif f == "src/app/checkout/page.tsx":
                print("Pending message to chat logic:", "pendingMessages" in content)
                print("Redirect to master inbox:", "router.push('/chat')" in content)
            elif f == "src/app/vendor/dashboard/page.tsx":
                print("Perfect crop logic found:", "isCropping" in content)
                print("Hidden supplier field:", "supplierPhone" in content.lower())
    except Exception as e:
        print("Error reading", e)
