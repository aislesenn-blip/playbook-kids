def fix():
    file_path = 'unimonday-web/src/components/layout/TopNav.tsx'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Remove unused imports
        content = content.replace(', Search', '')
        content = content.replace('PenTool, ', '')
        content = content.replace('useEffect, ', '')

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed lint errors")

    except Exception as e:
        print(f"Error: {e}")

fix()
