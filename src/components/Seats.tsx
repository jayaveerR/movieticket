"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbarmovie from "./Navbarmovie";


// ================= SECTION DATA =================
interface Section {
  name: string;
  apt: number;
  rows: string[];
  seatsPerRow: number;
}

const sections: Section[] = [
  { name: "Premium BALCONY", apt: 0.2, rows: ["A", "B", "C"], seatsPerRow: 18 },
  { name: "Premium SOFA", apt: 0.2, rows: ["A", "B", "C", "D"], seatsPerRow: 18 },
  { name: "Premium FIRST CLASS", apt: 0.2, rows: ["A", "B", "C", "D", "E", "F", "G", "H"], seatsPerRow: 18 },
  { name: "NonPremium SECOND CLASS", apt: 0.1, rows: ["A", "B", "C", "D"], seatsPerRow: 18 },
];

// ================= TYPES =================
interface Seat {
  id: string;
  status: "available" | "selected" | "sold";
  section: string;
  price: number;
}

// ================= SEAT POPUP =================
function SeatPopup({
  onClose,
  setSeatLimit,
  seatLimit,
}: {
  onClose: () => void;
  setSeatLimit: (n: number) => void;
  seatLimit: number;
}) {
  const seatImages = [
    "https://i.pinimg.com/1200x/d3/42/fb/d342fbd25901b9b2427c46c4d3b2d653.jpg", // cycle
    "https://i.pinimg.com/1200x/0e/e3/46/0ee34603488d70a9159f55aeb0a2ff67.jpg", // bike
    "https://i.pinimg.com/736x/d5/70/e1/d570e11f367af2884eeed4318244cf6d.jpg", // auto
    "https://i.pinimg.com/736x/bd/2d/4f/bd2d4f06db84582ed5926508e5cd2223.jpg", // car
  ];
  const transportNames = ["Cycle", "Bike", "Auto", "Car"];
  const seatLimits = [1, 2, 3, 4];
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const index = seatLimits.indexOf(seatLimit);
    if (index >= 0) setCurrentImg(index);
  }, [seatLimit]);

  const handleTransportChange = (index: number) => {
    setCurrentImg(index);
    setSeatLimit(seatLimits[index]);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="relative max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-semibold mb-4">How many seats?</h2>
        <div className="mb-4">
          <img src={seatImages[currentImg]} alt="transport" className="w-32 h-32 mx-auto object-contain" />
        </div>
        <div className="flex justify-center gap-4 mb-4">
          {transportNames.map((name, index) => (
            <button
              key={index}
              onClick={() => handleTransportChange(index)}
              className={`text-base font-normal px-2 py-1 border-b-2 transition ${
                currentImg === index
                  ? "border-red-500 text-red-500"
                  : "border-transparent text-gray-700 hover:text-black"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        {/* Premium Options */}{" "}
        <div className="flex justify-between border-t border-gray-200 pt-4 mb-4 text-sm">
          {" "}
          <div>
            {" "}
            <p className="font-semibold">PREMIUM BALCONY</p> <p className="text-gray-600">₹0.2</p>{" "}
            <p className="text-yellow-500">FILLING FAST</p>{" "}
          </div>{" "}
          <div>
            {" "}
            <p className="font-semibold">PREMIUM SOFA</p> <p className="text-gray-600">₹0.2</p>{" "}
            <p className="text-green-500">AVAILABLE</p>{" "}
          </div>{" "}
          <div>
            {" "}
            <p className="font-semibold">PREMIUM FIRST CLASS</p> <p className="text-gray-600">₹0.2</p>{" "}
            <p className="text-green-500">AVAILABLE</p>{" "}
          </div>{" "}
        </div>
        <button
          onClick={onClose}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Select Seats
        </button>
      </motion.div>
    </motion.div>
  );
}

// ================= MAIN COMPONENT =================
export default function BookingFlow() {
  const router = useRouter();
  const [seats, setSeats] = useState<Record<string, Seat[]>>({});
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [showAlert, setShowAlert] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(true);
  const [seatLimit, setSeatLimit] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<{ name: string; rating: string } | null>(null);

  // init seats and load movie data
  useEffect(() => {
    const generatedSeats: Record<string, Seat[]> = {};
    sections.forEach((section) => {
      generatedSeats[section.name] = section.rows.flatMap((row) =>
        Array.from({ length: section.seatsPerRow }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          const isSold = Math.random() < 0.2; // 20% random sold
          return {
            id: seatId,
            status: isSold ? "sold" : "available",
            section: section.name,
            price: section.apt,
          };
        })
      );
    });
    setSeats(generatedSeats);

    const dataString = sessionStorage.getItem("bookingData");
    if (dataString) {
      const bookingData = JSON.parse(dataString);
      if (bookingData.movie && bookingData.rating) {
        setSelectedMovie({ name: bookingData.movie, rating: bookingData.rating });
      }
    }
  }, []);

  // toggle seat
  const toggleSeat = (sectionName: string, seatId: string) => {
    const seat = seats[sectionName].find((s) => s.id === seatId);
    if (!seat || seat.status === "sold") return;

    const alreadySelected = selectedSeats.find((s) => s.id === seatId);

    if (alreadySelected) {
      setSeats((prev) => ({
        ...prev,
        [sectionName]: prev[sectionName].map((s) => (s.id === seatId ? { ...s, status: "available" } : s)),
      }));
      setSelectedSeats((prev) => prev.filter((s) => s.id !== seatId));
    } else {
      if (selectedSeats.length >= seatLimit) {
        setShowAlert(`You can only select ${seatLimit} seat(s) 🚫`);
        setTimeout(() => setShowAlert(null), 2000);
        return;
      }
      setSeats((prev) => ({
        ...prev,
        [sectionName]: prev[sectionName].map((s) => (s.id === seatId ? { ...s, status: "selected" } : s)),
      }));
      setSelectedSeats((prev) => [...prev, { ...seat, status: "selected" }]);
    }
  };

  const totalApt = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const handlePayAndContinue = () => {
    if (selectedSeats.length === 0) {
      setShowAlert("Please select at least 1 seat 🚨");
      setTimeout(() => setShowAlert(null), 2000);
      return;
    }
    const seatsWithPrice = selectedSeats.map((seat) => ({
      section: seat.section,
      id: seat.id,
      price: seat.price,
    }));
    const existingData = JSON.parse(sessionStorage.getItem("bookingData") || "{}");
    const data = { ...existingData, seats: seatsWithPrice, totalApt };
    sessionStorage.setItem("bookingData", JSON.stringify(data));
    router.push("/userdetails");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbarmovie />

      {/* Show Popup First */}
      <AnimatePresence>
        {showPopup && (
          <SeatPopup onClose={() => setShowPopup(false)} setSeatLimit={setSeatLimit} seatLimit={seatLimit} />
        )}
      </AnimatePresence>

      {/* Seat Layout */}
      {!showPopup && (
        <div className="max-w-6xl mx-auto p-4 pt-28">
          {/* Movie Screen (only once, before SECOND CLASS) */}
          <div className="mb-6 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7994/7994691.png"
              alt="Movie Screen"
              className="h-12 object-contain"
            />
          </div>

          {sections.map((section) => (
            <div key={section.name} className="mb-8">
              <h2 className="text-center text-sm text-gray-700 mb-2">
                {section.name} • {section.apt} apt
              </h2>
              <div className="space-y-2">
                {section.rows.map((row) => (
                  <div key={row} className="flex items-center justify-center gap-3">
                    <span className="w-6 text-xs text-gray-600">{row}</span>
                    <div className="flex gap-6">
                      <div className="flex gap-1">
                        {seats[section.name]
                          ?.filter((s) => s.id.startsWith(row))
                          .slice(0, 9)
                          .map((seat) => (
                            <button
                              key={seat.id}
                              onClick={() => toggleSeat(section.name, seat.id)}
                              className={`w-7 h-7 rounded-sm text-[10px] flex items-center justify-center border ${
                                seat.status === "available"
                                  ? "bg-white border-green-400 text-green-600 hover:bg-green-100"
                                  : seat.status === "selected"
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              {seat.id.replace(row, "")}
                            </button>
                          ))}
                      </div>
                      <div className="flex gap-1">
                        {seats[section.name]
                          ?.filter((s) => s.id.startsWith(row))
                          .slice(9)
                          .map((seat) => (
                            <button
                              key={seat.id}
                              onClick={() => toggleSeat(section.name, seat.id)}
                              className={`w-7 h-7 rounded-sm text-[10px] flex items-center justify-center border ${
                                seat.status === "available"
                                  ? "bg-white border-green-400 text-green-600 hover:bg-green-100"
                                  : seat.status === "selected"
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              {seat.id.replace(row, "")}
                            </button>
                          ))}
                      </div>
                    </div>
                    <span className="w-6 text-xs text-gray-600">{row}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-6 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 bg-white border-green-400 border"></span> Available
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 bg-green-500"></span> Selected
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 bg-gray-300"></span> Sold
            </div>
          </div>

          {/* Edit Ticket Button */}
          <div className="fixed bottom-1 left- -translate-x-1/2 z-40">
            <button
              onClick={() => setShowPopup(true)}
              className="text-sm left-1/2  text-black  shadow px-4 py-2 rounded-lg border"
            >
              Edit Ticket
            </button>
          </div>

          {/* Continue Button */}
          <div className="mt-6 mb-10">
            <button
              onClick={handlePayAndContinue}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg text-lg font-semibold"
            >
              Pay & Continue
            </button>
          </div>
        </div>
      )}

      {/* Alert */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow"
          >
            {showAlert}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}