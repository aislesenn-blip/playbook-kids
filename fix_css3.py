def fix_css():
    file_path = 'unimonday-web/src/app/globals.css'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        import_statement = '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n@source "../../src";'
        new_import_statement = '@import "tailwindcss";\n@source "../../src";'

        content = content.replace(import_statement, new_import_statement)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Restored original tailwind v4 imports in globals.css")
    except Exception as e:
        print(f"Error: {e}")

fix_css()
