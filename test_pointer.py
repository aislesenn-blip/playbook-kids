from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    # Check if there is ANY fixed overlay globally blocking.
    body_events = page.evaluate('''() => {
       const style = window.getComputedStyle(document.body);
       return style.pointerEvents;
    }''')
    print("Body pointer events:", body_events)

    browser.close()
