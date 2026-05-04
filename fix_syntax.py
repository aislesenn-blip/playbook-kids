import re

filepath = "unimonday-web/src/app/workspace/page.tsx"

with open(filepath, "r") as f:
    content = f.read()

content = content.replace(
'''                    </div>
            </div>

            </form>
        </div>''',
'''                    </div>
            </form>
        </div>'''
)

with open(filepath, "w") as f:
    f.write(content)

print("Patch applied")
