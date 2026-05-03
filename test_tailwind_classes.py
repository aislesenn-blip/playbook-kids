from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3003')
    page.wait_for_timeout(2000)

    res = page.evaluate('''() => {
        let testClasses = ['relative', 'absolute', 'flex', 'grid', 'hidden', 'block'];
        let results = {};
        for(let c of testClasses) {
            let el = document.createElement('div');
            el.className = c;
            document.body.appendChild(el);
            let s = window.getComputedStyle(el);
            if (c === 'relative' || c === 'absolute') results[c] = s.position;
            if (c === 'flex' || c === 'grid' || c === 'hidden' || c === 'block') results[c] = s.display;
            el.remove();
        }
        return results;
    }''')
    print("Computed styles on 3003:", res)
    browser.close()
