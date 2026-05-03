import re
with open("unimonday-web/src/app/vendor/apply/page.tsx", "r") as f:
    content = f.read()

# Replace the state initialization
content = re.sub(
    r"const \[formData, setFormData\] = useState\(\{[^}]*\}\);",
    """const [formData, setFormData] = useState({
    ownerName: "",
    phoneNumber: "",
    businessName: "",
    category: "",
    region: "Dar es Salaam",
  });""",
    content
)

# Replace the handleApply function
content = re.sub(
    r"const handleApply = async \(e: React\.FormEvent\) => \{[\s\S]*?^  \};",
    """const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!formData.businessName.trim() || !formData.category || !formData.ownerName.trim()) {
        toast.error("Please fill in all details");
        return;
    }

    setIsLoading(true);

    // Simulate sending data to admin
    setTimeout(() => {
      toast.success("Application received! Our team will contact you shortly.");
      router.push("/");
      setIsLoading(false);
    }, 1500);
  };""",
    content,
    flags=re.MULTILINE
)

# Replace the form inputs
content = re.sub(
    r"<div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">[\s\S]*?<div className=\"pt-4\">",
    """<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Full Name</label>
              <input type="text" required value={formData.ownerName} onChange={(e) => setFormData({...formData, ownerName: e.target.value})} placeholder="Your Name" className="w-full p-4 bg-gray-50 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Phone Number</label>
              <input type="tel" required value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} placeholder="07XX XXX XXX" className="w-full p-4 bg-gray-50 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Business/Store Name</label>
            <input type="text" required value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})} placeholder="e.g. Kicks TZ" className="w-full p-4 bg-gray-50 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Category</label>
              <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all appearance-none">
                <option value="" disabled>Select primary category</option>
                <option value="Fashion & Apparels">Fashion & Apparels</option>
                <option value="Tech & Accessories">Tech & Accessories</option>
                <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                <option value="Home & Decor">Home & Decor</option>
                <option value="Services">Services</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Region (Mkoa)</label>
              <select required value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all appearance-none">
                <option value="Dar es Salaam">Dar es Salaam</option>
                <option value="Dodoma">Dodoma</option>
                <option value="Mwanza">Mwanza</option>
                <option value="Arusha">Arusha</option>
                <option value="Mbeya">Mbeya</option>
                <option value="Morogoro">Morogoro</option>
              </select>
            </div>
          </div>

          <div className="pt-4">""",
    content
)

# Replace some imports that are no longer needed
content = content.replace("import { supabase } from \"@/lib/supabase/client\";\n", "")
content = content.replace("import { useAppStore } from \"@/lib/store/app-store\";\n", "")
content = content.replace("const { setUser, setLocation } = useAppStore();\n", "")


with open("unimonday-web/src/app/vendor/apply/page.tsx", "w") as f:
    f.write(content)
