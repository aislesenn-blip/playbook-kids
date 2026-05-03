from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    # Let's inspect the first img that has 1280x720
    script = '''() => {
        const els = Array.from(document.querySelectorAll('img'));
        const badImg = els.find(el => el.getBoundingClientRect().width === 1280);
        if (!badImg) return "No bad img found";

        // Print out its parents
        let current = badImg;
        const parents = [];
        while (current && current !== document.body) {
            const rect = current.getBoundingClientRect();
            parents.push({
                tag: current.tagName,
                className: current.className,
                position: window.getComputedStyle(current).position,
                rect: `${rect.width}x${rect.height} @ ${rect.x},${rect.y}`
            });
            current = current.parentElement;
        }
        return parents;
    }'''
    res = page.evaluate(script)
    for p in res:
        print(p)

    browser.close()
