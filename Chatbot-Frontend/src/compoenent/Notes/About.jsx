"use client";

import { motion } from "framer-motion";
import { FaBrain, FaRocket, FaUsers, FaCode } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-16">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          About AI Study Portal
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Your one-stop platform for <span className="text-purple-400">learning</span>, 
          <span className="text-blue-400"> practicing</span>, and 
          <span className="text-pink-400"> building</span> computer science skills 🚀
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {[
          {
            icon: <FaBrain size={40} className="text-purple-400" />,
            title: "Smart Learning",
            desc: "Interactive study hub with notes, quizzes, and video tutorials for CS concepts.",
          },
          {
            icon: <FaRocket size={40} className="text-blue-400" />,
            title: "Projects & Ideas",
            desc: "Explore final year project ideas and resources to build real-world applications.",
          },
          {
            icon: <FaUsers size={40} className="text-green-400" />,
            title: "Community Driven",
            desc: "Built for students to learn, share, and grow together in their coding journey.",
          },
          {
            icon: <FaCode size={40} className="text-pink-400" />,
            title: "Tools & AI",
            desc: "Access coding practice, interview prep, and an AI-powered chatbot for doubt solving.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-purple-500/20 transition-transform transform hover:-translate-y-2"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-20 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Our Mission
        </h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          The AI Study Portal was created to make computer science learning more{" "}
          <span className="text-blue-400">accessible</span>,{" "}
          <span className="text-purple-400">interactive</span>, and{" "}
          <span className="text-pink-400">fun</span>.  
          From study materials to project ideas, and from interview prep to coding practice, 
          this platform aims to guide students throughout their journey.
        </p>
      </motion.div>

      {/* Creator Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-white">👨‍💻 Creator</h2>
        <p className="text-gray-300 text-lg">
          This project is built by{" "}
          <span className="font-bold text-purple-400">Shubham Prajapati</span>,  
          a passionate Computer Science student, content creator, and aspiring software developer.
        </p>
      </motion.div>
    </div>
  );
}
