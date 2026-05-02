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

            # Check explore
            await page.goto('http://localhost:3003/explore', wait_until='networkidle')
            await page.screenshot(path='explore_screenshot.png', full_page=True)
            print("Explore screenshot saved.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

asyncio.run(main())
