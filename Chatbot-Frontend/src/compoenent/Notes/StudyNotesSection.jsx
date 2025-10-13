"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const NotesPdfLayout = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [filteredTopics, setFilteredTopics] = useState([]);

  const topics = [
    {
      id: "intro",
      title: "Python Introduction",
      icon: "🐍",
      difficulty: "Beginner",
      content: [
        {
          question: "What is Python?",
          answer:
            "Python is a popular programming language created by Guido van Rossum in 1991. It is widely used for web development, software development, mathematics, and system scripting.",
        },
        {
          question: "Why use Python?",
          answer:
            "It runs on multiple platforms, has simple English-like syntax, supports multiple programming paradigms, and allows rapid development.",
        },
        {
          question: "How does Python handle code blocks?",
          answer:
            "Python uses indentation instead of braces to define code blocks, which makes code cleaner and more readable.",
        },
      ],
      pdfUrl: "/pdfs/python-introduction.pdf",
    },
    {
      id: "basics",
      title: "Basic Concepts",
      icon: "🔤",
      difficulty: "Beginner",
      content: [
        {
          question: "What are Python's syntax rules?",
          answer:
            "Python requires indentation (usually 4 spaces) for code blocks. Comments start with the '#' symbol.",
        },
        {
          question: "How are variables and data types handled?",
          answer:
            "Variables are created by assignment without explicit declaration. Common data types include int, float, str, and bool.",
        },
        {
          question: "How does Python handle input and output?",
          answer:
            "You can use input() to accept user input and print() to display output.",
        },
      ],
      pdfUrl: "/pdfs/python-introduction.pdf",
    },
    {
      id: "control",
      title: "Control Structures",
      icon: "🔄",
      difficulty: "Beginner",
      content: [
        {
          question: "What are conditional statements in Python?",
          answer:
            "Python uses if, elif, and else to control program flow based on conditions.",
        },
        {
          question: "How do loops work?",
          answer:
            "for loops iterate over sequences, while loops run until a condition is false. break exits a loop early, and continue skips to the next iteration.",
        },
      ],
      pdfUrl: "/pdfs/python-introduction.pdf",
    },
    {
      id: "functions",
      title: "Functions & Modules",
      icon: "🧩",
      difficulty: "Intermediate",
      content: [
        {
          question: "What is a function in Python?",
          answer:
            "Functions are reusable blocks of code defined using the def keyword.",
        },
        {
          question: "How do modules work?",
          answer:
            "Modules are Python files containing reusable code. They can be imported using import or from ... import syntax.",
        },
      ],
      pdfUrl: "/pdfs/python-introduction.pdf",
    },
    {
      id: "data",
      title: "Data Structures",
      icon: "🗃️",
      difficulty: "Intermediate",
      content: [
        {
          question: "What is a list?",
          answer: "An ordered, mutable collection. Example: [1, 2, 3]",
        },
        {
          question: "What is a tuple?",
          answer: "An ordered, immutable collection. Example: (1, 2, 3)",
        },
        {
          question: "What is a set?",
          answer:
            "An unordered collection of unique elements. Example: {1, 2, 3}",
        },
        {
          question: "What is a dictionary?",
          answer: "A collection of key-value pairs. Example: {'a': 1, 'b': 2}",
        },
      ],
      pdfUrl: "/pdfs/python-introduction.pdf",
    },
    {
      id: "oop",
      title: "OOP in Python",
      icon: "🏗️",
      difficulty: "Intermediate",
      content: [
        {
          question: "What is a class?",
          answer:
            "A blueprint for creating objects, defined using the class keyword.",
        },
        {
          question: "What is inheritance?",
          answer:
            "A mechanism that allows one class to inherit attributes and methods from another.",
        },
      ],
      pdfUrl: "/pdfs/python-introduction.pdf",
    },
    {
      id: "files",
      title: "File Handling",
      icon: "📂",
      difficulty: "Intermediate",
      content: [
        {
          question: "How do you read and write files?",
          answer:
            "Use open() with modes like 'r', 'w', or 'a'. The with open() syntax is recommended because it closes files automatically.",
        },
      ],
      pdfUrl: "/pdfs/python-introduction.pdf",
    },
    {
      id: "exceptions",
      title: "Exception Handling",
      icon: "⚠️",
      difficulty: "Intermediate",
      content: [
        {
          question: "How does Python handle errors?",
          answer:
            "Using try-except blocks to catch exceptions and finally to run cleanup code.",
        },
      ],
      pdfUrl: "/pdfs/python-introduction.pdf",
    },
    {
      id: "libraries",
      title: "Popular Libraries",
      icon: "📚",
      difficulty: "Advanced",
      content: [
        {
          question: "What is NumPy?",
          answer:
            "A library for numerical computing and working with large arrays.",
        },
        {
          question: "What is Pandas?",
          answer:
            "A library for data analysis, especially with DataFrame structures.",
        },
        {
          question: "What is Matplotlib?",
          answer:
            "A library for creating visualizations such as line graphs and bar charts.",
        },
      ],
      pdfUrl: "/pdfs/python-introduction.pdf",
    },
  ];

  // Filter topics based on search query and difficulty
  useEffect(() => {
    let filtered = topics;
    
    // Apply difficulty filter
    if (difficultyFilter !== "All") {
      filtered = filtered.filter(topic => topic.difficulty === difficultyFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        topic =>
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.content.some(item =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }
    
    setFilteredTopics(filtered);
  }, [searchQuery, difficultyFilter]);

  const handleTopicClick = (id) => {
    setSelectedTopic(selectedTopic === id ? null : id);
  };

  // Function to trigger PDF download reliably
  const handleDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Python Study Materials
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Click on any topic to view details
          </p>
          
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search Python topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Difficulty Filter */}
            <div className="flex items-center space-x-2 bg-white p-2 rounded-xl shadow-sm">
              <span className="text-sm font-medium text-gray-700">Difficulty:</span>
              <select 
                value={difficultyFilter} 
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-sm"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
          
          {/* Difficulty Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Beginner: 3 topics
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              Intermediate: 5 topics
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              Advanced: 1 topic
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 h-[70vh]">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 pr-2">
            <div className="h-full overflow-y-auto custom-scrollbar-sidebar bg-white rounded-xl p-2 shadow-sm">
              <div className="space-y-2">
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((topic) => (
                    <motion.div
                      key={topic.id}
                      layout
                      className={`rounded-lg p-4 cursor-pointer transition-all ${
                        selectedTopic === topic.id
                          ? "bg-blue-100 border-l-4 border-blue-500"
                          : "bg-white hover:bg-gray-50 border-l-4 border-transparent"
                      }`}
                      whileHover={{ x: 3 }}
                      onClick={() => handleTopicClick(topic.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{topic.icon}</span>
                          <h2
                            className={`text-lg font-medium ${
                              selectedTopic === topic.id
                                ? "text-blue-700"
                                : "text-gray-800"
                            }`}
                          >
                            {topic.title}
                          </h2>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          topic.difficulty === "Beginner" 
                            ? "bg-green-100 text-green-800" 
                            : topic.difficulty === "Intermediate" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {topic.difficulty}
                        </span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No topics found matching your search
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <AnimatePresence>
              {selectedTopic ? (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-full overflow-hidden"
                >
                  <div className="h-full overflow-y-auto custom-scrollbar-content bg-white rounded-xl shadow-lg border border-gray-200">
                    {(() => {
                      const topic = topics.find((t) => t.id === selectedTopic);
                      return (
                        <div className="p-6">
                          {/* Topic Header */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">
                                {topic.icon}
                              </span>
                              <div>
                                <h2 className="text-2xl font-semibold text-gray-800">
                                  {topic.title}
                                </h2>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  topic.difficulty === "Beginner" 
                                    ? "bg-green-100 text-green-800" 
                                    : topic.difficulty === "Intermediate" 
                                    ? "bg-yellow-100 text-yellow-800" 
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {topic.difficulty} Level
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => setSelectedTopic(null)}
                              className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              ✖
                            </button>
                          </div>

                          {/* Questions */}
                          <div className="space-y-4 mb-6">
                            {topic.content.map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-blue-50 p-4 rounded-lg border border-blue-100"
                              >
                                <h3 className="text-lg font-medium text-blue-700 mb-2">
                                  {item.question}
                                </h3>
                                <p className="text-gray-700">{item.answer}</p>
                              </motion.div>
                            ))}
                          </div>

                          {/* Download & Code Example Buttons */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex justify-end gap-3"
                          >
                            {/* Code Example Button */}
                            <button
                              onClick={() =>
                                handleDownload(
                                  "/pdfs/python-Code-Examples.pdf",
                                  `${topic.title} - Code Example.pdf`
                                )
                              }
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md"
                            >
                              💻 Code Example
                            </button>

                            {/* Download PDF Button */}
                            <button
                              onClick={() =>
                                handleDownload(
                                  topic.pdfUrl,
                                  `${topic.title}.pdf`
                                )
                              }
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md"
                            >
                              📄 Download PDF
                            </button>
                          </motion.div>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hidden lg:flex h-full bg-white/50 rounded-xl border-2 border-dashed border-gray-300 items-center justify-center"
                >
                  <div className="text-center p-8">
                    <div className="text-5xl mb-4">👈</div>
                    <h3 className="text-xl font-medium text-gray-600">
                      Select a topic to view details
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Click on any topic from the left column
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar-sidebar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar-sidebar::-webkit-scrollbar-thumb {
          background-color: #93c5fd;
          border-radius: 10px;
        }
        .custom-scrollbar-content::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar-content::-webkit-scrollbar-thumb {
          background-color: #818cf8;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default NotesPdfLayout;