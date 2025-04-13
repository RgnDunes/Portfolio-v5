"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { navigation } from "@/data/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 right-0 top-0 z-40 ${
        scrolled ? "bg-[#0F172A]/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="#"
              className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent hover:opacity-80"
            >
              DS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 transition-colors hover:text-gray-100"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-md border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800"
            >
              Resume
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-gray-100 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/95 backdrop-blur-md md:hidden">
          <div className="fixed inset-0 flex h-full flex-col overflow-y-auto bg-[#0F172A]">
            {/* Mobile menu header */}
            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-4">
              <Link
                href="#"
                className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent"
                onClick={() => setIsOpen(false)}
              >
                DS
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-gray-100 focus:outline-none"
                aria-label="Close menu"
              >
                <FaTimes className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {/* Mobile menu content */}
            <div className="flex-1 px-4 pb-6 pt-4">
              <div className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-1 rounded-lg border border-gray-700 px-4 py-3 text-base font-medium text-gray-300 transition-colors hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  Resume
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
