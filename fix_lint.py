import re

# Fix dashboard parsing error again
with open("unimonday-web/src/app/vendor/dashboard/page.tsx", "r") as f:
    content = f.read()

# I used literal \n which got evaluated in python string, so I didn't match the actual newline.
content = content.replace("</form>\n               </>", "</form>\n               </>\n             )}")

with open("unimonday-web/src/app/vendor/dashboard/page.tsx", "w") as f:
    f.write(content)
