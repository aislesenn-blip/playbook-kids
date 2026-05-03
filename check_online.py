from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3003')
    res = page.evaluate('navigator.onLine')
    print("navigator.onLine is:", res)
    browser.close()
