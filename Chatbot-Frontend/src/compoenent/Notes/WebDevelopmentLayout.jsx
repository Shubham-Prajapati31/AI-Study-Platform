"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const WebDevelopmentLayout = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    {
      id: "html",
      title: "HTML",
      icon: "🌐",
      content: [
        {
          question: "What is HTML?",
          answer:
            "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page and consists of a series of elements that tell the browser how to display content.",
        },
        {
          question: "What are HTML semantic elements?",
          answer:
            "Semantic elements clearly describe their meaning to both the browser and developer. Examples include <header>, <footer>, <article>, and <section> which define different parts of a web page.",
        },
        {
          question: "How do forms work in HTML?",
          answer:
            "HTML forms are used to collect user input. The <form> element wraps input elements like text fields, checkboxes, radio buttons, and submit buttons. Data is sent to a server for processing when the form is submitted.",
        },
      ],
      pdfUrl: "/pdfs/Web Notes.pdf",
    },
    {
      id: "css",
      title: "CSS",
      icon: "🎨",
      content: [
        {
          question: "What is CSS?",
          answer:
            "CSS (Cascading Style Sheets) is used to style and layout web pages. It controls the visual presentation of HTML elements including colors, spacing, fonts, and responsive design for different screen sizes.",
        },
        {
          question: "What is the CSS Box Model?",
          answer:
            "The CSS box model describes the rectangular boxes generated for elements. It consists of: content, padding, border, and margin. Understanding this is crucial for layout design.",
        },
        {
          question: "What are CSS Flexbox and Grid?",
          answer:
            "Flexbox is a one-dimensional layout method for arranging items in rows or columns. Grid is a two-dimensional layout system that handles both rows and columns. Both make complex layouts easier to create.",
        },
      ],
      pdfUrl: "/pdfs/Web Notes.pdf",
    },
    {
      id: "react",
      title: "React",
      icon: "⚛️",
      content: [
        {
          question: "What is React?",
          answer:
            "React is a JavaScript library for building user interfaces, particularly single-page applications. It allows developers to create reusable UI components and efficiently update and render them when data changes.",
        },
        {
          question: "What are React hooks?",
          answer:
            "Hooks are functions that let you use state and other React features without writing a class. The most common hooks are useState for managing state and useEffect for handling side effects.",
        },
        {
          question: "How does React handle data flow?",
          answer:
            "React uses a unidirectional data flow. Data is passed from parent to child components via props. To share data between components that aren't directly connected, Context API or state management libraries are used.",
        },
      ],
      pdfUrl: "/pdfs/Web Notes.pdf",
    },
    {
      id: "nodejs",
      title: "Node.js",
      icon: "🟢",
      content: [
        {
          question: "What is Node.js?",
          answer:
            "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript on the server side, enabling full-stack JavaScript development.",
        },
        {
          question: "What is the Node Package Manager (NPM)?",
          answer:
            "NPM is the default package manager for Node.js. It consists of a command-line client and an online database of public and paid-for private packages, called the npm registry.",
        },
        {
          question: "How does Node.js handle asynchronous operations?",
          answer:
            "Node.js uses an event-driven, non-blocking I/O model. It employs a single-threaded event loop architecture that makes it lightweight and efficient, perfect for data-intensive real-time applications.",
        },
      ],
      pdfUrl: "/pdfs/Web Notes.pdf",
    },
    {
      id: "javascript",
      title: "JavaScript",
      icon: "📜",
      content: [
        {
          question: "What is JavaScript?",
          answer:
            "JavaScript is a programming language that enables interactive web pages. It is an essential part of web applications and is supported by all modern web browsers without need for plugins.",
        },
        {
          question: "What are JavaScript ES6 features?",
          answer:
            "ES6 (ECMAScript 2015) introduced many new features including: arrow functions, classes, template literals, let and const declarations, promises, and destructuring assignments.",
        },
        {
          question: "What is asynchronous JavaScript?",
          answer:
            "Asynchronous JavaScript allows code to run without blocking the execution of other code. This is handled through callbacks, promises, and async/await syntax, which is essential for operations like API calls.",
        },
      ],
      pdfUrl: "/pdfs/Web Notes.pdf",
    },
    {
      id: "responsive",
      title: "Responsive Design",
      icon: "📱",
      content: [
        {
          question: "What is responsive web design?",
          answer:
            "Responsive web design makes web pages render well on a variety of devices and window sizes. It uses flexible layouts, flexible images, and CSS media queries to adapt the layout to the viewing environment.",
        },
        {
          question: "What are CSS media queries?",
          answer:
            "Media queries allow you to apply CSS styles depending on device characteristics such as screen width, height, orientation, and resolution. They are a key component of responsive design.",
        },
        {
          question: "What are mobile-first design principles?",
          answer:
            "Mobile-first design involves designing the mobile experience first then using media queries to progressively enhance the experience for larger screens. This approach prioritizes performance and content on mobile devices.",
        },
      ],
      pdfUrl: "/pdfs/Web Notes.pdf",
    },
    {
      id: "apis",
      title: "APIs & REST",
      icon: "🔌",
      content: [
        {
          question: "What is an API?",
          answer:
            "An API (Application Programming Interface) is a set of rules that allows programs to talk to each other. Web APIs expose data and functionality over HTTP, typically returning JSON or XML.",
        },
        {
          question: "What is REST?",
          answer:
            "REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful systems use HTTP requests to perform CRUD (Create, Read, Update, Delete) operations.",
        },
        {
          question: "What are HTTP methods in REST?",
          answer:
            "The main HTTP methods used in REST APIs are: GET (retrieve data), POST (create data), PUT (update data), PATCH (partially update data), and DELETE (remove data).",
        },
      ],
      pdfUrl: "/pdfs/Web Notes.pdf",
    },
    {
      id: "databases",
      title: "Databases",
      icon: "🗄️",
      content: [
        {
          question: "What are SQL databases?",
          answer:
            "SQL databases (like MySQL, PostgreSQL) use structured query language and have a predefined schema. They're relational, table-based databases that ensure data integrity through ACID compliance.",
        },
        {
          question: "What are NoSQL databases?",
          answer:
            "NoSQL databases (like MongoDB, Redis) provide a mechanism for storage and retrieval of data that is modeled differently from tabular relations. They're often document-oriented, distributed, and have flexible schemas.",
        },
        {
          question: "What is ORM?",
          answer:
            "ORM (Object-Relational Mapping) is a technique that lets you query and manipulate data from a database using an object-oriented paradigm. Examples include Sequelize for Node.js and Mongoose for MongoDB.",
        },
      ],
      pdfUrl: "/pdfs/Web Notes.pdf",
    },
    {
      id: "deployment",
      title: "Deployment",
      icon: "🚀",
      content: [
        {
          question: "What are common deployment platforms?",
          answer:
            "Popular deployment platforms include Netlify and Vercel for frontend applications, Heroku for full-stack apps, AWS/Azure/Google Cloud for scalable infrastructure, and GitHub Pages for static sites.",
        },
        {
          question: "What is CI/CD?",
          answer:
            "CI/CD (Continuous Integration/Continuous Deployment) is a method to frequently deliver apps by introducing automation. CI focuses on automatically testing and building code, while CD automates deployment.",
        },
        {
          question: "What are environment variables?",
          answer:
            "Environment variables are dynamic values that can affect how running processes behave. They're used to store configuration settings, API keys, and database URLs separately from code for security.",
        },
      ],
      pdfUrl: "/pdfs/Web Notes.pdf",
    },
  ];

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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              <Link href="/web-development" className="hover:underline">Web Development</Link> Study Materials
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master the fundamentals of modern web development
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['HTML', 'CSS', 'React', 'Node.js', 'JavaScript', 'Responsive Design'].map((topic) => (
              <span key={topic} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 h-[70vh]">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 pr-2">
            <div className="h-full overflow-y-auto custom-scrollbar-sidebar bg-white rounded-xl p-2 shadow-sm">
              <div className="space-y-2">
                {topics.map((topic) => (
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
                  </motion.div>
                ))}
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
                              <h2 className="text-2xl font-semibold text-gray-800">
                                {topic.title}
                              </h2>
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
                                  "/pdfs/Web Notes.pdf",
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

export default WebDevelopmentLayout;