with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# Fix unused imports
content = content.replace("Loader2, CheckCircle, Terminal, Globe, RefreshCcw, LayoutTemplate, Briefcase, Store, PenTool, Code2, Sparkles, Database, Layers", "CheckCircle, Terminal, Globe, RefreshCcw, LayoutTemplate, Briefcase, Store, Code2, Sparkles, Database, Layers")

# Fix setState inside useEffect by using setTimeout
content = content.replace(
"""    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhIndex((prev) => (prev + 1) % placeholders.length);
    }""",
"""    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhIndex((prev) => (prev + 1) % placeholders.length);
      }, 500); // Pause before next string
    }"""
)

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
