#!/bin/bash
sed -i "s/useAppStore.getState().currentUser?.role === 'vendor'/useAppStore.getState().currentUser?.role === 'stationary'/g" unimonday-web/src/app/page.tsx
sed -i 's/\/vendor\/dashboard/\/stationary\/dashboard/g' unimonday-web/src/app/page.tsx
sed -i 's/Store Dashboard/Stationary Dashboard/g' unimonday-web/src/app/page.tsx
