from playwright.sync_api import sync_playwright
import time

def verify_flows():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        # 1. Explore Page
        page.goto('http://localhost:3002/explore')
        time.sleep(2)
        page.screenshot(path='explore-revamp.png', full_page=True)

        # 2. Product Checkout Flow
        page.goto('http://localhost:3002/product/1')
        time.sleep(2)
        page.screenshot(path='product-details.png')
        page.click('button:has-text("Order Now")')
        time.sleep(1)
        page.screenshot(path='checkout-modal.png')

        # 3. Chat Flow
        page.goto('http://localhost:3002/chat')
        time.sleep(2)
        page.screenshot(path='chat-flow.png')

        # 4. Orders Details Flow
        page.goto('http://localhost:3002/orders')
        time.sleep(2)
        page.click('button:has-text("View Details")', force=True)
        time.sleep(1)
        page.screenshot(path='order-ticket-modal.png')

        # 5. Services Flow
        page.goto('http://localhost:3002/services')
        time.sleep(2)
        page.screenshot(path='services-page.png')

        browser.close()

if __name__ == '__main__':
    verify_flows()
