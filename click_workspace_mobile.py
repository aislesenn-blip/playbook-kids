from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    # iPhone 13 Pro dimensions
    context = browser.new_context(
        viewport={'width': 390, 'height': 844},
        user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
    )
    page = context.new_page()
    page.goto('http://localhost:3000/workspace')
    page.wait_for_selector('button:has-text("Execute Formatting")')

    # Save a screenshot before
    page.screenshot(path='workspace_mobile.png', full_page=True)

    browser.close()
