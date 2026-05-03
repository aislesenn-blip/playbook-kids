from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    # Dump the offline banner component's exact DOM
    res = page.evaluate('''() => {
        let el = document.querySelector('body > div');
        let html = "";
        if (el) html = el.innerHTML;
        return html.substring(0, 500);
    }''')
    print("Body first div:", res)

    # Are there any empty divs covering the screen?
    res2 = page.evaluate('''() => {
        return Array.from(document.querySelectorAll('div')).filter(d => {
            let s = window.getComputedStyle(d);
            let r = d.getBoundingClientRect();
            return (s.position === 'fixed' || s.position === 'absolute')
                && r.width > 500 && r.height > 500
                && s.pointerEvents !== 'none';
        }).map(d => ({c: d.className, r: d.getBoundingClientRect().width + 'x' + d.getBoundingClientRect().height}));
    }''')
    print("Large fixed/absolute divs with pointer-events:", res2)

    browser.close()
