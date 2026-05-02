with open('unimonday-web/src/app/globals.css', 'r') as f:
    css = f.read()

css = css.replace('--primary: 160 84% 39%; /* Softer Emerald Green */ /* Unidays Green */', '--primary: 160 84% 39%;')

with open('unimonday-web/src/app/globals.css', 'w') as f:
    f.write(css)
