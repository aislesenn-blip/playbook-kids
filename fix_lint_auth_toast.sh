sed -i 's/if (err instanceof Error) {/if (err instanceof Error) {\n        toast.error(err.message || "Failed to log in");/g' unimonday-web/src/app/auth/login/page.tsx
sed -i 's/if (err instanceof Error) {/if (err instanceof Error) {\n        toast.error(err.message || "Failed to sign up");/g' unimonday-web/src/app/auth/signup/page.tsx
