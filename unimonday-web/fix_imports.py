import re

with open("src/app/workspace/page.tsx", "r") as f:
    content = f.read()

# Fix default export error for TextStyle
content = content.replace("import TextStyle from '@tiptap/extension-text-style';", "import { TextStyle } from '@tiptap/extension-text-style';")
# Fix ESLint any warnings
content = content.replace("data.Document_Tree.forEach((node: any) => {", "data.Document_Tree.forEach((node: { tag: string; style?: any; content: string }) => {")
content = content.replace("} catch (err: any) {", "} catch (err: unknown) {\n    if (err instanceof Error) throw new Error(`Failed to parse JSON: ${err.message}`);")
content = content.replace("} catch (err: any) {", "} catch (err: unknown) {\n      if (err instanceof Error) setError(err.message);")

with open("src/app/workspace/page.tsx", "w") as f:
    f.write(content)
