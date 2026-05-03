from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # Mocking vendor id "v1" link
    print("Navigating to /store/v1...")
    response = page.goto('http://localhost:3003/store/v1')
    page.wait_for_timeout(2000)

    if response and response.status == 200:
        print("Storefront link (/store/[vendor_id]) loaded successfully with status 200!")

        # Take a screenshot to verify UI
        page.screenshot(path='storefront_test.png')

        # Verify specific elements exist based on instructions
        store_title = page.evaluate('document.querySelector("h1") ? document.querySelector("h1").innerText : "No title"')
        print("Store Title:", store_title)
    else:
        print("Failed to load storefront link.")

    browser.close()
