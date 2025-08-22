"use client";

import { motion } from "framer-motion";
import AppNavbar from "./Navbar";

export default function HomePage() {
  return (
    <>
      <AppNavbar />
      {/* Fullscreen Background with Centered Content */}
    <div className="w-full h-screen bg-gray-300 overflow-hidden">
      {/* Center Content */}
      <div className="w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black mb-4 max-w-full sm:max-w-2xl"
        >
          ROYALTIX
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-black max-w-md sm:max-w-xl md:max-w-2xl mb-8"
        >
          Decentralized Movie Ticket Booking. Secure, Fast, and Transparent.
        </motion.p>

        {/* Connect Wallet Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <button className="bg-black text-white px-4 py-2 rounded">Booking Now</button>
        </motion.div>
      </div>
    </div>
    </>
  );
}