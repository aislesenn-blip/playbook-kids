import re

with open("unimonday-web/src/app/vendor/dashboard/page.tsx", "r") as f:
    content = f.read()

content = content.replace('setNewProduct({ name: "", price: "", category: "Fashion" });',
                          'setNewProduct({ name: "", price: "", category: "Fashion", supplierPhone: "", supplierLocation: "" });')

with open("unimonday-web/src/app/vendor/dashboard/page.tsx", "w") as f:
    f.write(content)
