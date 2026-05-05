def fix_icons():
    file_path = 'unimonday-web/src/app/page.tsx'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        import_statement = 'import { Send, CheckCircle, Terminal, Globe, RefreshCcw, LayoutTemplate, Briefcase, Store, Code2, Sparkles, Database, Layers, Camera, Pencil, Coffee, Music, Heart, Zap, FolderTree, Cpu, Activity } from "lucide-react";'
        new_import_statement = 'import { Send, CheckCircle, Terminal, Globe, RefreshCcw, LayoutTemplate, Briefcase, Store, Code2, Sparkles, Database, Layers, Camera, Pencil, Coffee, Music, Heart, Zap, FolderTree, Cpu, Activity, X, ArrowRight } from "lucide-react";'

        content = content.replace(import_statement, new_import_statement)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed icons in page.tsx")
    except Exception as e:
        print(f"Error: {e}")

fix_icons()
