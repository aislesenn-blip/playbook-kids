from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:3000/workspace')
    page.wait_for_selector('button:has-text("Execute Formatting")')

    # Save a screenshot before
    page.screenshot(path='workspace_before.png', full_page=True)

    # Click execute formatting
    page.click('button:has-text("Execute Formatting")')

    # Save a screenshot after
    page.screenshot(path='workspace_after.png', full_page=True)

    browser.close()
