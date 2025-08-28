"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbarmovie from "./Navbarmovie";

interface BookingData {
  movie: string;
  theater: string;
  date: string;
  time: string;
  language: string;
}

export default function UserDetails() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Load booking data from sessionStorage
  useEffect(() => {
    const data = sessionStorage.getItem("bookingData");
    if (data) setBookingData(JSON.parse(data));
  }, []);

  const connectWallet = async () => {
    if (!window.aptos) {
      alert("❌ Petra Wallet not found! Please install it.");
      return;
    }
    try {
      await window.aptos.connect();
      const account = await window.aptos.account();
      setWalletAddress(account.address);
      setWalletConnected(true);
      alert("✅ Wallet connected!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to connect wallet.");
    }
  };

  const disconnectWallet = async () => {
    try {
      await window.aptos.disconnect();
      setWalletAddress("");
      setWalletConnected(false);
      alert("🔴 Wallet disconnected!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!walletConnected) return alert("❌ Connect your wallet first!");

    const finalBooking = {
      bookingData,
      contact: { email, phone, state },
      walletAddress,
      createdAt: new Date().toISOString(),
    };

    const history = JSON.parse(localStorage.getItem("bookings") || "[]");
    history.push(finalBooking);
    localStorage.setItem("bookings", JSON.stringify(history));
    setSubmitted(true);
  };

  if (!bookingData && !submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="mb-4">No booking data found. Please select a show first.</p>
          <button onClick={() => router.push("/")} className="px-4 py-2 bg-red-500 text-white rounded">
            Go to Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Confirm Your Booking</h2>

          {/* Navbar showing movie + date/time */}
          <Navbarmovie bookingData={bookingData!} />

          {/* Wallet */}
          {!walletConnected ? (
            <button
              type="button"
              onClick={connectWallet}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg my-4 hover:bg-indigo-700"
            >
              Connect Wallet
            </button>
          ) : (
            <button
              type="button"
              onClick={disconnectWallet}
              className="w-full bg-red-500 text-white py-2 rounded-lg my-4 hover:bg-red-600"
            >
              Disconnect Wallet
            </button>
          )}

          {walletAddress && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Wallet Address</label>
              <input
                type="text"
                value={walletAddress}
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
          )}

          {/* Email */}
          <label className="block mb-2 text-sm font-medium">Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg mb-3"
            required
          />

          {/* Phone */}
          <label className="block mb-2 text-sm font-medium">Mobile Number *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-lg mb-3"
            placeholder="Enter mobile number"
            required
          />

          {/* State */}
          <label className="block mb-2 text-sm font-medium">State *</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-2 border rounded-lg mb-3"
            required
          >
            <option value="">Select your state</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Telangana">Telangana</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
          </select>

          <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">
            Submit & Confirm Booking
          </button>
        </form>
      ) : (
        <div className="w-full max-w-3xl bg-gray-50 rounded-2xl p-4 shadow-md mt-4">
          <h2 className="text-xl font-semibold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-700 mb-4">Thanks! Your booking has been saved locally.</p>
          {bookingData && (
            <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg w-full max-w-md">
              <p className="font-bold text-lg">Your Selected Show</p>
              <p className="mt-1">Movie: {bookingData.movie}</p>
              <p>Theater: {bookingData.theater}</p>
              <p className="text-red-600 font-semibold">
                Date: {bookingData.date} • Time: {bookingData.time}
              </p>
              <p>Language: {bookingData.language}</p>
            </div>
          )}


          <div className="bg-white rounded-xl p-4 border shadow-sm mt-4">
            <h2 className="text-lg font-semibold mb-3">Your Contact Details</h2>
            <p>Wallet: {walletAddress}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>State: {state}</p>
          </div>

          <button onClick={() => setSubmitted(false)} className="mt-4 text-blue-500 hover:underline">
            ✏️ Edit
          </button>
        </div>
      )}
    </div>
  );
}
