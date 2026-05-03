from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    # Check what is intercepting clicks on the entire page
    bounding_box = page.locator('body').bounding_box()
    el = page.evaluate('''() => {
        const el = document.elementFromPoint(100, 20); // click in topnav
        return el ? {tag: el.tagName, className: el.className} : 'Nothing';
    }''')
    print("Element at topnav (100, 20):", el)

    browser.close()
