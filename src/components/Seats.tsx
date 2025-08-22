"use client";

import React, { useState } from "react";
import { motion } from "framer-motion"; // 🎬 Animation

type Seat = {
  id: string;
  booked: boolean;
};

const rows = ["A", "B", "C", "D", "E"];
const seatsPerRow = 10;
const seatPrice = 150; // 💰 Price per seat

export default function Seats() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Generate seat layout
  const generateSeats = (): Seat[] => {
    const layout: Seat[] = [];
    rows.forEach((row) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        layout.push({
          id: `${row}${i}`,
          booked: Math.random() < 0.1, // 🔴 Random booked seats (10%)
        });
      }
    });
    return layout;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  // Handle click
  const toggleSeat = (seat: Seat) => {
    if (seat.booked) return; // Can't book red seats
    setSelectedSeats((prev) =>
      prev.includes(seat.id)
        ? prev.filter((s) => s !== seat.id)
        : [...prev, seat.id]
    );
  };

  return (
    <motion.div
      className="flex flex-col items-center min-h-screen bg-white p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* 🎬 Theater Name */}
      <h1 className="text-3xl font-extrabold text-red-600 mb-2 text-center tracking-wide">
        PVR: Ripples, Vijayawada
      </h1>

      {/* Page Title */}
      <h2 className="text-xl font-bold mb-6 text-black">Select Your Seats</h2>

      {/* 🎟 Seat Layout */}
      <div className="flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row} className="flex gap-2 justify-center">
            {seats
              .filter((s) => s.id.startsWith(row))
              .map((seat) => {
                const isSelected = selectedSeats.includes(seat.id);
                return (
                  <motion.button
                    key={seat.id}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleSeat(seat)}
                    className={`w-10 h-10 rounded-md text-sm font-semibold 
                      ${
                        seat.booked
                          ? "bg-red-500 text-white cursor-not-allowed"
                          : isSelected
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-black hover:bg-gray-400"
                      }`}
                  >
                    {seat.id}
                  </motion.button>
                );
              })}
          </div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        className="mt-8 w-full max-w-md bg-gray-100 p-4 rounded-xl shadow-md text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-lg font-semibold mb-2 text-black">Booking Summary</h2>
        <p className="text-black">
          Selected Seats:{" "}
          {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
        </p>
        <p className="text-black">Total: ₹{selectedSeats.length * seatPrice}</p>

        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          disabled={selectedSeats.length === 0}
        >
          Proceed to Pay
        </button>
      </motion.div>
    </motion.div>
  );
}
