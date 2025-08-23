"use client";

import MovieTicket from "@/components/Movieticket";
import { useSearchParams } from "next/navigation";

export default function MovieTicketPage() {
  const searchParams = useSearchParams();
  const seats = searchParams.get("seats") || "";
  const bookingId = searchParams.get("bookingId") || "";
  const amount = searchParams.get("amount") || "";

  return (
    <MovieTicket
      seats={seats.split(",")}
      bookingId={bookingId}
      amount={amount}
      movie="Mowgli: Legend of the Jungle"
      date="Sat, Aug 23, 2025 • 06:45 PM"
      theater="PVR: Ripples, Vijayawada"
      screen="Screen 5"
    />
  );
}
