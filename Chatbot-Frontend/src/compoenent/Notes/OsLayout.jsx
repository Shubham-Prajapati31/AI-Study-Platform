"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Cpu } from "lucide-react";

const OsLayout = () => {
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
      id: "process",
      title: "Process Management",
      icon: "⚙️",
      difficulty: "Intermediate",
      content: [
        {
          question: "What is a Process?",
          answer:
            "A process is an instance of a program in execution. It includes the program code, current activity (program counter, registers), process stack, data section, and heap. Processes are the fundamental units of work in an operating system.",
        },
        {
          question: "What is Process Scheduling?",
          answer:
            "Process scheduling is the activity of the process manager that handles the removal of the running process from the CPU and the selection of another process based on a particular strategy. Key schedulers include long-term (job), short-term (CPU), and medium-term (swapping) schedulers.",
        },
        {
          question: "What are Process States?",
          answer:
            "Processes can be in various states: New (being created), Ready (waiting for CPU), Running (executing on CPU), Waiting (for I/O or event), and Terminated (finished execution). State transitions are managed by the operating system scheduler.",
        },
      ],
      pdfUrl: "/pdfs/OPERATING-SYSTEMS.pdf",
    },
    {
      id: "memory",
      title: "Memory Management",
      icon: "🧠",
      difficulty: "Advanced",
      content: [
        {
          question: "What is Memory Management?",
          answer:
            "Memory management is the functionality of an operating system which handles or manages primary memory and moves processes back and forth between main memory and disk during execution. It keeps track of each memory location and manages memory allocation/deallocation.",
        },
        {
          question: "What is Virtual Memory?",
          answer:
            "Virtual memory is a memory management technique that creates an illusion to users of a very large (main) memory. It allows execution of processes that may not be completely in memory, enabling programs larger than physical memory and providing memory isolation between processes.",
        },
        {
          question: "What are Paging and Segmentation?",
          answer:
            "Paging divides physical memory into fixed-sized blocks called frames and logical memory into blocks of the same size called pages. Segmentation divides memory into segments of variable sizes. Modern systems often use segmented paging that combines both approaches.",
        },
      ],
      pdfUrl: "/pdfs/OPERATING-SYSTEMS.pdf",
    },
    {
      id: "filesystem",
      title: "File System",
      icon: "📁",
      difficulty: "Intermediate",
      content: [
        {
          question: "What is a File System?",
          answer:
            "A file system is a method and data structure that an operating system uses to control how data is stored and retrieved. It organizes files into a database for storage, organization, manipulation, and retrieval by the operating system and users.",
        },
        {
          question: "What are File System Components?",
          answer:
            "Key components include: Files (collection of related information), Directories (organizational structures containing files and subdirectories), Metadata (information about files), Access methods (sequential, direct, indexed), and Protection mechanisms (permissions, access control lists).",
        },
        {
          question: "What are common File System Types?",
          answer:
            "Common file systems include: FAT/FAT32 (simple, widely compatible), NTFS (Windows, journaling, security), ext3/ext4 (Linux, journaling), HFS+ (macOS), APFS (modern macOS, encryption focus), and network file systems like NFS and SMB.",
        },
      ],
      pdfUrl: "/pdfs/OPERATING-SYSTEMS.pdf",
    },
    {
      id: "scheduling",
      title: "CPU Scheduling",
      icon: "⏱️",
      difficulty: "Intermediate",
      content: [
        {
          question: "What is CPU Scheduling?",
          answer:
            "CPU scheduling is the process of determining which process runs when multiple processes are ready to execute. The scheduler selects from among the processes in memory that are ready to execute and allocates the CPU to one of them based on scheduling algorithms.",
        },
        {
          question: "What are Scheduling Algorithms?",
          answer:
            "Common algorithms include: FCFS (First-Come, First-Served), SJF (Shortest Job First), Priority Scheduling, Round Robin, Multilevel Queue, and Multilevel Feedback Queue. Each has different characteristics for throughput, turnaround time, waiting time, and response time.",
        },
        {
          question: "What is Preemptive vs Non-preemptive Scheduling?",
          answer:
            "In preemptive scheduling, the CPU can be taken away from a process before it completes. In non-preemptive scheduling, a process keeps the CPU until it terminates or voluntarily releases it. Preemptive scheduling provides better responsiveness but requires more overhead.",
        },
      ],
      pdfUrl: "/pdfs/OPERATING-SYSTEMS.pdf",
    },
    {
      id: "deadlocks",
      title: "Deadlocks",
      icon: "🔒",
      difficulty: "Advanced",
      content: [
        {
          question: "What is a Deadlock?",
          answer:
            "A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process. All processes remain in a waiting state, unable to proceed with execution.",
        },
        {
          question: "What are the Necessary Conditions for Deadlock?",
          answer:
            "The four necessary conditions are: Mutual Exclusion (resources non-sharable), Hold and Wait (process holds resources while waiting for others), No Preemption (resources cannot be forcibly taken), and Circular Wait (circular chain of processes waiting for resources).",
        },
        {
          question: "How are Deadlocks Handled?",
          answer:
            "Approaches include: Prevention (design system to avoid one of the four conditions), Avoidance (algorithms like Banker's algorithm to ensure safe states), Detection (periodically check for deadlocks), and Recovery (process termination or resource preemption when detected).",
        },
      ],
      pdfUrl: "/pdfs/OPERATING-SYSTEMS.pdf",
    },
    {
      id: "synchronization",
      title: "Process Synchronization",
      icon: "🔄",
      difficulty: "Advanced",
      content: [
        {
          question: "What is Process Synchronization?",
          answer:
            "Process synchronization refers to the coordination of simultaneous processes to maintain data consistency and ensure correct execution order when accessing shared resources. It prevents race conditions and ensures orderly execution of cooperating processes.",
        },
        {
          question: "What are Critical Section Problems?",
          answer:
            "The critical section is a code segment that accesses shared variables and must not be concurrently executed by more than one process. Solutions must satisfy: Mutual Exclusion, Progress, and Bounded Waiting. Approaches include mutex locks, semaphores, and monitors.",
        },
        {
          question: "What are Semaphores and Mutex?",
          answer:
            "A semaphore is a synchronization tool that uses integer variables accessed only through atomic wait and signal operations. A mutex (mutual exclusion) is a locking mechanism that ensures only one thread can access a resource. Semaphores can be counting or binary (mutex-like).",
        },
      ],
      pdfUrl: "/pdfs/OPERATING-SYSTEMS.pdf",
    },
    {
      id: "virtualization",
      title: "Virtualization",
      icon: "🖥️",
      difficulty: "Intermediate",
      content: [
        {
          question: "What is Virtualization?",
          answer:
            "Virtualization is the creation of a virtual version of something, such as hardware platforms, storage devices, or network resources. It allows multiple operating systems to run simultaneously on a single physical machine by abstracting hardware resources.",
        },
        {
          question: "What are Hypervisors?",
          answer:
            "A hypervisor (virtual machine monitor) is software that creates and runs virtual machines. Type 1 (bare-metal) runs directly on hardware (VMware ESXi, Hyper-V). Type 2 (hosted) runs on a conventional OS (VirtualBox, VMware Workstation).",
        },
        {
          question: "What are Benefits of Virtualization?",
          answer:
            "Benefits include: Server consolidation (multiple VMs on one physical server), Isolation (fault and security containment), Hardware independence (migration between physical hosts), Testing and development flexibility, and Improved resource utilization and efficiency.",
        },
      ],
      pdfUrl: "/pdfs/OPERATING-SYSTEMS.pdf",
    },
    {
      id: "security",
      title: "OS Security",
      icon: "🛡️",
      difficulty: "Intermediate",
      content: [
        {
          question: "What are OS Security Mechanisms?",
          answer:
            "Key mechanisms include: User authentication (passwords, biometrics, tokens), Access control (permissions, ACLs), Encryption (file and disk encryption), Auditing and logging, Firewalls and network security, and Process isolation through memory protection.",
        },
        {
          question: "What is Access Control?",
          answer:
            "Access control regulates who or what can view or use resources. Models include: DAC (Discretionary Access Control - owners control access), MAC (Mandatory Access Control - system-enforced policies), and RBAC (Role-Based Access Control - permissions based on roles).",
        },
        {
          question: "What are Common OS Vulnerabilities?",
          answer:
            "Common vulnerabilities include: Buffer overflows, Privilege escalation, Race conditions, Trojan horses, Worms and viruses, Rootkits, and Social engineering attacks. Modern OSes implement various protections like ASLR, DEP, and sandboxing to mitigate these.",
        },
      ],
      pdfUrl: "/pdfs/OPERATING-SYSTEMS.pdf",
    },
    {
      id: "io",
      title: "I/O Systems",
      icon: "🔌",
      difficulty: "Intermediate",
      content: [
        {
          question: "What are I/O System Components?",
          answer:
            "Components include: I/O devices (hardware components), Device drivers (software to control devices), I/O controllers (hardware interfaces), I/O scheduling algorithms, Buffering and caching mechanisms, and Error handling and recovery procedures.",
        },
        {
          question: "What are I/O Techniques?",
          answer:
            "Techniques include: Programmed I/O (CPU polls device status), Interrupt-driven I/O (device interrupts CPU when ready), DMA (Direct Memory Access - device transfers data directly to memory), and Channel I/O (dedicated processors handle I/O operations).",
        },
        {
          question: "What is Device Management?",
          answer:
            "Device management involves: Device discovery and configuration, Driver loading and management, I/O request scheduling, Buffering and caching, Error handling and recovery, and Power management for mobile and portable devices.",
        },
      ],
      pdfUrl: "/pdfs/OPERATING-SYSTEMS.pdf",
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
          <div className="flex items-center justify-center mb-4">
            <Cpu className="text-blue-600 w-12 h-12 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                <Link href="/os" className="hover:underline">Operating Systems</Link> Study Materials
              </span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master core Operating Systems concepts and principles
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['Process', 'Memory', 'File System', 'Scheduling', 'Deadlocks', 'Synchronization', 'Virtualization'].map((topic) => (
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
              placeholder="Search OS topics..."
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
                                  "/pdfs/OPERATING-SYSTEMS.pdf",
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

export default OsLayout;