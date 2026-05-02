sed -i 's|import { CartItem, Product, User } from "@/types"|import { CartItem, Product, User, Order } from "@/types"|g' unimonday-web/src/lib/store/app-store.ts
sed -i "s|import { CartItem, Product, User } from '@/types'|import { CartItem, Product, User, Order } from '@/types'|g" unimonday-web/src/lib/store/app-store.ts
