from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    # Find where the 'relative' utility class is going wrong
    res = page.evaluate('''() => {
        let el = document.createElement('div');
        el.className = 'relative';
        document.body.appendChild(el);
        let s = window.getComputedStyle(el).position;
        el.remove();
        return s;
    }''')
    print("Computed position for 'relative' class:", res)
    browser.close()
