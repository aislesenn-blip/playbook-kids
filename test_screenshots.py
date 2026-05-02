from playwright.sync_api import sync_playwright
import time

def take_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Test Explore
        page.goto('http://localhost:3005/explore')
        time.sleep(10)
        page.screenshot(path='explore_amazon_nav.png', full_page=True)

        browser.close()

take_screenshots()
