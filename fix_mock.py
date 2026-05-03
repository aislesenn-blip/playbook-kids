with open("unimonday-web/src/lib/mockData.ts", "r") as f:
    content = f.read()

import re

# Add region and nationwideDelivery to all mock products
content = re.sub(r"vendorName: '([^']+)',", r"vendorName: '\1',\n    region: 'Dar es Salaam',\n    nationwideDelivery: true,", content)

with open("unimonday-web/src/lib/mockData.ts", "w") as f:
    f.write(content)
