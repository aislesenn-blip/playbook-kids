#!/bin/bash
sed -i "s/currentUser.role === 'vendor'/currentUser.role === 'stationary'/g" unimonday-web/src/app/profile/page.tsx
sed -i 's/\/vendor\/dashboard/\/stationary\/dashboard/g' unimonday-web/src/app/profile/page.tsx
