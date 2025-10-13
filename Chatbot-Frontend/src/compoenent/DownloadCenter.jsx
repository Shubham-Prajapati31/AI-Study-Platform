'use client';

import { motion } from 'framer-motion';
import { FaFileAlt, FaBookOpen, FaDownload, FaUserFriends } from 'react-icons/fa';
import { useEffect } from 'react';
import Link from 'next/link';

const resources = [
  {
    title: 'Previous Year Papers',
    files: '50+ files',
    icon: <FaFileAlt size={30} className="text-white" />,
    gradient: 'from-blue-500 to-cyan-400',
    description: 'Collection of last 5 years question papers with solutions',
    link: '/PreviousPapers'
  },
  {
    title: 'Lab Manuals',
    files: '25+ files',
    icon: <FaBookOpen size={30} className="text-white" />,
    gradient: 'from-green-500 to-emerald-400',
    description: 'Detailed lab procedures and experiment guides',
    link: 'https://drive.google.com/drive/folders/1edWz6kn3EqWu__y16-1fiZ4U2XCxstw3?usp=sharing'
  },
  {
    title: 'PDF Summaries',
    files: '100+ files',
    icon: <FaDownload size={30} className="text-white" />,
    gradient: 'from-purple-500 to-pink-400',
    description: 'Condensed notes for quick revision',
    link: '/PdfSummaries'
  },
  {
    title: 'Interview Guides',
    files: '30+ files',
    icon: <FaUserFriends size={30} className="text-white" />,
    gradient: 'from-orange-500 to-red-400',
    description: 'Company-wise interview preparation materials',
    link: '/InterviewGuides'
  },
];

export default function DownloadCenter() {
  // Handle scroll to section when page loads with hash
  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 pb-20">
      {/* Scroll target section with proper offset for navbar */}
      <section id="downloads-section" className="pt-24 -mt-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-green-600 flex items-center justify-center gap-2"
            >
              <span role="img">📁</span> Download Center
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-gray-600 mt-2 text-lg"
            >
              Essential study materials at your fingertips
            </motion.p>
          </div>

          {/* Resource Cards Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {resources.map((item, index) => (
              <Link key={index} href={item.link} className="block">
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 cursor-pointer"
                >
                  <div className={`h-2 w-full bg-gradient-to-r ${item.gradient}`} />
                  
                  <div className="p-6 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                      {item.icon}
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{item.description}</p>
                    
                    <span className="text-xs bg-gray-100 rounded-full px-3 py-1 text-gray-600 mb-4">
                      {item.files} available
                    </span>
                    
                    <div className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition">
                      <FaDownload className="text-white" />
                      Browse Files
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Additional Download Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-white rounded-xl shadow-md p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Download</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <p className="text-gray-600">Click on any resource category above</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <p className="text-gray-600">Browse available files and select what you need</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <p className="text-gray-600">Download instantly with one click</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}