"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ShowTime {
  time: string;
  format?: string;
}

interface Theater {
  name: string;
  distance: string;
  shows: ShowTime[];
}

export default function MovieBooking() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("22 AUG");

  const dates = [
    { day: "FRI", date: "22 AUG" },
    { day: "SAT", date: "23 AUG" },
    { day: "SUN", date: "24 AUG" },
    { day: "MON", date: "25 AUG" },
    { day: "TUE", date: "26 AUG" },
    { day: "WED", date: "27 AUG" },
  ];

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
    {
      name: "Alankar A/C 4K Dolby Surround: Vijayawada",
      distance: "1.8 km",
      shows: [{ time: "02:35 PM" }, { time: "06:20 PM" }, { time: "09:50 PM" }],
    },
    {
      name: "Swathi Theater: Bhavanipuram (Newly Renovated)",
      distance: "1.9 km",
      shows: [{ time: "02:45 PM" }, { time: "06:30 PM" }, { time: "09:30 PM" }],
    },
  ];

  const handleBooking = (theater: string, time: string) => {
    if (theater === "PVR: Ripples, Vijayawada" && time === "01:40 PM") {
      router.push("/seats");
    } else {
      alert(`Booking tickets for ${theater} at ${time}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
      {/* Movie Title */}
      <h1 className="text-2xl font-bold mb-4">Mougil</h1>
      <p className="text-gray-600 mb-4">Movie runtime: 2h 49m</p>

      {/* Date Selector */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        {dates.map((d) => (
          <div
            key={d.date}
            onClick={() => setSelectedDate(d.date)}
            className={`px-4 py-2 rounded-md cursor-pointer text-center min-w-[80px] ${
              selectedDate === d.date
                ? "bg-red-600 text-white font-bold"
                : "bg-gray-100 text-black"
            }`}
          >
            <p className="text-sm">{d.day}</p>
            <p className="text-lg">{d.date.split(" ")[0]}</p>
          </div>
        ))}
      </div>

      {/* Language & Format */}
      <p className="font-semibold mb-4">Telugu • 2D</p>

      {/* Theaters */}
      <div className="space-y-6">
        {theaters.map((theater) => (
          <div
            key={theater.name}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <h2 className="text-lg font-bold">{theater.name}</h2>
            <p className="text-sm text-gray-500">{theater.distance} | Cancellation available</p>

            {/* Show Times */}
            <div className="flex flex-wrap gap-3 mt-3">
              {theater.shows.map((show, i) => (
                <button
                  key={i}
                  onClick={() => handleBooking(theater.name, show.time)}
                  className="px-4 py-2 border border-green-600 rounded-md text-green-600 font-semibold hover:bg-green-100"
                >
                  {show.time}
                  {show.format && (
                    <span className="ml-1 text-xs text-gray-500">
                      {show.format}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}