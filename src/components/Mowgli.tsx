"use client";
import { useState, useEffect } from "react";
import { Star, Calendar, Clock, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Movies() {
  const [rating] = useState("7.7/10 (192K Votes)");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // ✅ navigation hook

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleBook = () => {
    router.push("/mouglicomponent"); // ✅ redirect to Mouglicomponent.tsx
  };

  const handleRate = () => {
    alert("Rating functionality would be implemented here!");
  };

  const posterUrl =
    "https://i.pinimg.com/736x/b9/22/f2/b922f249d76c26007f14d8cff140ec1e.jpg";

  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col">
      {/* Navbar */}
      <nav className="w-full p-4 bg-transparent fixed top-0 left-0 z-50">
        <h1 className="text-2xl md:text-3xl  text-black tracking-wide">
          Mowgli
        </h1>
      </nav>

      {/* Content */}
      <div className="flex-grow flex items-center justify-center p-4 md:p-8 mt-16">
        <div
          className={`flex flex-col md:flex-row w-full max-w-6xl backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden transition-all duration-700 ${
            isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {/* Poster */}
          <div className="flex justify-center items-start md:w-2/5 p-6 md:p-8">
            <div className="relative w-full max-w-[300px] h-[500px] rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <img
                src={posterUrl}
                alt="Mowgli Poster"
                className="w-full h-full object-cover rounded-xl"
                onLoad={() => setIsLoading(false)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <h2 className="text-xl font-bold">Mowgli</h2>
                  <p className="text-sm">The jungle adventure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center md:w-3/5 p-6 md:p-8 space-y-6 bg-transparent">
            {/* Title */}
            <div
              className={`transition-transform duration-500 ${
                isLoading
                  ? "translate-y-4 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-black">
                Mowgli
              </h1>
              <div className="h-1 w-16 bg-green-600 rounded-full"></div>
            </div>

            {/* Rating */}
            <div
              className={`flex items-center flex-wrap gap-3 transition-transform duration-500 delay-100 ${
                isLoading
                  ? "translate-y-4 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
                <Star className="w-5 h-5 text-yellow-500 mr-2 fill-yellow-500" />
                <span className="font-semibold">{rating}</span>
              </div>
              <button
                onClick={handleRate}
                className="border border-gray-300 px-4 py-2 rounded-lg font-semibold hover:bg-black hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              >
                Rate now
              </button>
            </div>

            {/* Languages */}
            <div
              className={`flex flex-wrap gap-3 transition-transform duration-500 delay-200 ${
                isLoading
                  ? "translate-y-4 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              {["2D", "Tamil", "Kannada", "Telugu", "Hindi"].map(
                (lang, index) => (
                  <span
                    key={lang}
                    className="border border-gray-300 px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-black hover:text-white transition-all duration-300 cursor-default shadow-sm"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {lang}
                  </span>
                )
              )}
            </div>

            {/* Movie details */}
            <div
              className={`transition-transform duration-500 delay-300 ${
                isLoading
                  ? "translate-y-4 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <div className="flex items-center gap-4 mb-3 text-gray-700">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>2h 15m</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span>U/A</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>20 Aug, 2025</span>
                </div>
              </div>
              <p className="text-lg font-medium">Adventure, Family</p>
            </div>

            {/* Book tickets */}
            <div
              className={`pt-4 transition-transform duration-500 delay-400 ${
                isLoading
                  ? "translate-y-4 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <button
                onClick={handleBook}
                className="book-button bg-green-600 text-white w-full py-4 rounded-xl text-lg font-bold uppercase tracking-wide hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                <span className="relative z-10">Book tickets</span>
                <span className="absolute inset-0 bg-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
              </button>
            </div>

            {/* About the movie */}
            <div
              className={`pt-6 transition-transform duration-500 delay-500 ${
                isLoading
                  ? "translate-y-4 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <h2 className="text-2xl font-bold mb-2">About the movie</h2>
              <p className="text-gray-700 leading-relaxed">
                Mowgli is a young boy raised by wolves in the jungles of India.
                Guided by his loyal friends Baloo the bear and Bagheera the
                panther, he learns the ways of the wild. But his greatest
                challenge comes when the fierce tiger Shere Khan returns,
                determined to end Mowgli’s journey. As he struggles between the
                world of humans and animals, Mowgli must discover where he truly
                belongs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      )}
    </div>
  );
}
