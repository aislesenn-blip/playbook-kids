with open("unimonday-web/src/app/profile/page.tsx", "r") as f:
    content = f.read()

content = content.replace("const { currentUser, resetApp } = useAppStore();", "const { currentUser } = useAppStore();\n  const resetApp = () => {\n    useAppStore.getState().setCurrentUser(null);\n  };")
content = content.replace("currentUser.role === 'vendor'", "currentUser.role === 'stationary'")
content = content.replace("href=\"/vendor/dashboard\"", "href=\"/stationary/dashboard\"")
content = content.replace("Manage your store, products, and incoming orders.", "Manage your print queue and stationary profile.")
content = content.replace("Store Dashboard", "Stationary Dashboard")

content = content.replace("href=\"/orders\"", "href=\"/print-jobs\"")
content = content.replace("Track your campus deliveries and purchases.", "Track your print jobs and download receipts.")
content = content.replace("My Orders", "My Print Jobs")

with open("unimonday-web/src/app/profile/page.tsx", "w") as f:
    f.write(content)
