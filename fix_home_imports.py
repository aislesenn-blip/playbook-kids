with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

content = content.replace("import { ShoppingBag, Wrench, ShieldCheck, ArrowRight, Star, Truck } from \"lucide-react\";", "import { ShoppingBag, Wrench, ShieldCheck, ArrowRight, Star, Truck, MapPin } from \"lucide-react\";")

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
