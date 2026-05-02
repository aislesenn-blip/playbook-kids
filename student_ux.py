new_content = """
"use client";

import Link from "next/link";
import { ArrowLeft, Package, CheckCircle2, AlertOctagon, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function OrderDetailsPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const submitReview = () => {
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    toast.success("Review submitted to moderation engine!");
    setReviewSubmitted(true);
  };

  const openDispute = () => {
    toast.error("Dispute opened. A staff member will review this.");
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Link href="/orders" className="flex items-center gap-2 text-muted-foreground hover:text-gray-900 font-bold mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Orders
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-border shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black">Order ORD-9821</h1>
              <p className="text-muted-foreground font-medium text-sm sm:text-base">Delivered (Mock State)</p>
            </div>
          </div>
          <button onClick={openDispute} className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors self-start sm:self-auto shrink-0">
            <AlertOctagon className="w-4 h-4" /> Open Dispute
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-2xl">
            <h3 className="font-bold mb-2">Item Details</h3>
            <p className="text-gray-600 font-medium">1x Pro Wireless Earbuds</p>
            <p className="text-gray-600 font-medium">Vendor: TechZone UDSM</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <h3 className="font-bold mb-2">Payment Info</h3>
            <p className="text-gray-600 font-medium">Total: Tsh 45,000</p>
            <p className="text-gray-600 font-medium flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Paid via Mobile Money</p>
          </div>
        </div>
      </div>

      {/* Reputation Engine Hook (Student Side) */}
      <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-[2rem] shadow-lg shadow-gray-900/20">
        {!reviewSubmitted ? (
          <div className="text-center">
            <h3 className="text-xl font-black mb-2">Rate your experience</h3>
            <p className="text-gray-400 font-medium text-sm mb-6">Your feedback powers our marketplace.</p>

            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`w-10 h-10 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-600'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>

            <textarea
              placeholder="What did you like about this product/vendor?"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-emerald-500 mb-4 resize-none h-24 font-medium"
            ></textarea>

            <button onClick={submitReview} className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition-colors">
              Submit Review
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
               <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-black mb-2">Review Submitted!</h3>
            <p className="text-gray-400 font-medium text-sm">Thank you for keeping uNiMONDAY safe and high-quality.</p>
          </div>
        )}
      </div>

    </div>
  );
}
"""

with open('unimonday-web/src/app/orders/details/page.tsx', 'w') as f:
    f.write(new_content)
