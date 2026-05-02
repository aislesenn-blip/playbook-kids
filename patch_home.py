import re

with open('unimonday-web/src/app/page.tsx', 'r') as f:
    content = f.read()

# Replace router push with Link in handleShopNow section
content = content.replace('import { useRouter } from "next/navigation";', 'import Link from "next/link";')
content = content.replace('const router = useRouter();', '')
content = content.replace('const handleShopNow = () => {\n    router.push("/explore");\n  };', '')

content = content.replace(
    '<button\n            onClick={handleShopNow}\n            className="group inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 hover:scale-[1.02] transition-all active:scale-95 shadow-lg shadow-gray-900/20"\n          >\n            Start Exploring\n            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />\n          </button>',
    '<Link\n            href="/explore"\n            className="group inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 hover:scale-[1.02] transition-all active:scale-95 shadow-lg shadow-gray-900/20"\n          >\n            Start Exploring\n            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />\n          </Link>'
)

# Wrap motion divs with Link
content = content.replace('<motion.div whileHover={{ y: -10 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-md group cursor-pointer">', '<Link href="/product/1" className="block">\n            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-md group cursor-pointer">')
content = content.replace('</button>\n            </div>\n          </motion.div>', '</button>\n            </div>\n          </motion.div>\n          </Link>')


with open('unimonday-web/src/app/page.tsx', 'w') as f:
    f.write(content)
