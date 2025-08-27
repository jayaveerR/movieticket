"use client";
import { useEffect, useState } from "react";

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
    <div className="p-4 bg-white shadow-md flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="font-bold text-lg">{booking.movie}</h2>
        <p className="text-sm text-gray-600">{booking.language}</p>
      </div>
      <div className="text-sm text-gray-700 mt-2 md:mt-0">
        <p>{booking.theater}</p>
        <p>
          {booking.date} • {booking.time}
        </p>
      </div>
    </div>
  );
}
