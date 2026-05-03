from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    res = page.evaluate('''() => {
        let el = document.elementFromPoint(200, 20);
        if (!el) return "None";
        let rect = el.getBoundingClientRect();

        let parents = [];
        let cur = el;
        while(cur) {
             parents.push({
                tag: cur.tagName,
                c: cur.className,
                id: cur.id,
                z: window.getComputedStyle(cur).zIndex,
                pos: window.getComputedStyle(cur).position,
                rect: `${cur.getBoundingClientRect().width}x${cur.getBoundingClientRect().height}`
             });
             cur = cur.parentElement;
        }
        return parents;
    }''')
    for p in res:
        print(p)

    browser.close()
