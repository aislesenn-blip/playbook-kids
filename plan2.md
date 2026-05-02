1. **Fix the TopNav Login Button clipping issue**:
   - Looking at the user's image, the "Sign In" button is cut off at the bottom. The image shows the mobile menu (`isMobileMenuOpen`). The button is pushed down, possibly because `max-h-[calc(100vh-3.5rem)]` is clipping the bottom element. Wait, `overflow-y-auto` should handle scrolling. But `pb-8` is set on the container. We can adjust the padding or ensure the container doesn't overflow improperly. Let's increase padding at the bottom of the scrollable container (`pb-24`) to make sure the login button is easily accessible.

2. **Fix `orders/page.tsx` static data issue (Orders Storage kwenye Zustand)**:
   - I need to update `lib/store/app-store.ts` to add an `orders` array, and an `addOrder` function.
   - When a user checks out in `checkout/page.tsx`, we generate an order object (with id, items, total, status="Pending", vendor, etc.) and push it to Zustand.
   - `orders/page.tsx` will read from this Zustand state (`currentUser`'s orders) instead of the hardcoded `activeOrders` and `pastOrders`.

3. **Pre-commit Checks**: Run pre commit script.

4. **Submit**.
