import re

with open('unimonday-web/src/app/explore/page.tsx', 'r') as f:
    content = f.read()

# Add more dummy products
new_products = '''
            {/* Item 7 */}
            <Link href="/product/1" className="block">
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Red Sneakers" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Fashion</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">Nike Red Runners</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By Kicks TZ</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 75,000</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            </Link>

            {/* Item 8 */}
            <Link href="/product/1" className="block">
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Laptop" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Tech</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">MacBook Pro M1</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By Mac Dealers</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 2.5M</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            </Link>

            {/* Item 9 */}
            <Link href="/product/1" className="block">
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2064&auto=format&fit=crop" alt="Apple Watch" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Tech</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">Apple Watch Series 7</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By TechZone</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 600,000</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            </Link>

            {/* Item 10 */}
            <Link href="/product/1" className="block">
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop" alt="Denim" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Apparel</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">Vintage Denim</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By Campus Thrift</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 35,000</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            </Link>

          </div>
'''

content = content.replace('</Link>\n\n          </div>', '</Link>\n' + new_products)

with open('unimonday-web/src/app/explore/page.tsx', 'w') as f:
    f.write(content)
