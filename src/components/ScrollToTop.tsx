"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Przewiń do góry"
      className={`focus-ring fixed bottom-24 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-white shadow-[var(--shadow-float)] transition-[opacity,transform,background-color] duration-300 ease-out hover:bg-green-800 md:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-6 w-6" strokeWidth={2.5} aria-hidden />
    </button>
  );
}
