"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Heart } from "lucide-react";
import HomeNav from "./Mainnav";
interface ShowTime { time: string; format?: string; }
interface Theater { name: string; distance: string; shows: ShowTime[]; }

export default function NarasimhaDetails() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("22 AUG");
  const [showModal, setShowModal] = useState(false);
  const [selectedShow, setSelectedShow] = useState<{ theater: string; time: string } | null>(null);

  const theaters: Theater[] = [
    {
      name: "PVR: Ripples, Vijayawada",
      distance: "4.2 km",
      shows: [{ time: "01:40 PM" }, { time: "07:20 PM" }, { time: "10:50 PM" }],
    },
    {
      name: "Sairam Screens A/C Dolby 7.1 Surround: Vijayawada",
      distance: "1.6 km",
      shows: [
        { time: "02:45 PM", format: "DOLBY 7.1" },
        { time: "06:30 PM", format: "DOLBY 7.1" },
        { time: "09:45 PM", format: "DOLBY 7.1" },
      ],
    },
  ];

  const handleBooking = (theater: string, time: string) => {
    setSelectedShow({ theater, time });

    // Save to sessionStorage for Navbar
    const bookingInfo = {
      movie: "Narasimha",
      theater,
      date: selectedDate,
      time,
      language: "Telugu • 2D",
    };
    sessionStorage.setItem("bookingData", JSON.stringify(bookingInfo));
    
  

    if (theater === "PVR: Ripples, Vijayawada" && time === "01:40 PM") {
      setShowModal(true);
    } else {
      confirmBooking();
    }
  };

  const confirmBooking = () => {
    setShowModal(false);
    router.push("/seats");
  };

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <HomeNav />
      </div>

      {/* Content */}
      <div className="min-h-screen bg-white text-black p-3 pt-20 md:pt-24">
        {/* Movie Title */}
        <div className="ml-2 md:ml-4">
          <h1 className="text-xl md:text-2xl font-bold mb-1">Narasimha</h1>
          <p className="text-gray-600 text-sm md:text-base mb-4">Movie runtime: 2h 49m</p>
        </div>

        {/* Dates */}
        <div className="flex gap-2 mb-4 ml-2 md:ml-4 items-center">
          <div className="flex gap-2 overflow-x-auto">
            {Array.from({ length: 5 }).map((_, idx) => {
              const date = new Date();
              date.setDate(date.getDate() + idx);
              const day = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
              const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
              const dayNum = date.getDate();
              const formattedDate = `${dayNum} ${month}`;

              return (
                <div
                  key={formattedDate}
                  onClick={() => setSelectedDate(formattedDate)}
                  className={`px-3 py-2 rounded-md cursor-pointer text-center min-w-[70px] text-xs md:text-sm ${
                    selectedDate === formattedDate ? "bg-red-600 text-white font-semibold" : "bg-gray-100 text-black"
                  }`}
                >
                  <p className="font-semibold">{day}</p>
                  <p className="text-lg">{dayNum}</p>
                  <p className="text-[10px]">{month}</p>
                </div>
              );
            })}
          </div>
        </div>

        <p className="font-semibold text-sm md:text-base mb-3 ml-2 md:ml-4">Telugu • 2D</p>

        {/* Theaters */}
        <div className="p-4">
          {theaters.map((theater, idx) => (
            <div key={idx} className="flex flex-col gap-2 border-b pb-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3200/3200992.png"
                    alt="theater logo"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 flex items-center gap-1">
                      {theater.name}
                      <Info size={14} className="text-gray-500" />
                    </p>
                    <p className="text-xs text-gray-500">{theater.distance} away</p>
                  </div>
                </div>
                <Heart className="text-gray-500 cursor-pointer hover:text-red-600" />
              </div>

              {/* Showtimes */}
              <div className="flex items-center gap-3 flex-wrap ml-12">
                {theater.shows.map((show, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleBooking(theater.name, show.time)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition ${
                      selectedShow?.theater === theater.name && selectedShow?.time === show.time
                        ? "border-green-600 text-green-600"
                        : "border-gray-400 text-gray-700"
                    }`}
                  >
                    {show.time}
                    {show.format && <span className="block text-[10px] text-gray-500">{show.format}</span>}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 ml-12">Cancellation available</p>
            </div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h2 className="text-lg font-semibold text-red-600 mb-3 animate-pulse">
                  Terms & Conditions
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Tickets once booked cannot be cancelled or refunded. Please confirm before proceeding.
                </p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-md bg-gray-200 text-gray-700">
                    Cancel
                  </button>
                  <button onClick={() => confirmBooking()} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
