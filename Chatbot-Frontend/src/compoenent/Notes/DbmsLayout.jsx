"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Database } from "lucide-react";

const DbmsLayout = () => {
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
      id: "sql",
      title: "SQL",
      icon: "🗃️",
      difficulty: "Beginner",
      content: [
        {
          question: "What is SQL?",
          answer:
            "SQL (Structured Query Language) is a standard programming language specifically designed for managing and manipulating relational databases. It allows users to create, read, update, and delete database records through simple commands.",
        },
        {
          question: "What are the main SQL commands?",
          answer:
            "The main SQL commands are categorized into DDL (Data Definition Language: CREATE, ALTER, DROP), DML (Data Manipulation Language: SELECT, INSERT, UPDATE, DELETE), DCL (Data Control Language: GRANT, REVOKE), and TCL (Transaction Control Language: COMMIT, ROLLBACK).",
        },
        {
          question: "What are SQL joins and their types?",
          answer:
            "SQL joins combine rows from two or more tables based on related columns. Types include INNER JOIN (returns matching records), LEFT JOIN (all left table records + matching right), RIGHT JOIN (all right table records + matching left), and FULL OUTER JOIN (all records when there's a match in either table).",
        },
      ],
      pdfUrl: "/pdfs/DBMS Notes.pdf",
    },
    {
      id: "nosql",
      title: "NoSQL",
      icon: "🔄",
      difficulty: "Intermediate",
      content: [
        {
          question: "What is NoSQL?",
          answer:
            "NoSQL databases provide a mechanism for storage and retrieval of data that is modeled differently from tabular relations used in relational databases. They are designed for distributed data stores, large-scale data storage needs, and real-time web applications.",
        },
        {
          question: "What are the types of NoSQL databases?",
          answer:
            "The main types are: Document databases (MongoDB, Couchbase), Key-value stores (Redis, DynamoDB), Column-oriented databases (Cassandra, HBase), and Graph databases (Neo4j, Amazon Neptune). Each type serves different use cases and data models.",
        },
        {
          question: "When to use NoSQL vs SQL?",
          answer:
            "Use NoSQL for: unstructured or semi-structured data, rapidly changing schemas, horizontal scaling needs, and high write loads. Use SQL for: structured data, complex queries, ACID compliance requirements, and established schema designs.",
        },
      ],
      pdfUrl: "/pdfs/DBMS Notes.pdf",
    },
    {
      id: "normalization",
      title: "Normalization",
      icon: "📊",
      difficulty: "Intermediate",
      content: [
        {
          question: "What is Database Normalization?",
          answer:
            "Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves dividing large tables into smaller, related tables and defining relationships between them to minimize data duplication.",
        },
        {
          question: "What are the normal forms?",
          answer:
            "The main normal forms are: 1NF (atomic values, no repeating groups), 2NF (in 1NF + no partial dependencies), 3NF (in 2NF + no transitive dependencies), BCNF (Boyce-Codd Normal Form), 4NF (no multi-valued dependencies), and 5NF (projection-join normal form).",
        },
        {
          question: "What are the benefits of normalization?",
          answer:
            "Benefits include: reduced data redundancy, improved data integrity, better data consistency, more efficient storage utilization, and easier database maintenance. However, over-normalization can lead to performance issues due to excessive joins.",
        },
      ],
      pdfUrl: "/pdfs/DBMS Notes.pdf",
    },
    {
      id: "indexing",
      title: "Indexing",
      icon: "📑",
      difficulty: "Advanced",
      content: [
        {
          question: "What is Database Indexing?",
          answer:
            "Indexing is a database optimization technique that improves the speed of data retrieval operations on database tables. It creates a data structure (index) that allows the database to find data without scanning the entire table, similar to a book's index.",
        },
        {
          question: "What are the types of indexes?",
          answer:
            "Common index types include: B-tree indexes (balanced tree, most common), Hash indexes (for equality comparisons), Bitmap indexes (for low-cardinality columns), Composite indexes (multiple columns), and Full-text indexes (for text searching).",
        },
        {
          question: "What are the trade-offs of indexing?",
          answer:
            "While indexes speed up read operations, they slow down write operations (INSERT, UPDATE, DELETE) because indexes must be maintained. They also consume additional storage space. The key is to create indexes strategically on frequently queried columns.",
        },
      ],
      pdfUrl: "/pdfs/DBMS Notes.pdf",
    },
    {
      id: "transactions",
      title: "Transactions & ACID",
      icon: "⚖️",
      difficulty: "Intermediate",
      content: [
        {
          question: "What are database transactions?",
          answer:
            "A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. Transactions access data using read and write operations and must maintain ACID properties to ensure data reliability.",
        },
        {
          question: "What are ACID properties?",
          answer:
            "ACID stands for: Atomicity (all operations succeed or all fail), Consistency (database remains consistent before and after transaction), Isolation (transactions don't interfere with each other), and Durability (committed transactions persist despite failures).",
        },
        {
          question: "What are transaction isolation levels?",
          answer:
            "Isolation levels define how transaction integrity is visible to other users. Levels include: Read Uncommitted (lowest isolation, dirty reads), Read Committed (no dirty reads), Repeatable Read (no dirty or non-repeatable reads), and Serializable (highest isolation, no phantoms).",
        },
      ],
      pdfUrl: "/pdfs/DBMS Notes.pdf",
    },
    {
      id: "erd",
      title: "ER Diagrams",
      icon: "📐",
      difficulty: "Beginner",
      content: [
        {
          question: "What is an Entity-Relationship Diagram?",
          answer:
            "An ER diagram is a visual representation of entities and their relationships in a database. It serves as a blueprint for database design, showing the logical structure of databases including entities, attributes, and relationships.",
        },
        {
          question: "What are the components of ER diagrams?",
          answer:
            "Key components include: Entities (rectangles, represent tables), Attributes (ovals, represent columns), Relationships (diamonds, show how entities relate), Primary Keys (underlined attributes), and Cardinality (notation showing relationship types: 1:1, 1:N, M:N).",
        },
        {
          question: "What are the types of relationships?",
          answer:
            "The main relationship types are: One-to-One (1:1), One-to-Many (1:N), Many-to-One (N:1), and Many-to-Many (M:N). Many-to-Many relationships typically require a junction table to properly implement in relational databases.",
        },
      ],
      pdfUrl: "/pdfs/DBMS Notes.pdf",
    },
    {
      id: "scaling",
      title: "Scaling Databases",
      icon: "📈",
      difficulty: "Advanced",
      content: [
        {
          question: "What is database scaling?",
          answer:
            "Database scaling refers to the ability to handle increased load by adding resources. There are two main approaches: Vertical scaling (scale-up, adding more power to existing server) and Horizontal scaling (scale-out, adding more servers to distribute load).",
        },
        {
          question: "What is replication and sharding?",
          answer:
            "Replication involves maintaining multiple copies of data across different servers for fault tolerance and read scalability. Sharding (partitioning) involves splitting data across multiple databases based on a shard key, distributing both storage and processing load.",
        },
        {
          question: "What are the challenges of scaling?",
          answer:
            "Challenges include: maintaining data consistency across nodes, handling distributed transactions, managing increased complexity, ensuring proper load balancing, and dealing with network latency in distributed systems.",
        },
      ],
      pdfUrl: "/pdfs/DBMS Notes.pdf",
    },
    {
      id: "security",
      title: "Database Security",
      icon: "🔒",
      difficulty: "Intermediate",
      content: [
        {
          question: "What are database security concerns?",
          answer:
            "Key security concerns include: unauthorized access, SQL injection attacks, data breaches, privilege escalation, denial of service attacks, and inadequate auditing. Security must be implemented at multiple levels including network, server, and application layers.",
        },
        {
          question: "What is SQL injection and how to prevent it?",
          answer:
            "SQL injection is a code injection technique where attackers can execute malicious SQL statements. Prevention methods include: using parameterized queries, stored procedures, input validation, principle of least privilege, and regular security audits.",
        },
        {
          question: "What are database encryption methods?",
          answer:
            "Encryption methods include: Transparent Data Encryption (T encryption at rest), Column-level encryption (specific sensitive columns), Field-level encryption (application-level encryption), and SSL/TLS for data in transit. Each method has different performance implications and security benefits.",
        },
      ],
      pdfUrl: "/pdfs/DBMS Notes.pdf",
    },
    {
      id: "backup",
      title: "Backup & Recovery",
      icon: "💾",
      difficulty: "Intermediate",
      content: [
        {
          question: "What are database backup strategies?",
          answer:
            "Common strategies include: Full backups (complete database copy), Differential backups (changes since last full backup), Transaction log backups (all transactions since last log backup), and Incremental backups (changes since last backup of any type). A combination is often used for optimal RPO and RTO.",
        },
        {
          question: "What is disaster recovery?",
          answer:
            "Disaster recovery involves processes and procedures for restoring database operations after catastrophic events. Key metrics include RTO (Recovery Time Objective - maximum acceptable downtime) and RPO (Recovery Point Objective - maximum data loss acceptable).",
        },
        {
          question: "What are recovery models?",
          answer:
            "Common recovery models are: Simple recovery (no log backups, point-in-time recovery not possible), Full recovery (complete log backups, point-in-time recovery possible), and Bulk-logged recovery (minimal logging for bulk operations, limited point-in-time recovery).",
        },
      ],
      pdfUrl: "/pdfs/DBMS Notes.pdf",
    },
  ];

  // Filter topics based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = topics.filter(
        (topic) =>
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.content.some((item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Database className="text-orange-600 w-12 h-12 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500">
                <Link href="/dbms" className="hover:underline">DBMS</Link> Study Materials
              </span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master Database Management Systems concepts and implementation
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['SQL', 'NoSQL', 'Normalization', 'Indexing', 'Transactions', 'ER Diagrams', 'Security'].map((topic) => (
              <span key={topic} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
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
              placeholder="Search DBMS topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm"
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
                          ? "bg-orange-100 border-l-4 border-orange-500"
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
                                ? "text-orange-700"
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
                                className="bg-orange-50 p-4 rounded-lg border border-orange-100"
                              >
                                <h3 className="text-lg font-medium text-orange-700 mb-2">
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
                                  "/pdfs/DBMS Notes.pdf",
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
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-600 to-rose-600 text-white rounded-lg hover:from-orange-700 hover:to-rose-700 transition-all duration-300 shadow-md"
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
          background-color: #fdba74;
          border-radius: 10px;
        }
        .custom-scrollbar-content::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar-content::-webkit-scrollbar-thumb {
          background-color: #fb7185;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default DbmsLayout;