// src/components/MovieTicket.tsx
"use client";

import React from "react";

type MovieTicketProps = {
  seats: string[];
  bookingId: string;
  amount: string;
  movie: string;
  date: string;
  theater: string;
  screen: string;
};

export default function MovieTicket({ seats, bookingId, amount, movie, date, theater, screen }: MovieTicketProps) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-red-700 to-yellow-400 p-4">
      <div className="max-w-4xl w-full bg-white/95 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-pink-600 text-white text-center p-6">
          <h1 className="text-3xl font-bold">BookMyShow</h1>
          <p className="opacity-90 text-lg">Your ticket for {movie}</p>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Ticket Section */}
          <div className="flex-1 p-6 relative">
            <div className="text-center mb-4">
              <img
                src="https://m.media-amazon.com/images/M/MV5BMjMzMjQ5NTQ2M15BMl5BanBnXkFtZTgwNDg2Mzk0NzM@._V1_FMjpg_UX1000_.jpg"
                alt="Movie Poster"
                className="max-w-[200px] mx-auto rounded-lg shadow-lg"
              />
            </div>

            <h2 className="text-2xl font-bold text-blue-900 text-center mb-4">
              {movie}
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between border-b border-dashed pb-2">
                <span className="font-semibold text-gray-600">Booking ID</span>
                <span className="font-bold text-pink-600">{bookingId}</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-2">
                <span className="font-semibold text-gray-600">Date & Time</span>
                <span className="font-bold text-pink-600">{date}</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-2">
                <span className="font-semibold text-gray-600">Theater</span>
                <span className="font-bold text-pink-600">{theater}</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-2">
                <span className="font-semibold text-gray-600">Screen</span>
                <span className="font-bold text-pink-.600">{screen}</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-2">
                <span className="font-semibold text-gray-600">Seats</span>
                <span className="font-bold text-pink-600">{seats.join(", ")}</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-2">
                <span className="font-semibold text-gray-600">Amount Paid</span>
                <span className="font-bold text-pink-600">₹ {amount}</span>
              </div>
            </div>

            {/* Screen */}
            <div className="text-center italic text-gray-600 my-4">
              ----------- SCREEN THIS WAY -----------
            </div>

            {/* QR Code */}
            <div className="text-center mt-6">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingId}`}
                alt="QR Code"
                className="mx-auto border p-2 rounded-lg"
              />
              <p className="text-sm text-gray-600 mt-2">Scan QR at theater</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-blue-900 text-white text-center py-4 text-sm">
          © 2025 BookMyShow. All rights reserved. | This is a demonstration page only
        </div>
      </div>
    </div>
  );
}
