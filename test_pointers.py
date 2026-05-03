from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    # Evaluate z-index and overlays
    overlays = page.evaluate('''() => {
        const els = document.querySelectorAll('*');
        return Array.from(els).filter(el => {
            const style = window.getComputedStyle(el);
            return (style.position === 'fixed' || style.position === 'absolute')
                   && parseInt(style.zIndex) > 10
                   && style.display !== 'none'
                   && style.visibility !== 'hidden'
                   && el.getBoundingClientRect().width > 0;
        }).map(el => ({tag: el.tagName, className: el.className, zIndex: window.getComputedStyle(el).zIndex, id: el.id}));
    }''')
    print("Fixed/Absolute Elements with high z-index:", overlays)
    browser.close()
