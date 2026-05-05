import re

with open("src/app/workspace/page.tsx", "r") as f:
    content = f.read()

# Fix the unused variables and any types in workspace
content = content.replace("import { Play, Code, FileText, ChevronRight, LayoutTemplate } from \"lucide-react\";", "import { Play, Code, ChevronRight, LayoutTemplate } from \"lucide-react\";")
content = content.replace("data.Document_Tree.forEach((node: { tag: string; style?: any; content: string }) => {", "data.Document_Tree.forEach((node: { tag: string; style?: Record<string, string | number>; content: string }) => {")

with open("src/app/workspace/page.tsx", "w") as f:
    f.write(content)
