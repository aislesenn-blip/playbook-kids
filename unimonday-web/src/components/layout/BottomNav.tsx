"use client";

import { Home, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();
  const { items } = useCartStore();
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/cart", icon: ShoppingBag, label: "Cart", badge: cartItemsCount },
    { href: "/vendor/dashboard", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/50 pb-safe z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <item.icon className={cn("w-6 h-6", isActive && "stroke-[2.5px]")} />
                {item.badge ? (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
