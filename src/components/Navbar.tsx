"use client";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { IoTicketOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { WalletSelector } from './WalletSelector';

export default function AppNavbar() { 
  return (
    <Navbar expand="lg" className="bg-transparent px-4 sm:px-6 py-3 shadow-md fixed w-full z-50">
      <Container className="flex items-center justify-between gap-3">
        {/* Left - Ticket icon + ROYALTIX */}
        <div className="flex items-center gap-2 sm:gap-3">
          <IoTicketOutline className="text-2xl sm:text-3xl text-black" />
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black cursor-pointer select-none"
          >
            ROYALTIX
          </motion.div>
          
        </div>

        {/* Right - Wallet Selector */}
        <div className="flex items-center gap-4">
          <WalletSelector />
        
        </div>
      </Container>

    </Navbar>
    
  );
}