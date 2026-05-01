-- UNIMONDAY SUPABASE DATABASE SCHEMA

-- 1. Enums
CREATE TYPE user_role AS ENUM ('student', 'vendor');
CREATE TYPE order_status AS ENUM ('new', 'preparing', 'ready', 'completed', 'cancelled');
CREATE TYPE item_category AS ENUM ('Food', 'Stationery', 'Grocery', 'Other');

-- 2. Tables

-- Universities Table
CREATE TABLE universities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    phone_number VARCHAR(20),
    campus_id UUID REFERENCES universities(id) ON DELETE SET NULL, -- for students, primarily
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Stores/Vendors Table
CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    campus_id UUID NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category item_category NOT NULL,
    image_url TEXT,
    is_open BOOLEAN DEFAULT FALSE,
    status_text VARCHAR(100) DEFAULT 'Closed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products/Menu Items Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE RESTRICT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status order_status DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_at_time DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'Snippe.io',
    payment_status VARCHAR(50) DEFAULT 'pending',
    transaction_reference VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tickets Table (15-second live tickets)
CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID UNIQUE NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT FALSE,
    is_claimed BOOLEAN DEFAULT FALSE,
    activated_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- 3. Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Universities: Everyone can read
CREATE POLICY "Universities are viewable by everyone" ON universities
    FOR SELECT USING (true);

-- Users: Users can read and update their own data
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Stores: Everyone can read, owners can update
CREATE POLICY "Stores are viewable by everyone" ON stores
    FOR SELECT USING (true);
CREATE POLICY "Store owners can update their stores" ON stores
    FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Store owners can insert their stores" ON stores
    FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Store owners can delete their stores" ON stores
    FOR DELETE USING (auth.uid() = owner_id);

-- Products: Everyone can read, store owners can modify
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);
CREATE POLICY "Store owners can insert products" ON products
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM stores WHERE stores.id = products.store_id AND stores.owner_id = auth.uid())
    );
CREATE POLICY "Store owners can update products" ON products
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM stores WHERE stores.id = products.store_id AND stores.owner_id = auth.uid())
    );
CREATE POLICY "Store owners can delete products" ON products
    FOR DELETE USING (
        EXISTS (SELECT 1 FROM stores WHERE stores.id = products.store_id AND stores.owner_id = auth.uid())
    );

-- Orders: Customers can view their own orders, store owners can view orders for their store
CREATE POLICY "Customers can view their own orders" ON orders
    FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Store owners can view orders for their store" ON orders
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM stores WHERE stores.id = orders.store_id AND stores.owner_id = auth.uid())
    );
CREATE POLICY "Customers can create orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Store owners can update order status" ON orders
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM stores WHERE stores.id = orders.store_id AND stores.owner_id = auth.uid())
    );

-- Order Items: Viewable by customer or store owner
CREATE POLICY "Customers can view their order items" ON order_items
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.customer_id = auth.uid())
    );
CREATE POLICY "Store owners can view their order items" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders
            JOIN stores ON orders.store_id = stores.id
            WHERE orders.id = order_items.order_id AND stores.owner_id = auth.uid()
        )
    );
CREATE POLICY "Customers can create order items" ON order_items
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.customer_id = auth.uid())
    );

-- Transactions: Customers can view their own transactions, owners can view transactions for their store
CREATE POLICY "Customers can view their own transactions" ON transactions
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM orders WHERE orders.id = transactions.order_id AND orders.customer_id = auth.uid())
    );
CREATE POLICY "Store owners can view transactions for their store" ON transactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders
            JOIN stores ON orders.store_id = stores.id
            WHERE orders.id = transactions.order_id AND stores.owner_id = auth.uid()
        )
    );
CREATE POLICY "Customers can insert transactions" ON transactions
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM orders WHERE orders.id = transactions.order_id AND orders.customer_id = auth.uid())
    );

-- Tickets: Customers can view/update their own tickets, owners can view/update tickets for their store
CREATE POLICY "Customers can view their own tickets" ON tickets
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM orders WHERE orders.id = tickets.order_id AND orders.customer_id = auth.uid())
    );
CREATE POLICY "Store owners can view tickets for their store" ON tickets
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders
            JOIN stores ON orders.store_id = stores.id
            WHERE orders.id = tickets.order_id AND stores.owner_id = auth.uid()
        )
    );
CREATE POLICY "Customers can update their tickets (activate)" ON tickets
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM orders WHERE orders.id = tickets.order_id AND orders.customer_id = auth.uid())
    );
CREATE POLICY "Store owners can update tickets (claim)" ON tickets
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM orders
            JOIN stores ON orders.store_id = stores.id
            WHERE orders.id = tickets.order_id AND stores.owner_id = auth.uid()
        )
    );
CREATE POLICY "Customers can create tickets" ON tickets
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM orders WHERE orders.id = tickets.order_id AND orders.customer_id = auth.uid())
    );
