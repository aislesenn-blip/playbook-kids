import re

with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# Fix Math.random() impurity in render by moving it to useMemo
pattern = r"""
  // Background floating code snippets
  const bgSnippets = \[
    "<div className='flex items-center'>", "const \[state, setState\] = useState\(null\);",
    "await fetch\('/api/data'\)", "export default function App\(\)",
    "gap-4 p-6 rounded-2xl shadow-sm", "{data\.map\(item => <Card key={item\.id} />\)}"
  \];
"""

replacement = """
  // Background floating code snippets
  const bgSnippets = [
    "<div className='flex items-center'>", "const [state, setState] = useState(null);",
    "await fetch('/api/data')", "export default function App()",
    "gap-4 p-6 rounded-2xl shadow-sm", "{data.map(item => <Card key={item.id} />)}"
  ];

  // Pre-calculate random values to avoid impurity during render
  const snippetConfigs = useMemo(() => {
     return bgSnippets.map((snippet, i) => ({
        snippet,
        y: Math.random() * 800,
        duration: 15 + Math.random() * 10
     }));
  }, []); // Empty dependency array means it only runs once
"""
content = re.sub(pattern.strip(), replacement.strip(), content, flags=re.MULTILINE)

pattern2 = r"""
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          \{bgSnippets\.map\(\(snippet, i\) => \(
            <motion\.div
              key=\{i\}
              initial=\{\{ x: -100, y: Math\.random\(\) \* 800, opacity: 0 \}\}
              animate=\{\{
                x: \[null, window\.innerWidth \+ 100\],
                opacity: \[0, 0\.5, 0\]
              \}\}
              transition=\{\{
                duration: 15 \+ Math\.random\(\) \* 10,
                repeat: Infinity,
                delay: i \* 2,
                ease: "linear"
              \}\}
              className="absolute text-neutral-400 font-mono text-xs whitespace-nowrap"
            >
              \{snippet\}
            </motion\.div>
          \)\)\}
        </div>
"""

replacement2 = """
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          {snippetConfigs.map((config, i) => (
            <motion.div
              key={i}
              initial={{ x: -100, y: config.y, opacity: 0 }}
              animate={{
                x: [null, window.innerWidth ? window.innerWidth + 100 : 1500],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: config.duration,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear"
              }}
              className="absolute text-neutral-400 font-mono text-xs whitespace-nowrap"
            >
              {config.snippet}
            </motion.div>
          ))}
        </div>
"""
content = re.sub(pattern2.strip(), replacement2.strip(), content, flags=re.MULTILINE)

# Fix fullCode missing dependency
pattern3 = r"""
const CodeTyper = \(\) => \{
  const \[code, setCode\] = useState\(""\);
  const fullCode = `function Hero\(\) \{\\n  return \(\\n    <section className="bg-white py-20">\\n      <div className="container mx-auto px-4">\\n        <h1 className="text-5xl font-bold mb-4">\\n          Built with AI\\n        </h1>\\n        <p className="text-xl text-gray-600">\\n          Deploying in seconds\.\.\.\\n        </p>\\n      </div>\\n    </section>\\n  \);\\n\}`;

  useEffect\(\(\) => \{
"""
replacement3 = """
const CodeTyper = () => {
  const [code, setCode] = useState("");

  useEffect(() => {
    const fullCode = `function Hero() {\\n  return (\\n    <section className="bg-white py-20">\\n      <div className="container mx-auto px-4">\\n        <h1 className="text-5xl font-bold mb-4">\\n          Built with AI\\n        </h1>\\n        <p className="text-xl text-gray-600">\\n          Deploying in seconds...\\n        </p>\\n      </div>\\n    </section>\\n  );\\n}`;
"""
content = re.sub(pattern3.strip(), replacement3.strip(), content, flags=re.MULTILINE)

# Fix placeholderIdeas dependency
pattern4 = r"""
  // Typewriter effect state
  const placeholderIdeas = \[
    "A sleek e-commerce store for handmade ceramics\.\.\.",
    "A minimalist portfolio for an architect\.\.\.",
    "A high-end restaurant landing page with reservations\.\.\.",
    "A clean blog template for writers\.\.\."
  \];
"""
replacement4 = """
  // Typewriter effect state
  const placeholderIdeas = useMemo(() => [
    "A sleek e-commerce store for handmade ceramics...",
    "A minimalist portfolio for an architect...",
    "A high-end restaurant landing page with reservations...",
    "A clean blog template for writers..."
  ], []);
"""
content = re.sub(pattern4.strip(), replacement4.strip(), content, flags=re.MULTILINE)

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
