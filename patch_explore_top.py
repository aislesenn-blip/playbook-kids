import re

with open('unimonday-web/src/app/explore/page.tsx', 'r') as f:
    content = f.read()

# Update categories
content = content.replace('const categories = ["All", "Fashion", "Tech & Accessories", "Verified Services", "Stores", "Groceries"];', 'const categories = ["All", "Fashion", "Tech", "Services", "Stores", "Groceries"];')

# Replace the Hero section
old_hero = '''          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4">Explore Campus Hub</h1>
            <p className="text-muted-foreground text-lg">Find the best deals, verified services, and top stores around campus.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto flex gap-2"
          >'''

new_hero = '''          {/* Categories / Filters on top */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 overflow-x-auto pb-4 mb-4 scrollbar-hide justify-start sm:justify-center"
          >
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${
                   activeCategory === cat
                   ? "bg-primary text-white shadow-md shadow-primary/20"
                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                 }`}
               >
                 {cat}
               </button>
             ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto flex gap-2"
          >'''

content = content.replace(old_hero, new_hero)

# Remove the old categories at the bottom of the section
old_categories_bottom = '''          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide justify-center"
          >
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${
                   activeCategory === cat
                   ? "bg-primary text-white shadow-md shadow-primary/20"
                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                 }`}
               >
                 {cat}
               </button>
             ))}
          </motion.div>'''

content = content.replace(old_categories_bottom, '')

# Add pt to the whole section to look nice since we removed big H1
content = content.replace('<section className="bg-white border-b border-border pt-32 pb-12 px-4">', '<section className="bg-white border-b border-border pt-24 pb-8 px-4">')

with open('unimonday-web/src/app/explore/page.tsx', 'w') as f:
    f.write(content)
