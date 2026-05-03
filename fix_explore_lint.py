with open("unimonday-web/src/app/explore/page.tsx", "r") as f:
    content = f.read()

content = content.replace("import { Search, SlidersHorizontal, MapPin, Store, Star, ArrowRight, ShoppingBag } from \"lucide-react\";", "import { Search, SlidersHorizontal, MapPin, Store, Star, ArrowRight, ShoppingBag, Truck } from \"lucide-react\";")
content = content.replace("<ShoppingBag className=\"w-2.5 h-2.5\" />", "<Truck className=\"w-2.5 h-2.5\" />")

with open("unimonday-web/src/app/explore/page.tsx", "w") as f:
    f.write(content)
