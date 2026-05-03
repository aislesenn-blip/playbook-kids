import re

with open("unimonday-web/src/app/vendor/dashboard/page.tsx", "r") as f:
    content = f.read()

# Replace exactly how it is formatted
content = content.replace('const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "Fashion & Apparels" });',
                          'const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "Fashion & Apparels", supplierPhone: "", supplierLocation: "" });')

with open("unimonday-web/src/app/vendor/dashboard/page.tsx", "w") as f:
    f.write(content)
