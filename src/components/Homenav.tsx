"use client";

import { useState } from "react";
import Link from "next/link";
import { WalletSelector } from "./WalletSelector"; // Make sure this exists

export default function HomeNav() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Vijayawada");

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Left: Logo + Location */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Royaltix
          </Link>

          {/* Location Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-black"
            >
              {selectedLocation}
            </button>

            {showDropdown && (
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                {["Vijayawada", "Hyderabad", "Chennai"].map((city) => (
                  <div
                    key={city}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedLocation(city);
                      setShowDropdown(false);
                    }}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link href="#my-tickets" className="text-gray-700 hover:text-black">
            My Tickets
          </Link>
        </div>

        {/* Right Section: Wallet */}
        <div className="flex items-center gap-4">
          <WalletSelector />
        </div>
      </div>
    </nav>
  );
}
