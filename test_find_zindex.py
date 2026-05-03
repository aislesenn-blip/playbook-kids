from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    # Click in the middle of top nav (where 'uNiMONDAY' is) and check what receives the click
    res = page.evaluate('''() => {
        let el = document.elementFromPoint(200, 20);
        return el ? {tag: el.tagName, className: el.className} : "None";
    }''')
    print("At (200, 20):", res)

    # Click in the main content area
    res2 = page.evaluate('''() => {
        let el = document.elementFromPoint(200, 400);
        return el ? {tag: el.tagName, className: el.className} : "None";
    }''')
    print("At (200, 400):", res2)

    browser.close()
