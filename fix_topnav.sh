#!/bin/bash
sed -i 's/isVendor/isStationary/g' unimonday-web/src/components/layout/TopNav.tsx
sed -i "s/currentUser?.role === \"vendor\"/currentUser?.role === \"stationary\"/g" unimonday-web/src/components/layout/TopNav.tsx
sed -i 's/\/vendor\/dashboard/\/stationary\/dashboard/g' unimonday-web/src/components/layout/TopNav.tsx
