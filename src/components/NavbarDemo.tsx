"use client";

import { useState } from "react";
import Link from "next/link";
import Masonry from "./Masonry";
import {
  Navbar,
  NavBody,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/navbar";
import { WalletSelector } from "./WalletSelector";
import Footer from "@/components/Footer";

const items = [
  { id: "1", img: "https://i.pinimg.com/1200x/c2/45/a6/c245a60b5fc664c9d0b14706d05f667c.jpg", url: "#", height: 400 },
  { id: "2", img: "https://i.pinimg.com/1200x/bf/57/0e/bf570e9ea2eca1a94c7bbb1a9f38008f.jpg", url: "#", height: 250 },
  { id: "3", img: "https://i.pinimg.com/1200x/b7/38/4f/b7384fdf924d7b1f796e1f5713aa5a7f.jpg", url: "#", height: 700 },
  { id: "4", img: "https://i.pinimg.com/736x/21/99/8d/21998d3341d8d22359928d94564d9bf7.jpg", url: "#", height: 1000 },
  { id: "5", img: "https://i.pinimg.com/1200x/f4/5c/1b/f45c1b5b4e46cc8e973424faa990289f.jpg", url: "#", height: 990 },
  { id: "6", img: "https://i.pinimg.com/736x/34/db/20/34db2068fb86afc3a5ccfdebb53a1c32.jpg", url: "#", height: 600 },
  { id: "7", img: "https://i.pinimg.com/736x/d4/b2/fa/d4b2fa3022ec6be862a72da7089b1223.jpg", url: "#", height: 500 },
  { id: "8", img: "https://i.pinimg.com/1200x/8c/84/36/8c8436119907b577b6af0966b32dd1ee.jpg", url: "#", height: 550 },
  { id: "9", img: "https://i.pinimg.com/1200x/b1/4c/85/b14c8558262a9aa6540dc26a2f5b3bd8.jpg", url: "#", height: 550 },
  { id: "10", img: "https://i.pinimg.com/1200x/09/15/79/091579525fc32329483371c986c0de34.jpg", url: "#", height: 650 },
  { id: "11", img: "https://i.pinimg.com/1200x/5b/88/59/5b885921decdf9e74fe5386f20ce7f04.jpg", url: "#", height: 590 },
  { id: "12", img: "https://i.pinimg.com/1200x/1a/46/e5/1a46e50e758874b6f30fa03b7fdde8b0.jpg", url: "#", height: 650 },
];

export function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Location");

  return (
    <div className="w-full">
      {/* Navbar fixed at top */}
      <Navbar className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <NavBody>
          <NavbarLogo>Royaltix</NavbarLogo>

          {/* ✅ Nav Items + Location Dropdown */}
          <div className="flex items-center gap-6">
            <a href="#href" className="text-gray-700 hover:text-black">
              Home
            </a>
            <a href="#my-tickets" className="text-gray-700 hover:text-black">
              My Tickets
            </a>

            {/* ✅ Location Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-black"
              >
                {selectedLocation}
              </button>

              {showDropdown && (
                <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                  {["Vijayawada"].map((city) => (
                    <Link href="/previewcontainer" key={city}>
                      <div
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedLocation(city);
                          setShowDropdown(false);
                        }}
                      >
                        {city}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <NavbarButton variant="primary">Book Ticket</NavbarButton>
          </div>
        </NavBody>
      </Navbar>

      {/* Main Content */}
      <div className="container mx-auto p-8 pt-32 text-center">
        <>
          <h1 className="mb-4 text-3xl font-bold">
            Decentralized Movie Tickets Booking
          </h1>
          <p className="text-sm text-zinc-500">
            Navbar stays fixed at the top always.
            <br /> <br />
            <WalletSelector />
          </p>

          <br />
          <br />

          <Masonry
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </>
      </div>
      <Footer />
    </div>
  );
}
