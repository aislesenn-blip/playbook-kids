import re

with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# Fix Math.random() in useMemo (use static values or move to useEffect state)
pattern = r"""
  // Pre-calculate random values to avoid impurity during render
  const snippetConfigs = useMemo\(\(\) => \{
     return bgSnippets\.map\(\(snippet, i\) => \(\{
        snippet,
        y: Math\.random\(\) \* 800,
        duration: 15 \+ Math\.random\(\) \* 10
     \}\)\);
  \}, \[\]\); // Empty dependency array means it only runs once
"""

replacement = """
  // State for snippet configs to avoid hydration mismatch and impurity
  const [snippetConfigs, setSnippetConfigs] = useState<{snippet: string, y: number, duration: number}[]>([]);

  useEffect(() => {
    setSnippetConfigs(bgSnippets.map((snippet, i) => ({
      snippet,
      y: Math.random() * 800,
      duration: 15 + Math.random() * 10
    })));
  }, []);
"""

content = re.sub(pattern.strip(), replacement.strip(), content, flags=re.MULTILINE)

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
