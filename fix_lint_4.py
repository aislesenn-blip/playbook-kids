with open("unimonday-web/src/app/auth/signup/page.tsx", "r") as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if 'placeholder="e.g. Campus Tech Hub"' in line:
        skip = True
        continue
    if skip and ')}' in line:
        skip = False
        continue
    if skip:
        continue
    new_lines.append(line)

with open("unimonday-web/src/app/auth/signup/page.tsx", "w") as f:
    f.writelines(new_lines)
