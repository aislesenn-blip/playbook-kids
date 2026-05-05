import asyncio
import os
from playwright.async_api import async_playwright

async def main():
    print("Starting Next.js server...")
    server = await asyncio.create_subprocess_shell(
        "cd unimonday-web && npm run dev",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )

    # Wait for server to start
    await asyncio.sleep(5)

    print("Launching browser...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 800})

        print("Navigating to home page...")
        await page.goto("http://localhost:3000")
        await asyncio.sleep(2) # let initial animations settle

        await page.evaluate("""
            () => {
               document.body.style.overflow = 'hidden';
            }
        """)

        await page.screenshot(path="builder_initial2.png", full_page=True)
        print("Captured initial state.")

        await browser.close()

    server.terminate()
    print("Done.")

if __name__ == "__main__":
    asyncio.run(main())
