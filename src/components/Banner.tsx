"use client";

import { useState, useEffect } from "react";

export default function Banner({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000); // 3 sec taruvata hide
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <div className="bg-blue-600 text-white px-6 py-3 rounded-b-xl shadow-lg text-center font-medium animate-slideDown">
        {message} hello
      </div>
    </div>
  );
}
