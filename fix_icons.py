def fix_icons():
    file_path = 'unimonday-web/src/app/page.tsx'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        import_statement = 'import { Sparkles, Terminal, CheckCircle, Globe, RefreshCcw, Send, Settings, Database, Server, Box, Rocket, Globe2, LayoutTemplate, Smartphone, ShoppingCart, MessageSquare, Briefcase, Camera, Coffee, Music, Video, User } from "lucide-react";'
        new_import_statement = 'import { Sparkles, Terminal, CheckCircle, Globe, RefreshCcw, Send, Settings, Database, Server, Box, Rocket, Globe2, LayoutTemplate, Smartphone, ShoppingCart, MessageSquare, Briefcase, Camera, Coffee, Music, Video, User, X, ArrowRight } from "lucide-react";'

        content = content.replace(import_statement, new_import_statement)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed icons in page.tsx")
    except Exception as e:
        print(f"Error: {e}")

fix_icons()
