import urllib.request
import json
import os

ACCESS_KEY = "GFRGVmxF64zpxZL22-o3BaVyGxphiGAwXLMfQxLCC2U"

queries = [
    "gifts for mom", "kids toys", "pc setup gaming", "college essentials", "healthy organic snacks", "stationery haul"
]

results = {}

for q in queries:
    url = f"https://api.unsplash.com/search/photos?page=1&query={urllib.parse.quote(q)}&client_id={ACCESS_KEY}&per_page=1"
    req = urllib.request.Request(url)
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if data['results']:
                results[q] = data['results'][0]['urls']['regular']
    except Exception as e:
        print(f"Error fetching {q}: {e}")

print(json.dumps(results, indent=2))
