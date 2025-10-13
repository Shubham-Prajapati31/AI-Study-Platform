// pages/index.js or components/QuizApp.jsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Quiz data for all subjects
const quizData = {
  dsa: {
    name: "Data Structures & Algorithms",
    icon: "📊",
    questions: [
      {
        question: "What is the time complexity of binary search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        answer: 1
      },
      {
        question: "Which data structure uses LIFO principle?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        answer: 1
      },
      {
        question: "What is the worst-case time complexity of QuickSort?",
        options: ["O(n log n)", "O(n²)", "O(log n)", "O(n)"],
        answer: 1
      },
      {
        question: "Which algorithm is used for shortest path in unweighted graphs?",
        options: ["Dijkstra", "BFS", "DFS", "Prim's"],
        answer: 1
      },
      {
        question: "What is the space complexity of merge sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        answer: 2
      }
    ]
  },
  dbms: {
    name: "Database Management Systems",
    icon: "💾",
    questions: [
      {
        question: "What does ACID stand for in DBMS?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Accuracy, Consistency, Isolation, Durability",
          "Atomicity, Consistency, Integrity, Durability",
          "Atomicity, Concurrency, Isolation, Durability"
        ],
        answer: 0
      },
      {
        question: "Which normal form eliminates transitive dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        answer: 2
      },
      {
        question: "Which SQL command is used to remove a table?",
        options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"],
        answer: 1
      },
      {
        question: "What is a primary key?",
        options: [
          "A key that can be NULL",
          "A key that uniquely identifies each record",
          "A key that references another table",
          "A key that is used for encryption"
        ],
        answer: 1
      },
      {
        question: "Which join returns all records when there is a match in either left or right table?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        answer: 3
      }
    ]
  },
  os: {
    name: "Operating Systems",
    icon: "💻",
    questions: [
      {
        question: "What is the main purpose of an operating system?",
        options: [
          "To manage hardware resources",
          "To provide user applications",
          "To secure the computer from viruses",
          "To increase internet speed"
        ],
        answer: 0
      },
      {
        question: "Which scheduling algorithm can lead to starvation?",
        options: ["FCFS", "Round Robin", "Shortest Job First", "All of the above"],
        answer: 2
      },
      {
        question: "What is thrashing?",
        options: [
          "A high paging activity",
          "A process that crashes frequently",
          "A disk formatting process",
          "A memory leak"
        ],
        answer: 0
      },
      {
        question: "Which of these is not a deadlock prevention technique?",
        options: ["Hold and Wait", "Circular Wait", "No Preemption", "Mutual Exclusion"],
        answer: 3
      },
      {
        question: "What is the purpose of virtual memory?",
        options: [
          "To extend the logical memory space",
          "To make the system faster",
          "To protect memory from corruption",
          "To share memory between processes"
        ],
        answer: 0
      }
    ]
  },
  cn: {
    name: "Computer Networks",
    icon: "🌐",
    questions: [
      {
        question: "What does HTTP stand for?",
        options: [
          "HyperText Transfer Protocol",
          "HyperText Transmission Protocol",
          "High Transfer Text Protocol",
          "Hyper Transfer Text Protocol"
        ],
        answer: 0
      },
      {
        question: "Which protocol is used for secure communication over a computer network?",
        options: ["HTTP", "FTP", "SSL/TLS", "SMTP"],
        answer: 2
      },
      {
        question: "What is the default port for HTTPS?",
        options: ["80", "443", "8080", "21"],
        answer: 1
      },
      {
        question: "Which layer of the OSI model is responsible for routing?",
        options: ["Physical", "Data Link", "Network", "Transport"],
        answer: 2
      },
      {
        question: "What does DNS stand for?",
        options: [
          "Domain Name System",
          "Dynamic Network Service",
          "Data Name Server",
          "Domain Network Service"
        ],
        answer: 0
      }
    ]
  },
  oops: {
    name: "Object-Oriented Programming",
    icon: "🧩",
    questions: [
      {
        question: "Which of these is not a pillar of OOP?",
        options: ["Inheritance", "Polymorphism", "Abstraction", "Compilation"],
        answer: 3
      },
      {
        question: "What is encapsulation?",
        options: [
          "Binding data and functions together",
          "Creating multiple forms of a function",
          "Hiding implementation details",
          "Deriving new classes from existing ones"
        ],
        answer: 0
      },
      {
        question: "Which access modifier provides the most restricted access?",
        options: ["public", "protected", "private", "default"],
        answer: 2
      },
      {
        question: "What is method overloading?",
        options: [
          "Defining methods with the same name but different parameters",
          "Redefining a method in a derived class",
          "Making a method accessible from anywhere",
          "Hiding a method from other classes"
        ],
        answer: 0
      },
      {
        question: "Which keyword is used to inherit a class in JavaScript?",
        options: ["inherits", "extends", "implements", "super"],
        answer: 1
      }
    ]
  },
  ai: {
    name: "Artificial Intelligence",
    icon: "🤖",
    questions: [
      {
        question: "What is the Turing Test used for?",
        options: [
          "To test machine intelligence",
          "To test algorithm efficiency",
          "To test network speed",
          "To test database integrity"
        ],
        answer: 0
      },
      {
        question: "Which algorithm is used for decision tree learning?",
        options: ["ID3", "A*", "Dijkstra", "K-means"],
        answer: 0
      },
      {
        question: "What does NLP stand for?",
        options: [
          "Natural Language Processing",
          "Neural Language Programming",
          "Natural Learning Process",
          "Neural Learning Protocol"
        ],
        answer: 0
      },
      {
        question: "Which search algorithm is complete and optimal?",
        options: ["Depth-First Search", "Breadth-First Search", "A* Search", "Greedy Search"],
        answer: 2
      },
      {
        question: "What is the main component of a neural network?",
        options: ["Neurons", "Decisions", "Algorithms", "Functions"],
        answer: 0
      }
    ]
  }
};

export default function QuizApp() {
  const [currentPage, setCurrentPage] = useState('subject-selection');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Shuffle questions and options when a subject is selected
  useEffect(() => {
    if (selectedSubject) {
      const subjectQuestions = [...quizData[selectedSubject].questions];
      
      // Shuffle questions
      for (let i = subjectQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [subjectQuestions[i], subjectQuestions[j]] = [subjectQuestions[j], subjectQuestions[i]];
      }
      
      // Shuffle options for each question
      subjectQuestions.forEach(question => {
        for (let i = question.options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [question.options[i], question.options[j]] = [question.options[j], question.options[i]];
        }
        // Update the answer index after shuffling
        const originalAnswer = question.options[question.answer];
        question.answer = question.options.indexOf(originalAnswer);
      });
      
      setShuffledQuestions(subjectQuestions);
    }
  }, [selectedSubject]);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentPage('quiz');
    setScore(0);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleOptionSelect = (optionIndex) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    // Check if answer is correct
    if (optionIndex === shuffledQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setCurrentPage('result');
      }
    }, 1500);
  };

  const handlePlayAgain = () => {
    setCurrentPage('quiz');
    setScore(0);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleGoBack = () => {
    setCurrentPage('subject-selection');
    setSelectedSubject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Quiz
        </h1>
        {currentPage !== 'subject-selection' && (
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            ⬅ Change Subject
          </button>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Subject Selection Page */}
        {currentPage === 'subject-selection' && (
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Choose a Subject to Test Your Knowledge
            </h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {Object.entries(quizData).map(([key, subject]) => (
                <motion.div
                  key={key}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100
                      }
                    }
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                        {subject.icon}
                      </div>
                      <h3 className="text-xl font-semibold ml-4 text-gray-800">{subject.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-6">Test your knowledge of {subject.name} with 5 challenging questions.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSubjectSelect(key)}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                    >
                      Start Quiz
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Quiz Page */}
        {currentPage === 'quiz' && selectedSubject && shuffledQuestions.length > 0 && (
          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Question {currentQuestion + 1} of {shuffledQuestions.length}
                </span>
                <span className="text-sm font-medium text-gray-700">Score: {score}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6 mb-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  {shuffledQuestions[currentQuestion].question}
                </h2>
                
                <div className="space-y-4">
                  {shuffledQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                      whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-lg border transition-all
                        ${selectedOption === index 
                          ? index === shuffledQuestions[currentQuestion].answer
                            ? 'bg-green-100 border-green-500 text-green-800'
                            : 'bg-red-100 border-red-500 text-red-800'
                          : isAnswered && index === shuffledQuestions[currentQuestion].answer
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : 'bg-gray-50 border-gray-200 hover:border-blue-300 text-gray-700'
                        }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Feedback */}
            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg mb-6 text-center font-medium ${
                  selectedOption === shuffledQuestions[currentQuestion].answer
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {selectedOption === shuffledQuestions[currentQuestion].answer
                  ? 'Correct! 🎉'
                  : `Wrong! The correct answer is: ${shuffledQuestions[currentQuestion].options[shuffledQuestions[currentQuestion].answer]}`
                }
              </motion.div>
            )}
          </div>
        )}

        {/* Result Page */}
        {currentPage === 'result' && selectedSubject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
                <p className="text-gray-600 mb-6">You scored:</p>
                
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                  className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
                >
                  <span className="text-3xl font-bold text-white">{score}/{shuffledQuestions.length}</span>
                </motion.div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {score === shuffledQuestions.length
                    ? "Perfect score! You're a genius! 🏆"
                    : score >= shuffledQuestions.length * 0.7
                    ? "Great job! You have strong knowledge! 👍"
                    : score >= shuffledQuestions.length * 0.5
                    ? "Good effort! Keep learning! 🙂"
                    : "Keep practicing! You will improve! 💪"
                  }
                </h3>
                <p className="text-gray-600 mb-8">in {quizData[selectedSubject].name} quiz</p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlayAgain}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    Play Again 🔄
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGoBack}
                    className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium shadow-md hover:bg-gray-200 transition-all"
                  >
                    Go Back ⬅
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}