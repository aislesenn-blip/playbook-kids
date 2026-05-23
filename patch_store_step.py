import sys

with open('unimonday-web/src/lib/store/app-store.ts', 'r') as f:
    content = f.read()

content = content.replace("    completeTour: () => void;", "    completeTour: () => void;\n    tourStep: number;\n    setTourStep: (step: number) => void;")

content = content.replace("            completeTour: () => set((state) => ({", "            tourStep: 0,\n            setTourStep: (step) => set({ tourStep: step }),\n            completeTour: () => set((state) => ({")

with open('unimonday-web/src/lib/store/app-store.ts', 'w') as f:
    f.write(content)
