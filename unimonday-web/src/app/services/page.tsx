"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Star, Truck, Wrench } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      id: 201,
      name: "Screen & Battery Repair",
      price: "From Tsh 25,000",
      rating: 4.8,
      reviews: 156,
      icon: <Wrench className="w-8 h-8" />,
      color: "blue",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 202,
      name: "Campus Food Delivery",
      price: "Tsh 2,000/trip",
      rating: 4.9,
      reviews: 342,
      icon: <Truck className="w-8 h-8" />,
      color: "amber",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 203,
      name: "PC Software Installation",
      price: "Tsh 15,000",
      rating: 4.7,
      reviews: 89,
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "emerald",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 204,
      name: "Custom T-Shirt Printing",
      price: "From Tsh 15,000",
      rating: 4.6,
      reviews: 64,
      icon: <Star className="w-8 h-8" />,
      color: "purple",
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 pt-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
          >
            uNiMONDAY <span className="text-primary">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto"
          >
            Trusted in-house professionals for repairs, delivery, printing, and more.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const isBlue = service.color === "blue";
            const isAmber = service.color === "amber";
            const isEmerald = service.color === "emerald";
            const isPurple = service.color === "purple";

            return (
            <Link href={`/product/${service.id}`} key={service.id} className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2rem] p-6 sm:p-8 border border-border shadow-md group cursor-pointer h-full flex flex-col sm:flex-row gap-6 items-start sm:items-center"
              >
                <div className="relative w-full sm:w-32 h-48 sm:h-32 rounded-2xl overflow-hidden shrink-0">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <div className="flex-1 flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="font-bold text-xl">{service.name}</h3>
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                         ${isBlue ? 'bg-blue-50 text-blue-500' : ''}
                         ${isAmber ? 'bg-amber-50 text-amber-500' : ''}
                         ${isEmerald ? 'bg-emerald-50 text-emerald-500' : ''}
                         ${isPurple ? 'bg-purple-50 text-purple-500' : ''}
                       `}>
                         {service.icon}
                       </div>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium flex items-center gap-2">
                      uNiMONDAY In-House Expert <ShieldCheck className="w-4 h-4 text-primary" />
                    </p>
                  </div>

                  <div className="mt-6 flex items-end justify-between w-full">
                    <div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-amber-500 mb-1">
                        <Star className="w-4 h-4 fill-current" /> {service.rating} <span className="text-gray-400 font-normal">({service.reviews})</span>
                      </div>
                      <span className="font-black text-lg text-gray-900">{service.price}</span>
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-900 font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 text-sm">
                      Book Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Link>
          )})}
        </div>
      </div>
    </div>
  );
}
