"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaArrowLeft, FaGoogleDrive, FaStar, FaHistory, FaBook, FaGraduationCap } from "react-icons/fa";

// Data structure for all departments and their drive links
const departmentData = {
  "B.Sc": {
    years: ["F.Y.B.Sc", "S.Y.B.Sc", "T.Y.B.Sc"],
    driveLinks: {
      "F.Y.B.Sc": "https://drive.google.com/drive/folders/1y8sUXNtYQqiF8v-Wgtw-wquPeZaCEzi2",
      "S.Y.B.Sc": "https://drive.google.com/drive/folders/172olguofLqEwiWgM7l4nGkF5JGCpIQ2_",
      "T.Y.B.Sc": "https://drive.google.com/drive/folders/1x0ZOZGiPL9raLQmNiiWy_w1d12a0DZum",
    },
    color: "from-blue-500 to-cyan-500",
    icon: <FaBook className="text-2xl" />
  },
  "B.Sc CS": {
    years: ["F.Y.Comp.Sci", "S.Y.Comp.Sci", "T.Y.Comp.Sci"],
    driveLinks: {
      "F.Y.Comp.Sci": "https://drive.google.com/drive/folders/1n1eoMJToaMSQstqdFxSBxUg0eUg4KVq1",
      "S.Y.Comp.Sci": "https://drive.google.com/drive/folders/1d6jJxEoVpo6Bkn7mFWhosIJmrB0l34zw",
      "T.Y.Comp.Sci": "https://drive.google.com/drive/folders/1fQewvi8bRTsdfyCCXXaYq77xnDeby7Bb",
    },
    color: "from-purple-500 to-pink-500",
    icon: <FaGraduationCap className="text-2xl" />
  },
  "B.Sc IT": {
    years: ["F.Y.B.Sc. I.T", "S.Y.B.Sc. I.T"],
    driveLinks: {
      "F.Y.B.Sc. I.T": "https://drive.google.com/drive/folders/11dOlCQ9sIBYtp4CxfjdNCUYCTP1kQ-AS",
      "S.Y.B.Sc. I.T": "https://drive.google.com/drive/folders/1gSaUYsPC0MSfPYqCV0d2zlDmQmqE5d59",
    },
    color: "from-amber-500 to-orange-500",
    icon: <FaBook className="text-2xl" />
  },
  "B.A": {
    years: ["F.Y.B.A", "S.Y.B.A", "T.Y.B.A"],
    driveLinks: {
      "F.Y.B.A": "https://drive.google.com/drive/folders/1fZ0YC2ZpBcx2Y5aC28x672gX_b9B1O3m",
      "S.Y.B.A": "https://drive.google.com/drive/folders/1T4b5mHbJt4W_hF26AZg2iJIQydlsKLRN",
      "T.Y.B.A": "https://drive.google.com/drive/folders/1fMOkpDmRSwmUDMu3iBQxG-ZcTa19VQ0X",
    },
    color: "from-emerald-500 to-teal-500",
    icon: <FaGraduationCap className="text-2xl" />
  },
};

export default function PreviousPapers() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // Reset selections
  const resetSelections = () => {
    setSelectedYear(null);
    setSelectedDepartment(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const cardHover = {
    scale: 1.03,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with floating animation */}
        <motion.div 
          className="text-center mb-12 relative"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative z-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Previous Year Papers
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Access a comprehensive collection of previous year question papers organized by department and year
          </p>
        </motion.div>

        {/* Breadcrumb Navigation */}
        <AnimatePresence>
          {(selectedDepartment || selectedYear) && (
            <motion.div 
              className="flex items-center text-sm text-gray-600 mb-6 bg-white p-4 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <button 
                onClick={resetSelections}
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                All Departments
              </button>
              
              {selectedDepartment && (
                <>
                  <FaChevronRight className="mx-2 text-xs text-gray-400" />
                  <button 
                    onClick={() => setSelectedYear(null)}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    {selectedDepartment}
                  </button>
                </>
              )}
              
              {selectedYear && (
                <>
                  <FaChevronRight className="mx-2 text-xs text-gray-400" />
                  <span className="font-semibold text-purple-700">{selectedYear}</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Department Selection */}
        <AnimatePresence mode="wait">
          {!selectedDepartment && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key="departments"
            >
              {Object.entries(departmentData).map(([dept, data]) => (
                <motion.div
                  key={dept}
                  variants={itemVariants}
                  whileHover={cardHover}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-gradient-to-br ${data.color} rounded-2xl shadow-lg p-6 cursor-pointer border-2 border-transparent transition-all relative overflow-hidden group`}
                  onClick={() => setSelectedDepartment(dept)}
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center">
                      <div className="p-3 rounded-xl bg-white/20 mr-4 text-white">
                        {data.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {dept}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-white/80 mr-2">
                        {data.years.length} years
                      </span>
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <FaChevronRight className="text-white" />
                      </motion.div>
                    </div>
                  </div>
                  <p className="text-white/80 mt-3 relative z-10">
                    Click to view available years
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Year Selection */}
          {selectedDepartment && !selectedYear && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              key="years"
            >
              <div className="md:col-span-2 lg:col-span-3 flex items-center justify-between mb-6 p-5 bg-white rounded-2xl shadow-md">
                <motion.button 
                  onClick={() => setSelectedDepartment(null)}
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <FaArrowLeft className="mr-2" /> Back to Departments
                </motion.button>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <span className="mr-3 text-blue-500">{departmentData[selectedDepartment].icon}</span>
                  {selectedDepartment}
                </h2>
                <div className="w-10"></div> {/* Spacer for balance */}
              </div>

              {departmentData[selectedDepartment].years.map((year) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={cardHover}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer border-2 border-transparent hover:border-blue-200 transition-all relative overflow-hidden group"
                  onClick={() => setSelectedYear(year)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                      {year}
                    </h3>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <FaChevronRight className="text-blue-500" />
                    </motion.div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between relative z-10">
                    <p className="text-gray-600 text-sm">
                      Google Drive folder
                    </p>
                    
                    <motion.a
                      href={departmentData[selectedDepartment].driveLinks[year]}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <FaGoogleDrive className="mr-1" /> Open
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Drive Folder View */}
          {selectedDepartment && selectedYear && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              key="drive-view"
              className="bg-white rounded-2xl shadow-xl p-8 text-center overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedDepartment} - {selectedYear}
                  </h2>
                  <p className="text-gray-600">
                    Google Drive folder with all papers
                  </p>
                </div>
                
                <motion.button 
                  onClick={() => setSelectedYear(null)}
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors mt-4 md:mt-0"
                >
                  <FaArrowLeft className="mr-2" /> Back to Years
                </motion.button>
              </div>

              <div className="mb-8">
                <motion.div 
                  className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-6"
                  whileHover={{ rotate: [0, -5, 0, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaGoogleDrive className="text-4xl text-blue-600" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Google Drive Folder
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  All previous year papers for {selectedYear} {selectedDepartment} are available in this Google Drive folder.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                <motion.div 
                  className="bg-blue-50 p-5 rounded-2xl text-left border border-blue-100"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <FaHistory className="mr-2" /> How to Access
                  </h4>
                  <ul className="text-sm text-blue-700 list-disc pl-5 space-y-2">
                    <li>Click the button below to open the folder</li>
                    <li>Browse through the available papers</li>
                    <li>Download any paper you need</li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="bg-indigo-50 p-5 rounded-2xl text-left border border-indigo-100"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                >
                  <h4 className="font-semibold text-indigo-800 mb-3 flex items-center">
                    <FaStar className="mr-2" /> Tips
                  </h4>
                  <ul className="text-sm text-indigo-700 list-disc pl-5 space-y-2">
                    <li>Use the search function in Google Drive</li>
                    <li>Sort files by name or date</li>
                    <li>Add to your own Drive for easy access</li>
                  </ul>
                </motion.div>
              </div>

              <motion.a
                href={departmentData[selectedDepartment].driveLinks[selectedYear]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-lg font-medium"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                >
                  <FaGoogleDrive className="text-xl" />
                </motion.div>
                Open Google Drive Folder
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}