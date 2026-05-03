from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    # Try finding out what is on top of the 'Fashion' link
    element_on_top = page.evaluate('''() => {
        const link = document.evaluate("//a[contains(., 'Fashion')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!link) return 'Link not found';
        const rect = link.getBoundingClientRect();
        const el = document.elementFromPoint(rect.x + rect.width/2, rect.y + rect.height/2);
        return el ? {tag: el.tagName, className: el.className} : 'Nothing';
    }''')
    print("Element covering the 'Fashion' link:", element_on_top)

    browser.close()
