# uNiMONDAY - The Operating System for Campus Commerce

uNiMONDAY is a high-end, ultra-fast transaction layer for university campuses. It allows students to order food and stationary from their phones, pay instantly using local mobile money, and pick up their items without waiting in line.

## Key Features
- **Hyper-Local Discovery**: Automatically detects if a user is at UDSM, UDOM, etc., using geolocation.
- **Anti-Screenshot Tickets**: Features a 15-second dynamic ticket that changes colors and counts down to prevent fraud.
- **Instant Checkout**: Integrates with Snippe.io for seamless mobile money payments.
- **Billion-Dollar Aesthetics**: Built with Next.js, Tailwind v4, and Framer Motion for fluid, Bolt/TikTok-like navigations.

## Environment Variables & Deployment (Vercel)

When deploying this project to Vercel, you need to set up the following environment variables:

1. **Supabase (Database & Auth)**
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
   *You can get these from your Supabase Project Settings -> API.*

2. **Snippe.io (Payments)**
   - `SNIPPE_API_KEY`: Your secret API key from Snippe.io.
   - `NEXT_PUBLIC_SNIPPE_CLIENT_ID`: Your public client ID for frontend integrations if required by Snippe.

3. **Unsplash (Optional - for dynamic imagery if implemented server-side)**
   - `UNSPLASH_ACCESS_KEY`: Your Unsplash API key.

To set these in Vercel:
1. Go to your Vercel Dashboard -> Project -> Settings -> Environment Variables.
2. Add the keys and values.
3. Redeploy your application.
