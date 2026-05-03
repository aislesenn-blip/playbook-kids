from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")
        page.wait_for_load_state('networkidle')

        try:
            page.click("text=Find gifts for Mom", timeout=2000)
            print("Click successful!")
        except Exception as e:
            print(f"Click failed: {e}")

        page.screenshot(path="screenshot_ui.png")
        browser.close()

if __name__ == "__main__":
    run()
