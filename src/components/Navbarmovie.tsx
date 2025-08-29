"use client";
import { useEffect, useState } from "react";
import { Film, Languages, MapPin, Calendar, Clock } from "lucide-react";

interface BookingData {
  movie: string;
  theater: string;
  date: string;
  time: string;
  language: string;
}

export default function Navbarmovie({ bookingData: propData }: { bookingData?: BookingData }) {
  const [booking, setBooking] = useState<BookingData | null>(propData || null);

  useEffect(() => {
    if (!propData && typeof window !== "undefined") {
      const data = sessionStorage.getItem("bookingData");
      if (data) {
        setBooking(JSON.parse(data));
      }
    }
  }, [propData]);

  if (!booking) return null;

  return (
    <div className="p-4 bg-white shadow-md rounded-xl flex flex-col gap-3">
      {/* 🎬 Movie */}
      <div className="flex items-center gap-2 text-gray-800">
        <Film className="w-5 h-5 text-red-500" />
        <span className="font-semibold">Movie:</span>
        <span>{booking.movie}</span>
      </div>

      {/* 🌐 Language */}
      <div className="flex items-center gap-2 text-gray-800">
        <Languages className="w-5 h-5 text-blue-500" />
        <span className="font-semibold">Language:</span>
        <span>{booking.language}</span>
      </div>

      {/* 📍 Location */}
      <div className="flex items-center gap-2 text-gray-800">
        <MapPin className="w-5 h-5 text-green-500" />
        <span className="font-semibold">Location:</span>
        <span>{booking.theater}</span>
      </div>

      {/* 📅 Date */}
      <div className="flex items-center gap-2 text-gray-800">
        <Calendar className="w-5 h-5 text-purple-500" />
        <span className="font-semibold">Date:</span>
        <span>{booking.date}</span>
      </div>

      {/* ⏰ Time */}
      <div className="flex items-center gap-2 text-gray-800">
        <Clock className="w-5 h-5 text-orange-500" />
        <span className="font-semibold">Time:</span>
        <span>{booking.time}</span>
      </div>
    </div>
  );
}
