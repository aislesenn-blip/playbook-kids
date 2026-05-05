import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Fix the extra div syntax error
content = content.replace("          </div>\n\n          </div>\n\n        </div>\n      </div>\n\n    </div>\n  );\n}", "          </div>\n\n        </div>\n      </div>\n\n    </div>\n  );\n}")

with open("src/app/page.tsx", "w") as f:
    f.write(content)
