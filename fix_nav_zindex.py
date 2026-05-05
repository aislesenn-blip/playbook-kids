import re

def fix():
    file_path = 'unimonday-web/src/app/page.tsx'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # The mock views are overlaying the main nav!
        # `absolute inset-0 z-40 bg-[#DDA359] ...` is taking up the entire screen, blocking the `Sign In` button which is part of the `<nav>` at `z-20`.
        # To fix this, we should either put the mock views below the nav, or hide the nav when they are open, or raise the nav z-index.
        # It's better to raise the nav z-index. Let's make the nav `z-50`.

        content = content.replace('<nav className="w-full flex items-center justify-between p-6 z-20">', '<nav className="w-full flex items-center justify-between p-6 z-50 relative">')

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed Nav z-index")

    except Exception as e:
        print(f"Error: {e}")

fix()
