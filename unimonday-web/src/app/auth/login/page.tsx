"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-8 left-8 text-2xl font-black tracking-tighter">
        <span className="text-white bg-[#DDA359] px-2 py-1 rounded-lg mr-1">u</span>NiMONDAY
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h1 className="text-4xl font-black tracking-tight mb-2">Welcome back.</h1>
        <p className="text-gray-500 mb-8 font-medium">Log in to continue your journey.</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
              placeholder="Password"
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#DDA359] outline-none text-lg"
            />
          </div>

          <button className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-bold text-xl hover:bg-black transition-all mt-4">
            Log In
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 font-medium">
          Don&apos;t have an account? <Link href="/auth/signup" className="text-[#DDA359] hover:text-gray-900">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}