"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaGamepad } from "react-icons/fa";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import portfolioLogo from "../assets/images/portfolio-logo.png";

const navigation = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "/blog" },
  { name: "Series", href: "/series" },
  { name: "Contact", href: "#contact" },
];

const resumePath = "/resume.pdf";

interface NavbarProps {
  onGameModeToggle?: () => void;
}

export default function NavbarModern({ onGameModeToggle }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(245, 240, 232, 0.8)", "rgba(245, 240, 232, 0.95)"]
  );

  const backdropBlur = useTransform(scrollY, [0, 100], [8, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/20 shadow-lg"
            : "border-b border-transparent"
        }`}
        style={{
          backdropFilter: `blur(${backdropBlur}px)`,
          WebkitBackdropFilter: `blur(${backdropBlur}px)`,
        }}
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: scrolled
              ? "rgba(245, 240, 232, 0.95)"
              : "rgba(245, 240, 232, 0.8)",
          }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center"
            >
              <Link href="/" className="group relative flex items-center gap-3">
                <div className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={portfolioLogo}
                    alt="DS Logo"
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>
                <span className="hidden font-serif text-xl font-bold text-ink transition-colors duration-300 group-hover:text-accent sm:inline">
                  Divyansh Singh
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-2 lg:flex">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="group relative px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-accent"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-0 -z-0 scale-0 rounded-lg bg-accent/10 transition-transform duration-300 group-hover:scale-100" />
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-accent transition-all duration-300 group-hover:w-3/4" />
                  </Link>
                </motion.div>
              ))}

              {/* Resume Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.a
                  href={resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-strong ml-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:bg-white/30"
                >
                  Resume
                </motion.a>
              </motion.div>

              {/* Game Mode Toggle */}
              {onGameModeToggle && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onGameModeToggle}
                  className="group relative ml-2 flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-accent to-accent2 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-accent/50"
                >
                  <FaGamepad className="relative z-10 text-sm" />
                  <span className="relative z-10">
                    3D <sup className="text-[9px] opacity-80">Beta</sup>
                  </span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-accent2 to-accent opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.button>
              )}
            </div>

            {/* Mobile menu button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={() => setIsOpen(!isOpen)}
              className="glass-strong rounded-lg p-2 text-ink lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-20 z-40 w-full overflow-hidden lg:hidden"
      >
        <div className="glass-strong border-b border-white/20 px-4 py-6 shadow-2xl">
          <div className="flex flex-col gap-4">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-ink transition-all hover:bg-accent/10 hover:text-accent"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                x: isOpen ? 0 : -20,
              }}
              transition={{ duration: 0.3, delay: navigation.length * 0.05 }}
              className="mt-2 flex flex-col gap-3"
            >
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-strong rounded-lg px-4 py-3 text-center text-base font-semibold text-ink transition-all hover:bg-white/30"
              >
                Download Resume
              </a>

              {onGameModeToggle && (
                <button
                  onClick={() => {
                    onGameModeToggle();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent2 px-4 py-3 text-base font-semibold text-white shadow-lg"
                >
                  <FaGamepad />
                  <span>
                    3D Mode <sup className="text-[10px] opacity-80">Beta</sup>
                  </span>
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
