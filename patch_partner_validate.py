with open("unimonday-web/src/app/vendor/apply/page.tsx", "r") as f:
    if "PartnerApplyPage" in f.read():
        print("Partner apply patched")
