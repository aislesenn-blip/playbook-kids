from playwright.sync_api import sync_playwright
import time

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})

        print("Navigating to local server...")
        page.goto("http://localhost:3000")
        time.sleep(3) # Wait for typewriter and background code to render

        print("Saving initial state screenshot...")
        page.screenshot(path="initial_state.png")

        print("Typing a prompt...")
        # Since the typewriter effect controls placeholder, we type into the textarea
        page.fill("textarea", "A brand new social network for pets")
        time.sleep(1)

        print("Submitting the prompt...")
        page.keyboard.press("Enter")

        print("Waiting for the 'building' state dopamine hits...")
        time.sleep(2) # Wait to capture floating UI tables and code windows
        page.screenshot(path="building_state.png")

        print("Waiting for generated state...")
        time.sleep(10) # Takes a bit of time to reach generated step
        page.screenshot(path="generated_state.png")

        browser.close()

if __name__ == "__main__":
    verify_ui()
