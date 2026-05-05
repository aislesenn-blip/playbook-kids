import re

with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# Fix setState in effect by pre-calculating the configs statically and removing bgSnippets mapping completely.
pattern = r"""
  // Background floating code snippets
  const bgSnippets = \[
    "<div className='flex items-center'>", "const \[state, setState\] = useState\(null\);",
    "await fetch\('/api/data'\)", "export default function App\(\)",
    "gap-4 p-6 rounded-2xl shadow-sm", "\{data\.map\(item => <Card key=\{item\.id\} />\)\}"
  \];

  // State for snippet configs to avoid hydration mismatch and impurity
  const \[snippetConfigs, setSnippetConfigs\] = useState<\{snippet: string, y: number, duration: number\}\[\]>\(\[\]\);

  useEffect\(\(\) => \{
    setSnippetConfigs\(bgSnippets\.map\(\(snippet, i\) => \(\{
      snippet,
      y: Math\.random\(\) \* 800,
      duration: 15 \+ Math\.random\(\) \* 10
    \}\)\)\);
  \}, \[\]\);
"""

replacement = """
  // Statically define the snippet configs to avoid hydration mismatch and impurity rules
  const snippetConfigs = useMemo(() => [
    { snippet: "<div className='flex items-center'>", y: 150, duration: 18 },
    { snippet: "const [state, setState] = useState(null);", y: 320, duration: 22 },
    { snippet: "await fetch('/api/data')", y: 450, duration: 16 },
    { snippet: "export default function App()", y: 600, duration: 25 },
    { snippet: "gap-4 p-6 rounded-2xl shadow-sm", y: 700, duration: 19 },
    { snippet: "{data.map(item => <Card key={item.id} />)}", y: 200, duration: 21 }
  ], []);
"""

content = re.sub(pattern.strip(), replacement.strip(), content, flags=re.MULTILINE)

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
