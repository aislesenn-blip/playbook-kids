from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    # Check what is intercepting clicks on the entire page
    overlays = page.evaluate('''() => {
        const els = Array.from(document.querySelectorAll('*'));
        return els.filter(el => {
            const z = parseInt(window.getComputedStyle(el).zIndex);
            return !isNaN(z) && z > 10 && el.getBoundingClientRect().width > 0;
        }).map(el => {
            const rect = el.getBoundingClientRect();
            return {
                tag: el.tagName,
                classes: el.className,
                z: window.getComputedStyle(el).zIndex,
                rect: {x: rect.x, y: rect.y, w: rect.width, h: rect.height}
            }
        });
    }''')
    for o in overlays:
        print(o)

    browser.close()
