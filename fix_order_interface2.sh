sed -i 's/userId: string;/userId?: string;/g' unimonday-web/src/types/index.ts
sed -i 's/vendorId: string;/vendorId?: string;/g' unimonday-web/src/types/index.ts
sed -i 's/items: CartItem\[\];/items?: CartItem\[\];/g' unimonday-web/src/types/index.ts
sed -i 's/totalAmount: number;/totalAmount?: number;/g' unimonday-web/src/types/index.ts
sed -i 's/deliveryFee: number;/deliveryFee?: number;/g' unimonday-web/src/types/index.ts
sed -i 's/createdAt: string;/createdAt?: string;/g' unimonday-web/src/types/index.ts
sed -i 's/updatedAt: string;/updatedAt?: string;/g' unimonday-web/src/types/index.ts
