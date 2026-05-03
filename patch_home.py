import re

with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

trust_prompt = """
      {/* Global Trust Prompt */}
      <div className="w-full bg-primary text-white py-3 px-4 text-center font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        Pay AFTER you receive your product and are satisfied with it.
      </div>
"""

# Insert right after the top div inside the return statement
content = re.sub(
    r'(<div className="flex flex-col items-center justify-center w-full overflow-x-hidden selection:bg-primary/20 selection:text-primary">)',
    r'\1\n' + trust_prompt,
    content
)

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)

print("Home patched")
