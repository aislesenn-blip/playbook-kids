import re

with open('unimonday-web/src/components/layout/TopNav.tsx', 'r') as f:
    content = f.read()

content = content.replace('Shirt, Smartphone, ShieldCheck, Box, Handshake, ShieldAlert, Search, Sparkles, LampDesk, Store, MessageCircle', 'Shirt, Smartphone, ShieldCheck, Box, Handshake, ShieldAlert, Search, Sparkles, LampDesk, Store, MessageCircle, Tractor, Sprout, Wheat, Egg, Wrench')

with open('unimonday-web/src/components/layout/TopNav.tsx', 'w') as f:
    f.write(content)
