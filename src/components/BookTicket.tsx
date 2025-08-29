"use client";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { uploadTicketMetadata } from "@/utils/nftStorage";

export default function BookTicket() {
  const { account, signAndSubmitTransaction } = useWallet();

  const handleBook = async () => {
    try {
      // ✅ 1. NFT metadata create & upload
      const metadataUri = await uploadTicketMetadata(
        "Inception",
        "PVR Hyderabad",
        "A5",
        "7:00PM",
        new File(["dummy"], "ticket.png", { type: "image/png" }) // dummy file
      );

      console.log("✅ Metadata URI:", metadataUri);

      // ✅ 2. Blockchain Transaction (Petra sign)
      const payload = {
        type: "entry_function_payload",
        function: `${process.env.NEXT_PUBLIC_MODULE_ADDRESS}::movie_ticketing::book_and_mint`,
        type_arguments: [],
        arguments: ["Inception", "PVR Hyderabad", "A5", "7:00PM", "150", metadataUri],
      };

      const txn = await signAndSubmitTransaction({ payload });
      console.log("🎉 Transaction sent:", txn.hash);
    } catch (err) {
      console.error("❌ Error booking ticket:", err);
    }
  };

  return (
    <button onClick={handleBook} className="px-4 py-2 bg-blue-600 text-white rounded">
      Book & Mint Ticket
    </button>
  );
}
