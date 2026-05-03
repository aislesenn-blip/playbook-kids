import re

with open("unimonday-web/src/app/vendor/dashboard/page.tsx", "r") as f:
    content = f.read()

# Make sure supplier fields exist in state
content = content.replace("const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Fashion & Apparels' });",
                          "const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Fashion & Apparels', supplierPhone: '', supplierLocation: '' });")

content = content.replace("setNewProduct({ name: '', price: '', category: 'Fashion & Apparels' });",
                          "setNewProduct({ name: '', price: '', category: 'Fashion & Apparels', supplierPhone: '', supplierLocation: '' });")

# Change text to reflect 1st Party internal tool
content = content.replace('Welcome back, Kicks TZ', 'Welcome back, uNiMONDAY Inventory Admin')
content = content.replace('Vendor Dashboard', 'Internal Inventory Dashboard')


# Add Supplier input fields inside the Add Product Modal
supplier_fields = """
                <div className="grid grid-cols-2 gap-4 mt-4 border-t border-border pt-4">
                  <div className="col-span-2">
                    <span className="text-xs font-black text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">Internal Use Only (Not visible to users)</span>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Supplier Phone</label>
                    <input required type="text" value={newProduct.supplierPhone} onChange={e => setNewProduct({...newProduct, supplierPhone: e.target.value})} className="w-full border border-border bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="07XX XXX XXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Supplier Location</label>
                    <input required type="text" value={newProduct.supplierLocation} onChange={e => setNewProduct({...newProduct, supplierLocation: e.target.value})} className="w-full border border-border bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Kariakoo, Mtaa wa Congo" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 mt-4 shadow-lg shadow-primary/20">Publish Product</button>
"""

content = re.sub(
    r'<button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 mt-4 shadow-lg shadow-primary/20">Publish Product</button>',
    supplier_fields,
    content
)

with open("unimonday-web/src/app/vendor/dashboard/page.tsx", "w") as f:
    f.write(content)
