def fix_css():
    file_path = 'unimonday-web/src/app/globals.css'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Let's fix globals.css since tailwind wasn't loading properly in the last screenshot.
        # The agent previously created an edge-to-edge UI by hiding scrollbars.

        # Checking if tailwind imports are missing
        if '@tailwind base;' not in content:
            print("Missing tailwind imports in globals.css")
        else:
            print("Tailwind imports are present")

        print(content[:500])
    except Exception as e:
        print(f"Error: {e}")

fix_css()
