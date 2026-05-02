#!/bin/bash
for file in src/app/page.tsx src/app/explore/page.tsx src/app/fashion/page.tsx src/app/tech/page.tsx src/app/beauty/page.tsx src/app/home-decor/page.tsx src/app/store/\[vendor_id\]/page.tsx; do
  if [ -f "$file" ]; then
    sed -i 's/e.preventDefault();/e.preventDefault();\n    e.stopPropagation();/g' "$file"
  fi
done
