from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)

    # Let's see what CSS is applied to the bad images. Next.js applies 'position: absolute' to 'fill' images.
    res = page.evaluate('''() => {
        let els = Array.from(document.querySelectorAll('img[data-nimg="fill"]'));
        return els.map(el => {
           let r = el.getBoundingClientRect();
           return `${r.width}x${r.height} - ${el.className} - ${el.parentElement.className} - parent h: ${el.parentElement.getBoundingClientRect().height}`;
        });
    }''')
    for p in res:
        print(p)

    browser.close()
