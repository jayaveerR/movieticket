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
  movie: string;
  rating?: string;
  language: string;
  location: string;
  date: string;
  time: string;
  theater?: string;
  screen?: string;
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
  const [collectionInitialized, setCollectionInitialized] = useState(false);

  // Load booking data from sessionStorage
  useEffect(() => {
    const data = sessionStorage.getItem("bookingData");
    if (data) {
      setBookingData(JSON.parse(data));
    }
  }, []);

  // Check if collection exists when wallet connects
  useEffect(() => {
    if (walletConnected && walletAddress) {
      checkCollectionExists();
    }
  }, [walletConnected, walletAddress]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const connectWallet = async () => {
    if (!(window as any).aptos) {
      showToast("❌ Petra Wallet not found!");
      return;
    }

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
      setCollectionInitialized(false);
      showToast("🔴 Wallet disconnected!");
    } catch (err) {
      console.error(err);
    }
  };

  // Check if collection already exists
  const checkCollectionExists = async () => {
    if (!walletConnected || !walletAddress) return;

    try {
      const payload = {
        function:
          "0xd5cb2ca55ee19c6c22871c92a03c474cb3dcdb7f2e0a672706667d5ad8147e7d::bookmyshow::collection_exists",
        type_arguments: [],
        arguments: [walletAddress],
      };

      const result = await (window as any).aptos.view(payload);
      const exists = result[0];

      setCollectionInitialized(exists);

      if (exists) {
        showToast("✅ Collection already exists!");
      }
    } catch (err) {
      console.error("Error checking collection:", err);
      setCollectionInitialized(false);
    }
  };

  // Initialize NFT collection
  const initializeCollection = async () => {
    if (!walletConnected || !walletAddress) {
      showToast("❌ Connect wallet first!");
      return false;
    }

    if (collectionInitialized) {
      showToast("✅ Collection already initialized!");
      return true;
    }

    try {
      showToast("🔄 Initializing collection...");

      const payload = {
        type: "entry_function_payload",
        function:
          "0xd5cb2ca55ee19c6c22871c92a03c474cb3dcdb7f2e0a672706667d5ad8147e7d::bookmyshow::initialize_collection",
        type_arguments: [],
        arguments: [],
      };

      const txHash = await (window as any).aptos.signAndSubmitTransaction(payload);
      await (window as any).aptos.waitForTransaction(txHash);

      setCollectionInitialized(true);
      showToast("✅ Collection initialized!");
      return true;
    } catch (err: any) {
      console.error("Collection initialization error:", err);

      if (err.message?.includes("already exists")) {
        setCollectionInitialized(true);
        showToast("✅ Collection already exists!");
        return true;
      }

      showToast("❌ Failed to initialize collection");
      return false;
    }
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

  // ✅ Pay & Mint NFT
  const payOnChain = async () => {
    if (!walletConnected || !walletAddress)
      return showToast("❌ Connect wallet first!");
    if (!bookingData) return showToast("❌ No booking data found!");

    try {
      setPaying(true);

      // Step 1: Initialize collection if not already done
      if (!collectionInitialized) {
        const initialized = await initializeCollection();
        if (!initialized) {
          setPaying(false);
          return;
        }
      }

      // Step 2: Prepare booking data
      const movieName = bookingData.movie || "Unknown Movie";
      const language = bookingData.language || "English";
      const location = bookingData.location || state || "Unknown Location";
      const date = bookingData.date || new Date().toISOString().split("T")[0];
      const time = bookingData.time || "7:00 PM";

      const seatNumbers = bookingData.seats.map((s) => s.id);
      const seatTypes = bookingData.seats.map((s) => s.section);
      const prices = bookingData.seats.map((s) =>
        Math.floor(s.price * 100000000)
      );

      const totalAmountOctas = Math.floor(bookingData.totalApt * 100000000);

      showToast(
        `🔄 Paying ${bookingData.totalApt.toFixed(2)} APT & minting NFT...`
      );

      // Step 3: Transfer total APT to admin wallet
      const transferPayload = {
        type: "entry_function_payload",
        function: "0x1::aptos_account::transfer",
        type_arguments: [],
        arguments: [
          "ADMIN_WALLET_ADDRESS", // 🔥 Replace with admin wallet address
          totalAmountOctas,
        ],
      };

      const transferTx = await (window as any).aptos.signAndSubmitTransaction(
        transferPayload
      );
      await (window as any).aptos.waitForTransaction(transferTx);

      // Step 4: Mint NFT
      const mintPayload = {
        type: "entry_function_payload",
        function:
          "0xd5cb2ca55ee19c6c22871c92a03c474cb3dcdb7f2e0a672706667d5ad8147e7d::bookmyshow::book_and_mint",
        type_arguments: [],
        arguments: [
          movieName,
          language,
          location,
          date,
          time,
          seatNumbers,
          seatTypes,
          prices,
        ],
      };

      const mintTx = await (window as any).aptos.signAndSubmitTransaction(
        mintPayload
      );
      await (window as any).aptos.waitForTransaction(mintTx);

      showToast(
        `✅ Payment of ${bookingData.totalApt.toFixed(
          2
        )} APT done & NFT minted!`
      );
    } catch (err: any) {
      console.error("Transaction error:", err);
      if (err.message?.includes("INSUFFICIENT_BALANCE")) {
        showToast("❌ Insufficient balance for transaction");
      } else {
        showToast("❌ Transaction failed");
      }
    } finally {
      setPaying(false);
    }
  };

  if (!bookingData && !submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="mb-4">
            No booking data found. Please select a show first.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Go to Booking
          </button>
        </div>
      </div>
    );
  }

  const renderBookingDetails = () => (
    <div>
      <div className="px-6 py-3">
        <h2 className="text-lg font-bold">Your Ticket</h2>
      </div>

      <div className="space-y-3">
        {bookingData?.seats.map((seat) => (
          <div
            key={seat.id}
            className="p-3 rounded-lg border border-gray-300 shadow-sm bg-white"
          >
            <div className="flex items-center gap-2 text-gray-800 mb-1">
              <span className="text-red-500">🎟️</span>
              <span className="font-semibold">Seat number:</span>
              <span>{seat.id}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-800 mb-1">
              <span className="text-blue-500">🎫</span>
              <span className="font-semibold">Ticket info:</span>
              <span>{seat.section}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-800">
              <span className="text-green-500">💰</span>
              <span className="font-semibold">Price:</span>
              <span>{seat.price.toFixed(2)} apt</span>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-3 border-t border-dashed border-black" />

      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">Total price</p>
        <p className="text-xl font-extrabold">
          {bookingData?.totalApt.toFixed(2)} apt
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-center mb-4">
            Confirm Your Booking
          </h2>

          {bookingData && renderBookingDetails()}

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
              <label className="block mb-2 text-sm font-medium">
                Wallet Address
              </label>
              <input
                type="text"
                value={walletAddress}
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
          )}

          <label className="block mb-2 text-sm font-medium">
            Mobile Number *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-lg mb-3"
            placeholder="Enter mobile number"
            required
          />

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

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Submit & Confirm Booking
          </button>
        </form>
      ) : (
        <div className="w-full max-w-3xl bg-gray-50 rounded-2xl p-4 shadow-md mt-4">
          <h2 className="text-xl font-semibold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-700 mb-4">
            Thanks! Your booking has been saved locally.
          </p>

          <Navbarmovie />

          <div className="bg-white rounded-xl p-4 border shadow-sm mt-4">
            <h2 className="text-lg font-semibold mb-3">Your Contact Details</h2>
            <p>Wallet Address: {walletAddress}</p>
            <p>Phone Number: {phone}</p>
            <p>State: {state}</p>
          </div>

          {bookingData && renderBookingDetails()}

          {!collectionInitialized && (
            <button
              onClick={initializeCollection}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Initialize NFT Collection
            </button>
          )}

          <button
            onClick={payOnChain}
            disabled={paying}
            className={`mt-4 w-full text-white py-2 rounded-lg transition ${
              paying
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {paying
              ? "Processing..."
              : `Pay Now ${bookingData?.totalApt.toFixed(2)} APT & Mint NFT`}
          </button>

          {collectionInitialized && (
            <p className="mt-2 text-sm text-green-600 text-center">
              ✅ NFT Collection Ready
            </p>
          )}
        </div>
      )}

      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-6 right-6 bg-black text-white px-5 py-3 rounded-xl shadow-lg z-50"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
