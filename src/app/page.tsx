"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { HeroSectionOne } from "@/components/HeroSectionOne";
import { NavbarDemo } from "@/components/NavbarDemo";

export default function Home() {
  const { connected } = useWallet();

  return (
    <>
      {connected ? (
        <div className="flex flex-col items-center justify-center ">
          <NavbarDemo />
          
        </div>
      ) : (
        <>
          <HeroSectionOne />
          
        </>
      )}
    </>
  );
}