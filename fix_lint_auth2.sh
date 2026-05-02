sed -i '/toast.error(err.message || "Failed to log in");/d' unimonday-web/src/app/auth/login/page.tsx
sed -i '/toast.error(err.message || "Failed to sign up");/d' unimonday-web/src/app/auth/signup/page.tsx
