"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Assk your doubts. Get instant answers. Learn faster.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 px-4 overflow-hidden">
      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold z-10 leading-tight">
        <div className="text-blue-600 mb-2 sm:mb-4">Empowering Students</div>
        <div className="text-gray-900">
          with <span className="text-purple-600">Smart Learning</span>
        </div>
      </h1>

      {/* Typing Text */}
      <p className="text-gray-700 mt-3 sm:mt-4 text-base sm:text-lg h-6">
        {typedText}
        <span className="animate-blink text-purple-600 font-semibold">|</span>
      </p>

      {/* Button */}
      <Link
        href="/Chatbot"
        className="mt-6 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white bg-gradient-to-r from-blue-600 to-purple-500 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl z-10"
      >
        Start Asking EduMentor AI
      </Link>

      {/* Logo */}
      <div className="mt-8 sm:mt-10 relative rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[4px] sm:p-[5px] shadow-2xl z-10 flex justify-center items-center">
        {/* Circular shadow */}
        <div className="absolute rounded-full w-[120px] sm:w-[160px] h-[120px] sm:h-[160px] bg-purple-400 opacity-30 filter blur-[25px]"></div>

        {/* Dotted ring */}
        <div className="absolute rounded-full w-[130px] sm:w-[170px] h-[130px] sm:h-[170px] border-2 sm:border-4 border-dotted border-purple-600 animate-spin-slow"></div>

        {/* Image container */}
        <Link
          href="/Chatbot"
          className="relative bg-white p-5 sm:p-8 md:p-2 rounded-full flex items-center justify-center z-10"
        >
          <Image
            src="/images/brain-icon2.png"
            alt="Brain Icon"
            width={90}
            height={90}
            className="drop-shadow-xl animate-breathe sm:w-[120px] sm:h-[120px]"
          />
        </Link>
      </div>
    </section>
  );
}
