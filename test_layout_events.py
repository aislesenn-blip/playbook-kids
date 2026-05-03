from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    overlays = page.evaluate('''() => {
        const els = Array.from(document.querySelectorAll('*'));
        return els.filter(el => {
            const style = window.getComputedStyle(el);
            return style.position === 'fixed' || style.position === 'absolute';
        }).map(el => {
            const rect = el.getBoundingClientRect();
            return {
                tag: el.tagName,
                classes: el.className,
                z: window.getComputedStyle(el).zIndex,
                pointer: window.getComputedStyle(el).pointerEvents,
                rect: {x: rect.x, y: rect.y, w: rect.width, h: rect.height}
            }
        });
    }''')
    for o in overlays:
        if o['rect']['w'] > 100 and o['rect']['h'] > 100:
            print(o)

    browser.close()
