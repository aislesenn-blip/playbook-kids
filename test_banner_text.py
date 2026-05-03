from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3003')
    page.wait_for_timeout(2000)

    res = page.evaluate('''() => {
        let el = document.querySelector('.z-\\\\[100\\\\]');
        return el ? el.innerText : "No banner found";
    }''')
    print("Banner text:", res)

    browser.close()
