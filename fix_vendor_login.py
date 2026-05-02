import re
import os

filepath = "unimonday-web/src/app/auth/login/page.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Update router.push to check role
handler = """      const userRole = userMeta.role || "student";

      toast.success("Logged in successfully!");
      if (userRole === "vendor") {
        router.push("/vendor/dashboard");
      } else {
        router.push(redirectTo);
      }"""

content = re.sub(
    r'toast\.success\("Logged in successfully!"\);\n      router\.push\(redirectTo\);',
    handler,
    content,
    flags=re.DOTALL
)

with open(filepath, "w") as f:
    f.write(content)
