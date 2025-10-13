"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Moon, LogOut } from "lucide-react";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/AboutPage" },
    { name: "Chatbot", href: "/Chatbot" },
    { name: "Study Hub", href: "/VideoLearningHub#video-hub-section" },
    { name: "Project Ideas", href: "/project-ideas#project-ideas-section" },
    { name: "Downloads", href: "/DownloadCenter#downloads-section" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setShowLogoutConfirm(false);
    window.location.reload();
  };

  const handleScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.split("#")[1];
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  // Extract initials from name
  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    const initials = names.map((n) => n[0].toUpperCase());
    return initials.slice(0, 2).join("");
  };

  // Hamburger animation variants
  const menuVariants = { open: { rotate: 45, y: 5 }, closed: { rotate: 0, y: 0 } };
  const menuLine2Variants = { open: { opacity: 0 }, closed: { opacity: 1 } };
  const menuLine3Variants = { open: { rotate: -45, y: -5 }, closed: { rotate: 0, y: 0 } };

  return (
    <>
      {/* Navbar */}
      <header className="bg-gradient-to-r from-[#eef3fe] to-[#f5f8ff] shadow-md w-full z-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image src="/images/brain-icon2.png" alt="Logo" width={45} height={45} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Study Platform
            </h1>
          </div>

          {/* Mobile user initials avatar */}
          {user && (
            <div className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-sm">
              {getInitials(user.name)}
            </div>
          )}

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
            {navLinks.map((link, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.1 }}
                className="hover:text-purple-600 transition-colors duration-300 cursor-pointer"
              >
                {link.href.includes("#") ? (
                  <a href={link.href} onClick={(e) => handleScroll(e, link.href)}>
                    {link.name}
                  </a>
                ) : (
                  <Link href={link.href}>{link.name}</Link>
                )}
              </motion.li>
            ))}
            <li>
              <Moon className="w-5 h-5 cursor-pointer hover:text-purple-600 transition duration-200" />
            </li>
          </ul>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Desktop login/logout */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-full">
                    <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {user.name}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowLogoutConfirm(true)}
                    className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  <Link href="/AuthSystem">Login / Register</Link>
                </motion.button>
              )}
            </div>

            {/* Hamburger Button */}
            <div
              className="md:hidden flex flex-col justify-between w-7 h-5 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.span
                variants={menuVariants}
                animate={isMenuOpen ? "open" : "closed"}
                className="block h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded"
              />
              <motion.span
                variants={menuLine2Variants}
                animate={isMenuOpen ? "open" : "closed"}
                className="block h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded"
              />
              <motion.span
                variants={menuLine3Variants}
                animate={isMenuOpen ? "open" : "closed"}
                className="block h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded"
              />
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white shadow-lg border-t border-gray-200 rounded-b-2xl"
            >
              <ul className="flex flex-col p-4 space-y-3 font-medium text-gray-700">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ scale: 1.05, x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 px-3 rounded-md bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
                    >
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}

                <li>
                  <button className="flex items-center space-x-2 py-2 text-gray-700">
                    <Moon className="w-5 h-5" />
                    <span>Dark Mode</span>
                  </button>
                </li>

                {user ? (
                  <button
                    onClick={() => {
                      setShowLogoutConfirm(true);
                      setIsMenuOpen(false);
                    }}
                    className="text-red-600 font-semibold text-left py-2 px-3"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/AuthSystem"
                    onClick={() => setIsMenuOpen(false)}
                    className="py-2 px-3 text-blue-600 font-semibold"
                  >
                    Login / Register
                  </Link>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout from your account?</p>
            <div className="flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition duration-200"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Logout
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
