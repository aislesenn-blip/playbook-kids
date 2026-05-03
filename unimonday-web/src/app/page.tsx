"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Wrench, ShieldCheck, ArrowRight, Star, Truck } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/lib/store/app-store";
import { mockProducts } from "@/lib/mockData";
import { toast } from "sonner";

export default function Home() {
  const heroScrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useAppStore();

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      toast.success("Added to cart");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (heroScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = heroScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          heroScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          heroScrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);




  return (
    <div className="flex flex-col items-center justify-center w-full overflow-x-hidden selection:bg-primary/20 selection:text-primary">

      {/* Global Trust Prompt */}
      <div className="w-full bg-primary text-white py-3 px-4 text-center font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        Pay AFTER you receive your product and are satisfied with it.
      </div>


      {/* Hero Section - Amazon Style Grid */}
      <div className="w-full bg-[#E3E6E6] flex justify-center">
      <section className="w-full max-w-[1500px] pt-16 sm:pt-24 pb-12 px-4">
        <div ref={heroScrollRef} className="flex overflow-x-auto gap-5 pb-6 snap-x snap-mandatory scroll-smooth">
          {/* Card 1 */}
          <Link href="/fashion" className="shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] snap-start">
            <div className="bg-white p-5 flex flex-col h-[420px] z-10 relative">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-3 line-clamp-2">Find gifts for Mom</h2>
              <div className="relative flex-grow overflow-hidden mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1730389658758-e61f3293b94d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxnaWZ0cyUyMGZvciUyMG1vbXxlbnwwfHx8fDE3Nzc3NDA2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Find gifts for Mom"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline mt-auto font-medium">Shop Fashion</span>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/tech" className="shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] snap-start">
            <div className="bg-white p-5 flex flex-col h-[420px] z-10 relative">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-3 line-clamp-2">Score top PCs &amp; Accessories</h2>
              <div className="relative flex-grow overflow-hidden mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1636914011676-039d36b73765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxwYyUyMHNldHVwJTIwZ2FtaW5nfGVufDB8fHx8MTc3Nzc0MDYyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Score top PCs & Accessories"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline mt-auto font-medium">Shop Tech</span>
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/beauty" className="shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] snap-start">
            <div className="bg-white p-5 flex flex-col h-[420px] z-10 relative">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-3 line-clamp-2">Find gifts for Kids</h2>
              <div className="relative flex-grow overflow-hidden mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxraWRzJTIwdG95c3xlbnwwfHx8fDE3Nzc3NDA2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Find gifts for Kids"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline mt-auto font-medium">Shop Beauty</span>
            </div>
          </Link>

          {/* Card 4 */}
          <Link href="/home-decor" className="shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] snap-start">
            <div className="bg-white p-5 flex flex-col h-[420px] z-10 relative">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-3 line-clamp-2">Study Space Upgrades</h2>
              <div className="relative flex-grow overflow-hidden mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1534004471323-19f1a470c4c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwyfHxyb29tJTIwZGVjb3IlMjBuZW9ufGVufDB8fHx8MTc3NzczNjMyNXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Study Space Upgrades"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline mt-auto font-medium">Shop Decor</span>
            </div>
          </Link>

          {/* Card 5 */}
          <Link href="/services" className="shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] snap-start">
            <div className="bg-white p-5 flex flex-col h-[420px] z-10 relative">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-3 line-clamp-2">Campus Essentials</h2>
              <div className="relative flex-grow overflow-hidden mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1516351464815-9a44f19888c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwZXNzZW50aWFsc3xlbnwwfHx8fDE3Nzc3NDA2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Campus Essentials"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline mt-auto font-medium">Find Pros</span>
            </div>
          </Link>

          {/* Card 6 */}
          <Link href="/fashion" className="shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] snap-start">
            <div className="bg-white p-5 flex flex-col h-[420px] z-10 relative">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-3 line-clamp-2">Fresh Kicks</h2>
              <div className="relative flex-grow overflow-hidden mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=2070&auto=format&fit=crop"
                  alt="Study Space Upgrades"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline mt-auto font-medium">Shop now</span>
            </div>
          </Link>

          {/* Card 7 */}
          <Link href="/explore" className="shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] snap-start">
            <div className="bg-white p-5 flex flex-col h-[420px] z-10 relative">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-3 line-clamp-2">Room Decor</h2>
              <div className="relative flex-grow overflow-hidden mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
                  alt="Room Decor"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline mt-auto font-medium">Shop now</span>
            </div>
          </Link>

          {/* Card 8 */}
          <Link href="/explore" className="shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] snap-start">
            <div className="bg-white p-5 flex flex-col h-[420px] z-10 relative">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-3 line-clamp-2">Dorm Essentials</h2>
              <div className="relative flex-grow overflow-hidden mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=2077&auto=format&fit=crop"
                  alt="Dorm Essentials"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline mt-auto font-medium">Shop now</span>
            </div>
          </Link>

          {/* Card 9 */}
          <Link href="/explore" className="shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] snap-start">
            <div className="bg-white p-5 flex flex-col h-[420px] z-10 relative">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-3 line-clamp-2">Top Beauty Picks</h2>
              <div className="relative flex-grow overflow-hidden mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  alt="Beauty Picks"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline mt-auto font-medium">Shop now</span>
            </div>
          </Link>

          {/* Card 10 */}
          <Link href="/explore" className="shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] snap-start">
            <div className="bg-white p-5 flex flex-col h-[420px] z-10 relative">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-3 line-clamp-2">Healthy Snacks</h2>
              <div className="relative flex-grow overflow-hidden mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=2070&auto=format&fit=crop"
                  alt="Healthy Snacks"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline mt-auto font-medium">Shop now</span>
            </div>
          </Link>

          {/* Card 11 */}
          <Link href="/explore" className="shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] snap-start">
            <div className="bg-white p-5 flex flex-col h-[420px] z-10 relative">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-3 line-clamp-2">Stationery Haul</h2>
              <div className="relative flex-grow overflow-hidden mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop"
                  alt="Stationery Haul"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline mt-auto font-medium">Shop now</span>
            </div>
          </Link>
        </div>
      </section>
      </div>

      {/* Featured Products */}
      <section className="w-full max-w-7xl mx-auto px-4 pt-16 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Featured Products</h2>
          <Link href="/explore" className="text-primary font-bold hover:underline flex items-center gap-1">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Product Card 1 */}
          <Link href="/product/p1" className="block">
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-md group cursor-pointer h-full flex flex-col">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwyfHxjbG90aGluZyUyMHN0cmVldHdlYXJ8ZW58MHx8fHwxNzc3NzM2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Vintage Jacket"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg line-clamp-2">Vintage Denim Jacket</h3>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">Tsh 35,000</span>
                <p className="text-muted-foreground text-sm mb-4">By Campus Thrift</p>
              </div>
              <button onClick={(e) => handleAddToCart(e, "p1")} className="w-full bg-gray-100 hover:bg-primary hover:text-white text-gray-900 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-auto">
                <ShoppingBag className="w-4 h-4" /> Order Now
              </button>
            </div>
          </motion.div>
          </Link>

          {/* Product Card 2 */}
          <Link href="/product/p2" className="block">
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-md group cursor-pointer h-full flex flex-col">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwyfHxoZWFkcGhvbmVzfGVufDB8fHx8MTc3NzczNjMyNHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Wireless Earbuds"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg line-clamp-2">Pro Wireless Earbuds</h3>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">Tsh 45,000</span>
                <p className="text-muted-foreground text-sm mb-4">By TechZone UDSM</p>
              </div>
              <button onClick={(e) => handleAddToCart(e, "p2")} className="w-full bg-gray-100 hover:bg-primary hover:text-white text-gray-900 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-auto">
                <ShoppingBag className="w-4 h-4" /> Order Now
              </button>
            </div>
          </motion.div>
          </Link>

          {/* Product Card 3 */}
          <Link href="/product/p3" className="block">
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-md group cursor-pointer h-full flex flex-col">
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1542239898-08fcea4abd2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwzfHxjbG90aGluZyUyMHN0cmVldHdlYXJ8ZW58MHx8fHwxNzc3NzM2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Classic Sneakers"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg line-clamp-2">Classic Urban Sneakers</h3>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">Tsh 55,000</span>
                <p className="text-muted-foreground text-sm mb-4">By Kicks TZ</p>
              </div>
              <button onClick={(e) => handleAddToCart(e, "p3")} className="w-full bg-gray-100 hover:bg-primary hover:text-white text-gray-900 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-auto">
                <ShoppingBag className="w-4 h-4" /> Order Now
              </button>
            </div>
          </motion.div>
          </Link>

          {/* Product Card 4 (Added to complete grid of 4) */}
          <Link href="/product/p4" className="block">
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-md group cursor-pointer h-full flex flex-col">
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=2000&auto=format&fit=crop"
                alt="Matte Lipstick"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg line-clamp-2">Matte Lipstick Set</h3>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">Tsh 25,000</span>
                <p className="text-muted-foreground text-sm mb-4">By Campus Cosmetics</p>
              </div>
              <button onClick={(e) => handleAddToCart(e, "p1")} className="w-full bg-gray-100 hover:bg-primary hover:text-white text-gray-900 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-auto">
                <ShoppingBag className="w-4 h-4" /> Order Now
              </button>
            </div>
          </motion.div>
          </Link>
        </div>
      </section>

      {/* Verified Services Section */}
      <section className="pb-24 max-w-6xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Verified Services</h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Vetted professionals for your campus needs. Safe, reliable, and affordable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col p-10 rounded-[3rem] bg-white border border-border/50 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Wrench className="w-32 h-32" />
            </div>
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-blue-100">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10">Phone Repair</h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-lg relative z-10 mb-6">
              Cracked screen? Battery issues? Get it fixed by a verified technician right on campus.
            </p>
            <Link href="/services" className="mt-auto flex items-center gap-2 text-blue-500 font-bold hover:underline">
               Find a Technician <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col p-10 rounded-[3rem] bg-white border border-border/50 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Truck className="w-32 h-32" />
            </div>
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-amber-100">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10">Campus Delivery</h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-lg relative z-10 mb-6">
              Get your food or packages delivered straight to your hostel with our trusted network.
            </p>
            <Link href="/services" className="mt-auto flex items-center gap-2 text-amber-500 font-bold hover:underline">
               Book Delivery <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col p-10 rounded-[3rem] bg-white border border-border/50 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Star className="w-32 h-32" />
            </div>
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-primary/20">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10">PC Maintenance</h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-lg relative z-10 mb-6">
              Software installation, virus removal, or hardware upgrades. Handled by pros.
            </p>
            <Link href="/services" className="mt-auto flex items-center gap-2 text-primary font-bold hover:underline">
               Find a Pro <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Vendor CTA Section */}
      <section className="w-full bg-primary text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-6">Want to become a Vendor?</h2>
          <p className="text-lg sm:text-xl font-medium mb-10 text-primary-foreground/90 max-w-2xl mx-auto">
            Partner with us to reach thousands of students on campus. Open your digital storefront today and start selling.
          </p>
          {useAppStore.getState().currentUser?.role === 'vendor' ? (
            <Link href="/vendor/dashboard" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg hover:scale-105 transform duration-200">
              Go to Store Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href="/vendor/apply" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg hover:scale-105 transform duration-200">
              Partner With Us <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>

    </div>
  );
}
