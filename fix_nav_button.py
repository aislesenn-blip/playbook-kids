import re

def fix():
    file_path = 'unimonday-web/src/app/page.tsx'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # The Back to builder button has class absolute top-8 left-8, which is where the top-left logo is!
        # If the nav is z-50, then the logo is intercepting clicks on the "Back to builder" button.
        # We can change the button to absolute top-24 left-8 instead.

        content = content.replace('className="absolute top-8 left-8 flex items-center gap-2 text-black font-bold hover:underline"', 'className="absolute top-24 left-8 flex items-center gap-2 text-black font-bold hover:underline"')

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Moved Back to builder button down")

    except Exception as e:
        print(f"Error: {e}")

fix()
