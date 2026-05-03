content = """"use client";

import { useState } from "react";
import { Handshake, Store, Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PartnerApplyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    category: "Fashion & Apparels",
    contactName: "",
    phone: "",
    email: "",
    location: "Dar es Salaam",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Partnership Request Submitted! Our team will contact you shortly.");
      router.push("/");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Handshake className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight text-gray-900">Partner With Us</h1>
        <p className="text-lg text-muted-foreground font-medium max-w-xl mx-auto">
          Do you have great products or exclusive student discounts? Tell us about your business, and let's get your products in front of thousands of students across Tanzania.
        </p>
      </div>

      <div className="bg-white rounded-[2rem] border border-border shadow-sm p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Business/Store Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Store className="h-5 w-5 text-gray-400" />
                </div>
                <input required type="text" value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all" placeholder="e.g. Kicks TZ" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Product Category</label>
              <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all appearance-none">
                <option value="Fashion & Apparels">Fashion & Apparels</option>
                <option value="Tech & Accessories">Tech & Accessories</option>
                <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                <option value="Home & Decor">Home & Decor</option>
                <option value="Services">Services (Repairs, etc.)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Contact Person Name</label>
              <input required type="text" value={formData.contactName} onChange={(e) => setFormData({...formData, contactName: e.target.value})} className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all" placeholder="John Doe" />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all" placeholder="07XX XXX XXX" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all" placeholder="hello@store.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Region</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all appearance-none">
                  <option value="Dar es Salaam">Dar es Salaam</option>
                  <option value="Arusha">Arusha</option>
                  <option value="Mwanza">Mwanza</option>
                  <option value="Dodoma">Dodoma</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">What kind of products/deals do you offer?</label>
            <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all min-h-[120px]" placeholder="Tell us more about your business and why students would love it..."></textarea>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-70">
            {isSubmitting ? "Submitting..." : "Submit Partnership Request"} <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
"""

with open("unimonday-web/src/app/vendor/apply/page.tsx", "w") as f:
    f.write(content)
