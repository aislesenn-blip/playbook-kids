import re

# Fix admin page
with open('unimonday-web/src/app/admin/dashboard/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('import { motion } from "framer-motion";\n', '')
content = content.replace('import { ShieldAlert, Users, Store, Activity, Eye, Edit3, Trash2, Power, Zap } from "lucide-react";', 'import { ShieldAlert, Users, Store, Activity, Eye, Edit3, Trash2, Power, Zap, Star } from "lucide-react";')

with open('unimonday-web/src/app/admin/dashboard/page.tsx', 'w') as f:
    f.write(content)

# Fix vendor dashboard page
with open('unimonday-web/src/app/vendor/dashboard/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('import { motion } from "framer-motion";\n', '')

with open('unimonday-web/src/app/vendor/dashboard/page.tsx', 'w') as f:
    f.write(content)
