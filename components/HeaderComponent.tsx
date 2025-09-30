"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/tasks", text: "Tasks" },
  { href: "/challenges", text: "Challenges" },
  { href: "/leaderboard", text: "Leaderboard" },
  { href: "/community", text: "Community" },
];

const externalLinks = [{ href: "https://www.codewars.com", text: "Codewars" }];

const HeaderComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#111827] text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between h-20 px-6 relative">
        <Link href="/" className="text-[32px] font-bold">
          Training
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="hover:text-green-400 transition-colors duration-200 font-medium"
            >
              {item.text}
            </Link>
          ))}
          {externalLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors duration-200 font-medium"
            >
              {item.text}
            </a>
          ))}
        </nav>

        <Link
          href="/login"
          className="hidden md:block border-[1px] border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-md font-semibold transition duration-200"
        >
          Login
        </Link>

        <button
          className="md:hidden flex flex-col justify-center items-center gap-1 w-8 h-8"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>

        {menuOpen && (
          <div className="absolute top-20 left-0 w-full bg-[#111827] flex flex-col items-center gap-4 py-6 md:hidden border-t border-white/20 z-1000">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-green-400 transition-colors duration-200 font-medium"
              >
                {item.text}
              </Link>
            ))}
            {externalLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="hover:text-green-400 transition-colors duration-200 font-medium"
              >
                {item.text}
              </a>
            ))}
            <Link
              href="/login"
              className="border-[1px] border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-md font-semibold transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
