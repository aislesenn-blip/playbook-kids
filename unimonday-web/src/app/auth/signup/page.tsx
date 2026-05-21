"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h1 className="text-4xl font-black tracking-tight mb-2">Start your journey.</h1>
        <p className="text-gray-500 mb-8 font-medium">Join the living language universe.</p>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = '/onboarding'; }}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#DDA359] outline-none text-lg"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#DDA359] outline-none text-lg"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#DDA359] outline-none text-lg"
            />
          </div>

          <button className="w-full py-5 bg-[#DDA359] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c99047] transition-all mt-4">
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 font-medium">
          Already have an account? <Link href="/auth/login" className="text-[#DDA359] hover:text-gray-900">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}