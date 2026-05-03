from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    # Let's inspect the first img that has 1280x720 and check why it is that large
    script = '''() => {
        const els = Array.from(document.querySelectorAll('img'));
        const badImg = els.find(el => el.getBoundingClientRect().width === 1280);
        if (!badImg) return "No bad img found";

        let p = badImg.parentElement;
        return {
           parentTag: p.tagName,
           parentClass: p.className,
           parentRect: `${p.getBoundingClientRect().width}x${p.getBoundingClientRect().height}`,
           parentComputedPos: window.getComputedStyle(p).position,
           imgRect: `${badImg.getBoundingClientRect().width}x${badImg.getBoundingClientRect().height}`,
           imgComputedPos: window.getComputedStyle(badImg).position
        }
    }'''
    res = page.evaluate(script)
    print("Bad Image Analysis:", res)

    browser.close()
