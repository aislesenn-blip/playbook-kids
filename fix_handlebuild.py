import re

with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# Change handleBuild to accept an optional prompt argument
old_handleBuild = "const handleBuild = () => {\n    if (!prompt.trim()) return;"
new_handleBuild = "const handleBuild = (forcePrompt?: string) => {\n    const activePrompt = forcePrompt || prompt;\n    if (!activePrompt.trim()) return;"
content = content.replace(old_handleBuild, new_handleBuild)

# Change the modal click handler to pass the selectedTemplate.prompt
old_modal_click = """                        onClick={() => {
                          setPrompt(selectedTemplate.prompt);
                          setSelectedTemplate(null);
                          setTimeout(() => {
                             handleBuild();
                          }, 100);
                        }}"""
new_modal_click = """                        onClick={() => {
                          setPrompt(selectedTemplate.prompt);
                          setSelectedTemplate(null);
                          handleBuild(selectedTemplate.prompt);
                        }}"""
content = content.replace(old_modal_click, new_modal_click)

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
