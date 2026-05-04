#!/bin/bash
sed -i "s/currentUser?.role === 'vendor'/currentUser?.role === 'stationary'/g" unimonday-web/src/app/chat/page.tsx
sed -i 's/mockVendors/stationaryPartners/g' unimonday-web/src/app/chat/page.tsx
sed -i "s/mockProducts/documentTemplates/g" unimonday-web/src/app/page.tsx
