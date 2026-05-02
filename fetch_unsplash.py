import urllib.request
import json
import os

ACCESS_KEY = "GFRGVmxF64zpxZL22-o3BaVyGxphiGAwXLMfQxLCC2U"

queries = [
    "clothing streetwear", "fashion model", "headphones", "smartphone",
    "skincare", "makeup cosmetics", "room decor neon", "dorm room",
    "mechanic phone repair", "laptop repair", "college backpack", "healthy snacks"
]

results = {}

for q in queries:
    url = f"https://api.unsplash.com/search/photos?page=1&query={urllib.parse.quote(q)}&client_id={ACCESS_KEY}&per_page=3"
    req = urllib.request.Request(url)
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if data['results']:
                results[q] = [img['urls']['regular'] for img in data['results']]
    except Exception as e:
        print(f"Error fetching {q}: {e}")

print(json.dumps(results, indent=2))
