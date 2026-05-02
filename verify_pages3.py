import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        try:
            # Check store
            await page.goto('http://localhost:3003/store/1', wait_until='networkidle')
            await page.screenshot(path='store_screenshot.png', full_page=True)
            print("Store screenshot saved.")

            # Check auth
            await page.goto('http://localhost:3003/auth/login', wait_until='networkidle')
            await page.screenshot(path='login_screenshot.png', full_page=True)
            print("Login screenshot saved.")

            await page.goto('http://localhost:3003/auth/signup', wait_until='networkidle')
            await page.screenshot(path='signup_screenshot.png', full_page=True)
            print("Signup screenshot saved.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

asyncio.run(main())
