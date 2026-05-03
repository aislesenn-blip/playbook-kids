wirings = """
# SUPABASE WIRING & ARCHITECTURE REVIEW (KILICHOBAKI / PENDING WIRINGS)

The frontend architecture (mock UI, Zustand state, navigation) is now 100% complete for the **Amazon/Farfetch Concierge Model**. The following is the exhaustive list of Supabase API integrations needed in the next phase to make the application fully functional:

## 1. Authentication (`supabase.auth`)
*   **Sign Up Flow:** Sync the `auth/signup` form to create users. Must insert custom metadata: `role: 'student'`, `region`, `campusName`.
*   **Log In Flow:** Sync `auth/login` to `supabase.auth.signInWithPassword`.
*   **Auth State Listener:** The `<AuthProvider>` currently calls `initAuth()` which listens to `supabase.auth.onAuthStateChange`. This needs to fully override the mock state when a live user logs in.

## 2. Database Schema (Tables Needed)
*   **`users`**: Profile data (id, name, email, region, campus, role).
*   **`products`**: Inventory data (id, name, description, price, category, images, status).
    *   *Hidden Fields for Internal Use:* `supplier_phone`, `supplier_location`.
*   **`stores` / `promo_fronts`**: Data for the storefronts we create for specific partnerships/promo codes (id, name, slug, cover_image, avatar, rating). Products will reference a `store_id`.
*   **`orders`**: Transaction records (id, user_id, items (JSONB), total_price, status (Pending, Processing, Delivered), created_at).
*   **`chat_messages`**: Centralized inbox data (id, user_id, message, is_admin_reply, created_at, attachment_url).

## 3. Storage (`supabase.storage`)
*   **Product Images:** Bucket for internal staff uploading product images via the 'Perfect Crop' tool.
*   **Chat Attachments:** Bucket for students to upload payment proofs (e.g., M-Pesa screenshots) in the chat.

## 4. Realtime Subscriptions (`supabase.channel`)
*   **Inbox/Chat:** The `/chat` page needs a realtime subscription to the `chat_messages` table to show new messages from Staff/Admin instantly without refreshing.
*   **Order Status:** (Optional but recommended) Subscribe to the `orders` table so the student's `/orders` dashboard updates automatically when staff changes an order status from "Pending" to "Processing".

## 5. Security Row Level Policies (RLP)
*   **Students:** Can read all `products` and `stores`. Can insert/read *only* their own `orders` and `chat_messages`.
*   **Staff/Admin:** Can insert/update/delete `products`, `stores`. Can read/update *all* `orders` and `chat_messages`.
"""
with open("unimonday-web/SUPABASE_WIRINGS.md", "w") as f:
    f.write(wirings)
print("Wirings generated")
