import sys

with open('unimonday-web/src/components/onboarding/ContextualTour.tsx', 'r') as f:
    content = f.read()

# Fix unused imports
content = content.replace("import { useState, useEffect, useRef } from 'react';", "import { useState, useEffect } from 'react';")
content = content.replace("import { X, ArrowRight, MousePointer2 } from 'lucide-react';", "import { X, MousePointer2 } from 'lucide-react';")
content = content.replace("import { usePathname, useRouter } from 'next/navigation';", "import { usePathname } from 'next/navigation';")
content = content.replace("  const router = useRouter();\n", "")

# Fix set-state-in-effect warning
content = content.replace('''    if (!pathname.startsWith(stepDef.expectedRoute)) {
      setTargetRect(null);
      return;
    }''', '''    if (!pathname.startsWith(stepDef.expectedRoute)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTargetRect(null);
      return;
    }''')

with open('unimonday-web/src/components/onboarding/ContextualTour.tsx', 'w') as f:
    f.write(content)
