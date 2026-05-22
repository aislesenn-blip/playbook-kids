import sys

with open('unimonday-web/src/app/layout.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { ParentTour } from '@/components/onboarding/ParentTour';", "import { ContextualTour } from '@/components/onboarding/ContextualTour';")
content = content.replace("<ParentTour />", "<ContextualTour />")

with open('unimonday-web/src/app/layout.tsx', 'w') as f:
    f.write(content)
