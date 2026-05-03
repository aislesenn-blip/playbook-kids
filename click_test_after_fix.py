from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3003')
    page.wait_for_timeout(2000)

    try:
        # Try clicking on fashion category
        page.click("text='Fashion'", timeout=2000)
        print("Clicked Fashion successfully!")
    except Exception as e:
        print("Failed to click:", e)

    browser.close()
