// app/layout.tsx

import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Emerald Counselling',
  description: 'Transforming lives through compassionate support.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between bg-white text-gray-800 font-sans">
        <header className="relative bg-[#4b2e19] text-white shadow-md min-h-screen">
  <div className="grid grid-cols-1 md:grid-cols-3 h-full min-h-screen">
    
    {/* Left - Logo as Background - spans 2 columns */}
    <div
      className="col-span-2 bg-cover bg-center h-full"
      style={{ backgroundImage: "url('/IMG-20250318-WA0003.jpg')" }}
    >
      <div className="h-full w-full bg-black/30"></div>
    </div>

    {/* Right - Encouraging Words + Brand Name + Nav */}
    <div className="flex flex-col justify-center px-16 bg-[#6a4a2e] text-[#f9e6c2] relative">
      {/* Navigation - aligned top right */}
      <nav className="absolute top-4 right-6">
        <ul className="flex gap-6 text-white text-sm">
          <li>
            <a href="#about" className="hover:text-[#d6a756] transition-colors duration-300">
              About
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-[#d6a756] transition-colors duration-300">
              Services
            </a>
          </li>
          <li>
            <a href="#testimonials" className="hover:text-[#d6a756] transition-colors duration-300">
              Testimonials
            </a>
          </li>
          <li>
            <a href="#faq" className="hover:text-[#d6a756] transition-colors duration-300">
              FAQ
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-[#d6a756] transition-colors duration-300">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Brand Name & Encouraging Text */}
      <h1 className="text-3xl font-extrabold tracking-wide leading-tight font-serif mb-6 pt-12">
        <span className="text-[#d6a756]">E</span>merald{" "}
        <span className="text-[#d6a756]">C</span>ounselling
      </h1>
      <p className="text-base font-light leading-relaxed font-body max-w-lg">
        You’re not alone — this is your first step towards healing.<br />
        Our team is here to support, listen, and walk with you every step of the way.
      </p>
    </div>
  </div>
</header>


        <section className="bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 text-center py-12 px-6 border-b border-yellow-200">
  <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-800 drop-shadow-md">
    Transforming Lives Through Compassionate Support
  </h2>
  <p className="mt-4 max-w-xl mx-auto text-gray-700 text-base md:text-lg leading-relaxed">
    Discover how Emerald Counselling empowers your mental wellness journey with personalized, affordable, and empathetic care.
  </p>

  {/* Placeholder for an optional image or icon */}
  <div className="mt-8 flex justify-center">
   <div className="mt-8 flex justify-center">
  
</div>

  </div>

  {/* Call to action button */}
  <button className="mt-10 bg-yellow-700 text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:bg-yellow-800 transition">
    Get Started
  </button>
</section>


        {/* Page Content */}
        <main className="flex-grow px-4 py-8 container mx-auto">
          {children}
        </main>

        <footer className="bg-amber-900 text-amber-200 text-center text-sm py-6">
  <p>© {new Date().getFullYear()} Emerald Counselling. All rights reserved.</p>
  <p className="mt-1">
    <a
      href="mailto:emeraldcounselling722@gmail.com"
      className="underline hover:text-yellow-400 transition-colors duration-200"
    >
      emeraldcounselling722@gmail.com
    </a>{" "}
    | 0716 565 814
  </p>

  <div className="mt-4 flex justify-center space-x-4 text-lg">
    <a
      href="https://wa.me/254716565814"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-green-400"
    >
      <FaWhatsapp />
    </a>
    <a
      href="https://facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-400"
    >
      <FaFacebookF />
    </a>
    <a
      href="https://twitter.com"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-300"
    >
      <FaTwitter />
    </a>
  </div>
</footer>
      </body>
    </html>
  );
}
