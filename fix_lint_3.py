with open("unimonday-web/src/app/auth/signup/page.tsx", "r") as f:
    lines = f.readlines()

new_lines = []
for idx, line in enumerate(lines):
    if idx >= 100 and idx <= 109:
        if "}" in line and "placeholder" not in line and "className" not in line:
            continue
    new_lines.append(line)

with open("unimonday-web/src/app/auth/signup/page.tsx", "w") as f:
    f.writelines(new_lines)
