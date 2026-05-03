import re

# Fix OfflineBanner useEffect warning
with open("unimonday-web/src/components/ui/OfflineBanner.tsx", "r") as f:
    content = f.read()
content = content.replace("  useEffect(() => {\n    setIsOffline(!navigator.onLine);\n  }, []);", "")
content = content.replace("  const [isOffline, setIsOffline] = useState(false);", "  const [isOffline, setIsOffline] = useState(false);\n\n  useEffect(() => {\n    // Initialize on mount without causing sync render warning\n    const initialize = () => setIsOffline(!navigator.onLine);\n    initialize();\n  }, []);")
with open("unimonday-web/src/components/ui/OfflineBanner.tsx", "w") as f:
    f.write(content)

# Fix MapPin import in page.tsx
with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()
content = content.replace("import { ShoppingBag, Wrench, ShieldCheck, ArrowRight, Star, Truck, MapPin } from \"lucide-react\";", "import { ShoppingBag, ShieldCheck, ArrowRight, Star, Truck, MapPin } from \"lucide-react\";")
with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
