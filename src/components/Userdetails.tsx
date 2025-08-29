"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbarmovie from "./Navbarmovie";

interface Seat {
  id: string;
  section: string;
  price: number;
}

interface BookingData {
  seats: Seat[];
  totalApt: number;
  movie?: string;
  language?: string;
  location?: string;
  date?: string;
  time?: string;
}

export default function UserDetails() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  // Load booking data
  useEffect(() => {
    const data = sessionStorage.getItem("bookingData");
    if (data) setBookingData(JSON.parse(data));
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const connectWallet = async () => {
    if (!(window as any).aptos) return showToast("❌ Petra Wallet not found!");
    try {
      await (window as any).aptos.connect();
      const account = await (window as any).aptos.account();
      setWalletAddress(account.address);
      setWalletConnected(true);
      showToast("✅ Wallet connected!");
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to connect wallet.");
    }
  };

  const disconnectWallet = async () => {
    try {
      await (window as any).aptos.disconnect();
      setWalletAddress("");
      setWalletConnected(false);
      showToast("🔴 Wallet disconnected!");
    } catch (err) { console.error(err); }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!walletConnected) return showToast("❌ Connect your wallet first!");

    const finalBooking = {
      bookingData,
      contact: { phone, state },
      walletAddress,
      createdAt: new Date().toISOString(),
    };

    const history = JSON.parse(localStorage.getItem("bookings") || "[]");
    history.push(finalBooking);
    localStorage.setItem("bookings", JSON.stringify(history));
    setSubmitted(true);
  };

  // Pay & store on-chain
  const payOnChain = async () => {
    if (!walletConnected || !walletAddress || !bookingData) return;

    try {
      setPaying(true);

      const payload = {
        type: "entry_function_payload",
        function:
          "0xd5cb2ca55ee19c6c22871c92a03c474cb3dcdb7f2e0a672706667d5ad8147e7d::bookmyshow::book_and_mint",
        type_arguments: [],
        arguments: [
          bookingData.movie || "Unknown Movie",
          bookingData.language || "N/A",
          bookingData.location || "N/A",
          bookingData.date || "N/A",
          bookingData.time || "N/A",
          bookingData.seats.map((s) => s.id),
          bookingData.seats.map((s) => s.section),
          bookingData.seats.map((s) => Math.round(s.price * 100)) // u64
        ],
      };

      const txHash = await (window as any).aptos.signAndSubmitTransaction(payload);
      await (window as any).aptos.waitForTransaction(txHash);

      showToast("✅ Booking stored on-chain & NFT minted!");
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to store booking on-chain.");
    } finally {
      setPaying(false);
    }
  };

  const renderBookingDetails = () => (
    <div>
      <div className="px-6 py-3">
        <h2 className="text-lg font-bold">Your Ticket</h2>
      </div>
      <div className="space-y-3">
        {bookingData?.seats.map((seat) => (
          <div key={seat.id} className="p-3 rounded-lg border shadow-sm bg-white">
            <div className="flex gap-2 text-gray-800 mb-1"><span>🎟️</span>Seat: {seat.id}</div>
            <div className="flex gap-2 text-gray-800 mb-1"><span>🎫</span>Type: {seat.section}</div>
            <div className="flex gap-2 text-gray-800"><span>💰</span>Price: {seat.price.toFixed(2)} apt</div>
          </div>
        ))}
      </div>
      <hr className="my-3 border-t border-dashed border-black" />
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">Total</p>
        <p className="text-xl font-extrabold">{bookingData?.totalApt.toFixed(2)} apt</p>
      </div>
    </div>
  );

  if (!bookingData && !submitted) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <p>No booking data found. Please select a show first.</p>
        <button onClick={() => router.push("/")} className="px-4 py-2 bg-red-500 text-white rounded">Go to Booking</button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Confirm Your Booking</h2>
          {bookingData && renderBookingDetails()}

          {!walletConnected ? (
            <button type="button" onClick={connectWallet} className="w-full bg-indigo-600 text-white py-2 rounded-lg my-4 hover:bg-indigo-700">Connect Wallet</button>
          ) : (
            <button type="button" onClick={disconnectWallet} className="w-full bg-red-500 text-white py-2 rounded-lg my-4 hover:bg-red-600">Disconnect Wallet</button>
          )}

          {walletAddress && <div className="mb-4"><label>Wallet Address</label><input type="text" value={walletAddress} readOnly className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed" /></div>}

          <label>Mobile Number *</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full p-2 border rounded-lg mb-3" placeholder="Enter mobile number" />
          <label>State *</label>
          <select value={state} onChange={e => setState(e.target.value)} required className="w-full p-2 border rounded-lg mb-3">
            <option value="">Select your state</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Telangana">Telangana</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
          </select>

          <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">Submit & Confirm Booking</button>
        </form>
      ) : (
        <div className="w-full max-w-3xl bg-gray-50 rounded-2xl p-4 shadow-md mt-4">
          <h2 className="text-xl font-semibold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-700 mb-4">Thanks! Your booking has been saved locally.</p>
          <Navbarmovie />
          <div className="bg-white rounded-xl p-4 border shadow-sm mt-4">
            <h2 className="text-lg font-semibold mb-3">Your Contact Details</h2>
            <p>Wallet: {walletAddress}</p>
            <p>Phone: {phone}</p>
            <p>State: {state}</p>
          </div>
          {bookingData && renderBookingDetails()}
          <button onClick={() => setSubmitted(false)} className="mt-4 text-blue-500 hover:underline">✏️ Edit</button>
          <button onClick={payOnChain} disabled={paying} className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">{paying ? "Processing..." : "Pay Now & Store On-Chain"}</button>
        </div>
      )}

      <AnimatePresence>
        {toastMsg && (
          <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{duration:0.4}} className="fixed top-6 right-6 bg-black text-white px-5 py-3 rounded-xl shadow-lg">{toastMsg}</motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
