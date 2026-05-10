import re

with open('unimonday-web/src/app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('import Image from "next/image";', '')
content = content.replace('import { ArrowRight, CheckCircle2, Sparkles, Printer, FileText, UploadCloud, BrainCircuit } from "lucide-react";', 'import { ArrowRight, Sparkles, UploadCloud } from "lucide-react";')

with open('unimonday-web/src/app/page.tsx', 'w') as f:
    f.write(content)
