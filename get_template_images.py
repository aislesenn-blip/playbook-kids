import requests
import json

client_id = "GFRGVmxF64zpxZL22-o3BaVyGxphiGAwXLMfQxLCC2U"

queries = ["assignment paper", "leave letter paper", "class timetable schedule", "curriculum vitae resume", "certificate diploma"]

urls = []
for q in queries:
    res = requests.get(f"https://api.unsplash.com/search/photos?query={q}&per_page=1&client_id={client_id}")
    data = res.json()
    if data['results']:
        urls.append(data['results'][0]['urls']['regular'])
    else:
        urls.append("none")

print(json.dumps(urls, indent=2))
