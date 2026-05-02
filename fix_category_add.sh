#!/bin/bash
for file in src/app/fashion/page.tsx src/app/tech/page.tsx src/app/beauty/page.tsx src/app/home-decor/page.tsx src/app/services/page.tsx; do
  if [ -f "$file" ]; then
    sed -i 's/import { ShoppingBag } from "lucide-react";/import { ShoppingBag } from "lucide-react";\nimport { useAppStore } from "@\/lib\/store\/app-store";\nimport { mockProducts } from "@\/lib\/mockData";\nimport { toast } from "sonner";/g' "$file"

    # Simple replacement for adding the function inside the component
    sed -i '/const products = \[/i \
  const { addToCart } = useAppStore();\
  const handleAddToCart = (e: React.MouseEvent, productId: string) => {\
    e.preventDefault();\
    const product = mockProducts.find(p => p.id === "p1");\n    if (product) {\n      addToCart(product);\n      toast.success("Added to cart");\n    }\n  };\n' "$file"

    sed -i 's/<button className="w-10 h-10 rounded-full/<button onClick={(e) => handleAddToCart(e, "p1")} className="w-10 h-10 rounded-full/g' "$file"
  fi
done
