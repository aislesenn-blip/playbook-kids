sed -i 's/status: string/status: "Pending" | "Paid" | "Processing" | "In Transit" | "Delivered" | "Cancelled"/g' unimonday-web/src/lib/store/app-store.ts
