"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const DsaLayout = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const topics = [
    {
      id: "arrays",
      title: "Arrays",
      icon: "📊",
      difficulty: "Beginner",
      content: [
        {
          question: "What are Arrays?",
          answer:
            "Arrays are contiguous memory locations that store elements of the same data type. They provide O(1) access time to elements using indices but have fixed size in most programming languages.",
        },
        {
          question: "What are the key operations on Arrays?",
          answer:
            "Key operations include: access (O(1)), search (O(n)), insertion (O(n) at beginning/middle, O(1) at end if space available), deletion (O(n) at beginning/middle, O(1) at end).",
        },
        {
          question: "What are some important Array algorithms?",
          answer:
            "Important algorithms include: Kadane's algorithm (max subarray sum), two-pointer technique, sliding window, Dutch national flag algorithm, and various sorting algorithms.",
        },
      ],
      pdfUrl: "/pdfs/DSA Notes.pdf",
    },
    {
      id: "trees",
      title: "Trees",
      icon: "🌳",
      difficulty: "Intermediate",
      content: [
        {
          question: "What are Trees?",
          answer:
            "Trees are hierarchical data structures consisting of nodes connected by edges. The top node is called the root, and nodes with no children are leaves. Trees provide efficient searching, insertion, and deletion operations.",
        },
        {
          question: "What are Binary Trees and BSTs?",
          answer:
            "Binary Trees have at most two children per node. Binary Search Trees (BSTs) are ordered where left child values are less than parent and right child values are greater, enabling efficient O(log n) search operations.",
        },
        {
          question: "What are common Tree traversal methods?",
          answer:
            "Common traversals include: In-order (left, root, right), Pre-order (root, left, right), Post-order (left, right, root), and Level-order (breadth-first) traversal.",
        },
      ],
      pdfUrl: "/pdfs/DSA Notes.pdf",
    },
    {
      id: "graphs",
      title: "Graphs",
      icon: "🕸️",
      difficulty: "Advanced",
      content: [
        {
          question: "What are Graphs?",
          answer:
            "Graphs are collections of nodes (vertices) connected by edges. They can be directed or undirected, weighted or unweighted. Graphs model complex relationships like networks, maps, and social connections.",
        },
        {
          question: "What are common Graph representations?",
          answer:
            "Common representations include: Adjacency Matrix (2D array), Adjacency List (array of lists), and Edge List. Each has different space and time complexity tradeoffs.",
        },
        {
          question: "What are essential Graph algorithms?",
          answer:
            "Essential algorithms include: Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra's algorithm (shortest path), Bellman-Ford, Floyd-Warshall, and topological sorting for directed acyclic graphs.",
        },
      ],
      pdfUrl: "/pdfs/DSA Notes.pdf",
    },
    {
      id: "dp",
      title: "Dynamic Programming",
      icon: "⚡",
      difficulty: "Advanced",
      content: [
        {
          question: "What is Dynamic Programming?",
          answer:
            "Dynamic Programming is an optimization technique that solves complex problems by breaking them into overlapping subproblems and storing their solutions to avoid recomputation. It follows the principle of optimality.",
        },
        {
          question: "What are the approaches to DP?",
          answer:
            "Two main approaches: 1) Top-down with Memoization (recursive with caching), 2) Bottom-up with Tabulation (iterative, building solutions from smallest subproblems).",
        },
        {
          question: "What are classic DP problems?",
          answer:
            "Classic problems include: Fibonacci sequence, Knapsack problem, Longest Common Subsequence, Matrix Chain Multiplication, Coin Change problem, and Edit Distance.",
        },
      ],
      pdfUrl: "/pdfs/DSA Notes.pdf",
    },
    {
      id: "linkedlists",
      title: "Linked Lists",
      icon: "🔗",
      difficulty: "Beginner",
      content: [
        {
          question: "What are Linked Lists?",
          answer:
            "Linked Lists are linear data structures where elements are stored in nodes, each containing a reference to the next node. Unlike arrays, they don't require contiguous memory and can dynamically grow/shrink.",
        },
        {
          question: "What are types of Linked Lists?",
          answer:
            "Types include: Singly Linked List (one direction), Doubly Linked List (forward and backward pointers), Circular Linked List (last node points to first). Each has different tradeoffs for memory and operations.",
        },
        {
          question: "What are common Linked List operations?",
          answer:
            "Common operations: insertion/deletion at head (O(1)), insertion/deletion at tail (O(1) with tail pointer, else O(n)), search (O(n)), and reversal (O(n)).",
        },
      ],
      pdfUrl: "/pdfs/DSA Notes.pdf",
    },
    {
      id: "stacksqueues",
      title: "Stacks & Queues",
      icon: "📚",
      difficulty: "Beginner",
      content: [
        {
          question: "What are Stacks and Queues?",
          answer:
            "Stacks follow LIFO (Last-In-First-Out) principle, while Queues follow FIFO (First-In-First-Out). Both are abstract data types that restrict how elements are added and removed.",
        },
        {
          question: "What are common operations?",
          answer:
            "Stack operations: push (add to top), pop (remove from top), peek (view top). Queue operations: enqueue (add to rear), dequeue (remove from front), peek (view front).",
        },
        {
          question: "What are real-world applications?",
          answer:
            "Stack applications: function call management, undo/redo, expression evaluation. Queue applications: task scheduling, breadth-first search, handling requests in web servers.",
        },
      ],
      pdfUrl: "/pdfs/DSA Notes.pdf",
    },
    {
      id: "hashing",
      title: "Hashing",
      icon: "🔑",
      difficulty: "Intermediate",
      content: [
        {
          question: "What is Hashing?",
          answer:
            "Hashing is a technique that maps data of arbitrary size to fixed-size values using a hash function. It enables efficient data retrieval, insertion, and deletion in O(1) average time complexity.",
        },
        {
          question: "What are Hash Tables?",
          answer:
            "Hash Tables implement associative arrays using hash functions. They consist of an array of buckets where key-value pairs are stored. Collisions (same hash for different keys) are handled by chaining or open addressing.",
        },
        {
          question: "What are applications of Hashing?",
          answer:
            "Applications include: databases (indexing), caches, sets, cryptography, compiler operations, and pattern matching algorithms like Rabin-Karp.",
        },
      ],
      pdfUrl: "/pdfs/DSA Notes.pdf",
    },
    {
      id: "sorting",
      title: "Sorting Algorithms",
      icon: "📈",
      difficulty: "Intermediate",
      content: [
        {
          question: "What are comparison-based sorting algorithms?",
          answer:
            "Comparison-based algorithms compare elements to determine order. Examples: QuickSort (O(n log n) avg, O(n²) worst), MergeSort (O(n log n) always), HeapSort (O(n log n)), BubbleSort (O(n²)).",
        },
        {
          question: "What are non-comparison sorting algorithms?",
          answer:
            "Non-comparison algorithms use other properties: Counting Sort (O(n + k)), Radix Sort (O(nk)), Bucket Sort (O(n + k)). These can achieve linear time but have specific input requirements.",
        },
        {
          question: "How to choose a sorting algorithm?",
          answer:
            "Consider: input size, whether data is partially sorted, memory constraints (in-place vs extra memory), stability requirement, and worst-case vs average-case performance needs.",
        },
      ],
      pdfUrl: "/pdfs/DSA Notes.pdf",
    },
    {
      id: "greedy",
      title: "Greedy Algorithms",
      icon: "🎯",
      difficulty: "Intermediate",
      content: [
        {
          question: "What are Greedy Algorithms?",
          answer:
            "Greedy algorithms make locally optimal choices at each step with the hope of finding a global optimum. They're efficient but don't always produce the optimal solution for all problems.",
        },
        {
          question: "What are properties of Greedy problems?",
          answer:
            "Greedy problems typically have: greedy choice property (local optimum leads to global optimum) and optimal substructure (optimal solution contains optimal solutions to subproblems).",
        },
        {
          question: "What are classic Greedy algorithms?",
          answer:
            "Classic examples: Dijkstra's algorithm (shortest path), Kruskal's and Prim's algorithms (minimum spanning trees), Huffman coding (data compression), and Fractional Knapsack problem.",
        },
      ],
      pdfUrl: "/pdfs/DSA Notes.pdf",
    },
  ];

  // Filter topics based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = topics.filter(
        (topic) =>
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.content.some((item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setFilteredTopics(filtered);
    } else {
      setFilteredTopics(topics);
    }
  }, [searchQuery]);

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

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded-lg w-1/3 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 h-[70vh]">
            <div className="w-full lg:w-1/4 space-y-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
            <div className="w-full lg:w-3/4 bg-white rounded-xl shadow-lg p-6">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              <Link href="/dsa" className="hover:underline">DSA</Link> Study Materials
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master Data Structures and Algorithms for technical interviews
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['Arrays', 'Trees', 'Graphs', 'DP', 'Linked Lists', 'Sorting', 'Hashing'].map((topic) => (
              <span key={topic} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search DSA topics..."
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
                                  {topic.difficulty}
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
                                  "/pdfs/DSA Notes.pdf",
                                  `${topic.title} - Code Examples.pdf`
                                )
                              }
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md"
                            >
                              💻 Code Examples
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

export default DsaLayout;