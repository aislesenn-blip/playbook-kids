from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    # Let's see what CSS is applied to the bad images. Next.js applies 'position: absolute' to 'fill' images.
    res = page.evaluate('''() => {
        let els = Array.from(document.querySelectorAll('img[data-nimg="fill"]'));
        if (!els.length) return "No fill images";
        let el = els[0];

        let p = el.parentElement;
        let pStyle = window.getComputedStyle(p);

        return {
           hasRelative: p.classList.contains('relative'),
           actualPosition: pStyle.position,
           display: pStyle.display,
           height: pStyle.height
        };
    }''')
    print(res)
    browser.close()
