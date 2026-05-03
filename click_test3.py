from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    try:
        page.evaluate("document.querySelector('a[href=\"/explore\"]').click()")
        print("Clicked /explore via evaluate")
    except Exception as e:
        print("Could not evaluate click", e)

    page.wait_for_timeout(2000)
    print("URL:", page.url)

    try:
        # Try finding out what is on top of the 'Fashion' link
        element_on_top = page.evaluate('''() => {
            const link = document.querySelector('a[href="/fashion"]');
            if (!link) return 'Link not found';
            const rect = link.getBoundingClientRect();
            const el = document.elementFromPoint(rect.x + rect.width/2, rect.y + rect.height/2);
            return el ? {tag: el.tagName, className: el.className} : 'Nothing';
        }''')
        print("Element covering the 'Fashion' link:", element_on_top)
    except Exception as e:
        print("Err", e)

    browser.close()
