"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaArrowUp,
  FaHeart,
  FaLinkedin,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";
import { motion } from "framer-motion";

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// 🔹 Define link arrays
const quickLinks = [
  { name: "Study Hub", href: "/study-hub#study-materials-section" },
  { name: "Quizzes", href: "/QuizApp" },
  { name: "Videos", href: "/VideoLearningHub#video-hub-section" },
  { name: "Projects", href: "/project-ideas#project-ideas-section" },
];

const resources = [
  { name: "Downloads", href: "/DownloadCenter#downloads-section" },
  { name: "Interview Prep", href: "/hr-questions" },
  { name: "Code Editor", href: "/CodingPracticePage" },
  { name: "AI Chatbot", href: "/Chatbot#chatbot-section" },
];

const connectLinks = [
  { name: "About", href: "/#about-section" },
  { name: "Contact", href: "/#contact-section" },
  { name: "Terms", href: "/terms#terms-section" },
  { name: "Privacy", href: "/privacy#privacy-section" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔹 Smooth scroll handler
  const handleScroll = (e, href) => {
    if (href.includes("#")) {
      e.preventDefault();
      const targetId = href.split("#")[1];
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      } else {
        // section not on this page → navigate
        window.location.href = href;
      }
    }
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-gray-300 px-6 py-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Image
              src="/images/brain-icon2.png"
              alt="Logo"
              width={60}
              height={60}
              className="object-contain"
            />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition duration-300">
              AI Study Platform
            </span>
          </div>
          <p className="mt-3 text-sm">
            Built with <FaHeart className="inline text-red-500 mx-1" /> for
            Computer Science students
          </p>
          <p className="mt-1 text-sm">
            Created by{" "}
            <span className="text-blue-400 hover:underline">
              Shubham Prajapati
            </span>{" "}
            💻
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-lg">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link, index) => (
              <li key={index}>
                {link.href.includes("#") ? (
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="transition duration-300 hover:text-purple-400 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="transition duration-300 hover:text-purple-400 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-lg">Resources</h4>
          <ul className="space-y-2 text-sm">
            {resources.map((link, index) => (
              <li key={index}>
                {link.href.includes("#") ? (
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="transition duration-300 hover:text-teal-400 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="transition duration-300 hover:text-teal-400 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-lg">Connect</h4>
          <ul className="space-y-2 text-sm">
            {connectLinks.map((link, index) => (
              <li key={index}>
                {link.href.includes("#") ? (
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="transition duration-300 hover:text-pink-400 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="transition duration-300 hover:text-pink-400 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="flex space-x-5 pt-2 text-3xl">
            <Link
              href="https://www.linkedin.com/in/shubham-prajapati31/"
              target="_blank"
              className="hover:text-sky-400 transition duration-300"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="https://github.com/Shubham-Prajapati31"
              target="_blank"
              className="hover:text-gray-400 transition duration-300"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://www.youtube.com/@MonuGamerVerified/featured"
              target="_blank"
              className="hover:text-red-500 transition duration-300"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © 2024 AI Study Platform. All rights reserved.
      </div>

      {/* Scroll To Top Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg flex items-center justify-center z-50"
      >
        <FaArrowUp size={18} />
      </motion.button>
    </motion.footer>
  );
};

export default Footer;
