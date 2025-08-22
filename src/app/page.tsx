"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/components/HomePage";
import { NavbarDemo } from "@/components/NavbarDemo";
import PreviewContainer from "@/components/PreviewContainer";
import Movies from "@/components/Movies";
import Mowgli from "@/components/Mowgli";
import Narasimha from "@/components/Narasimha";
import Paradise from "@/components/Paradise";
import Ramayana from "@/components/Ramayana";
import Merai from "@/components/merai";
function App() {
  const { connected } = useWallet();

  return (
    <Routes>
      <Route path="/" element={
        <>
          {connected ? (
            <div className="flex flex-col items-center justify-center ">
              <NavbarDemo />
            </div>
          ) : (
            <HomePage />
          )}
        </>
      } />
      <Route path="/previewcontainer" element={<PreviewContainer />} />
      <Route path="/previewcontainer/movies" element={<Movies />} />
      <Route path="/previewcontainer/mowgli" element={<Mowgli />} />
      <Route path="/previewcontainer/narasimha" element={<Narasimha />} />
      <Route path="/previewcontainer/paradise" element={<Paradise />} />
      <Route path="/previewcontainer/ramayana" element={<Ramayana />} />
      <Route path="/previewcontainer/merai" element={<Merai />} />
    </Routes>
  );
}

export default App;
