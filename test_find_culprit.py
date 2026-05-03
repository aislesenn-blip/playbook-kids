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
        return badImg ? {
           html: badImg.outerHTML,
           nextImageStyle: badImg.getAttribute('style')
        } : "None";
    }'''
    print(page.evaluate(script))

    browser.close()
