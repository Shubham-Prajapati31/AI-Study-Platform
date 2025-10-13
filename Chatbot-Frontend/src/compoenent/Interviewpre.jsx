'use client';

import { motion } from 'framer-motion';
import { FaUserTie, FaPuzzlePiece, FaFileAlt, FaCode } from 'react-icons/fa';
import Link from 'next/link';

const items = [
  {
    title: 'HR Questions',
    desc: 'Behavioral interview prep',
    icon: <FaUserTie size={28} className="text-white" />,
    gradient: 'from-blue-500 to-cyan-400',
    link: '/hr-questions', 
  },
  {
    title: 'Technical MCQs',
    desc: 'Subject-wise questions',
    icon: <FaPuzzlePiece size={28} className="text-white" />,
    gradient: 'from-green-500 to-emerald-400',
    link: '/QuizApp',
  },
  {
    title: 'Resume Tips',
    desc: 'Build impressive resumes',
    icon: <FaFileAlt size={28} className="text-white" />,
    gradient: 'from-pink-500 to-purple-500',
    link: '/ResumeTips',
  },
  {
    title: 'Coding Practice',
    desc: 'Algorithm challenges',
    icon: <FaCode size={28} className="text-white" />,
    gradient: 'from-orange-500 to-red-400',
    link: '/CodingPracticePage',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export default function InterviewPrep() {
  return (
    <div className="py-20 px-4 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-purple-600 flex justify-center items-center gap-2">
          <span role="img">💣</span> Interview Preparation
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Get ready for your dream job
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {items.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-xl transition-all duration-300"
          >
            {/* Top gradient bar */}
            <div className={`h-1.5 rounded-t-xl bg-gradient-to-r ${item.gradient}`} />

            {/* Card content */}
            <div className="p-6 text-center">
              <div
                className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center mb-4 shadow-md`}
              >
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-gray-500 text-sm mb-5">{item.desc}</p>

              {/* Button with link */}
              <Link href={item.link}>
                <button className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition flex items-center gap-1 mx-auto">
                  Start Prep →
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
