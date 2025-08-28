"use client";
import { useState, useEffect } from "react";
import { Star, Calendar, Clock, AlertCircle, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Homenav from "./Homenav";
export default function Narasimha() {
  const [rating] = useState("7.7/10 (192K Votes)");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleBook = () => {
    router.push("/mouglicomponent");
  };

  const handleRate = () => {
    alert("⭐ Rating functionality would be implemented here!");
  };

  const posterUrl =
    "https://i.pinimg.com/736x/21/0f/24/210f24664e5c0b2173f6f3a4bbf47733.jpg";

  // New background image URL
  const bgUrl =
    "";

  return (
    <>
      {/* Navbar */}
      <Homenav />

      {/* Content with Background */}
      <div
        className="flex items-center min-h-screen p-8"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Optional semi-transparent overlay for readability */}
        <div className="absolute inset-0 bg-white/70 z-0"></div>

        <motion.div
          initial={{ x: "-50vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="flex items-center gap-6 max-w-5xl relative z-10"
        >
          {/* Poster */}
          <div className="relative w-64 flex-shrink-0">
            <img
              src={posterUrl}
              alt="Movie Poster"
              className="w-full h-[380px] object-cover rounded-2xl shadow-xl"
              onLoad={() => setIsLoading(false)}
            />
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/60 hover:bg-black/80 p-3 rounded-full transition">
                <Play className="w-6 h-6 text-white" />
              </div>
            </button>
          </div>

          {/* Movie Info */}
          <div className="flex flex-col gap-4 text-black w-64">
            <h1 className="text-3xl md:text-4xl font-bold">Narasimha</h1>

            <div className="flex items-center gap-3 text-sm md:text-base">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>{rating}</span>
              <button
                onClick={handleRate}
                className="border px-2 py-1 rounded hover:bg-black hover:text-white transition text-xs md:text-sm"
              >
                Rate now
              </button>
            </div>

            <div className="flex flex-wrap gap-2 text-xs md:text-sm">
              {["2D", "Tamil", "Kannada", "Telugu", "Hindi"].map((lang) => (
                <span
                  key={lang}
                  className="border border-gray-400/70 px-2 py-0.5 rounded"
                >
                  {lang}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-1 text-gray-800 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> <span>2h 39m</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> <span>A</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> <span>14 Aug, 2025</span>
              </div>
            </div>

            <p className="text-gray-800 text-sm md:text-base">Action</p>

            <button
              onClick={handleBook}
              className="bg-red-600 text-white text-sm md:text-base py-2 px-5 rounded-lg font-bold hover:bg-red-700 transition"
            >
              🎟 Book tickets
            </button>
          </div>
        </motion.div>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="animate-pulse flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-gray-500 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-500 rounded"></div>
          </div>
        </div>
      )}
    </>
  );
}
