"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Network } from "lucide-react";

const CnLayout = () => {
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
      id: "tcpip",
      title: "TCP/IP Protocol Suite",
      icon: "🌐",
      difficulty: "Intermediate",
      content: [
        {
          question: "What is the TCP/IP Model?",
          answer:
            "The TCP/IP model is a concise version of the OSI model. It contains four layers: Network Access, Internet, Transport, and Application. It's the fundamental communication protocol of the internet and defines how data should be packaged, addressed, transmitted, routed, and received.",
        },
        {
          question: "What are the key protocols in TCP/IP?",
          answer:
            "Key protocols include: IP (Internet Protocol) for addressing and routing, TCP (Transmission Control Protocol) for reliable connection-oriented communication, UDP (User Datagram Protocol) for connectionless communication, HTTP/HTTPS for web traffic, FTP for file transfer, and SMTP for email.",
        },
        {
          question: "How does TCP ensure reliable communication?",
          answer:
            "TCP ensures reliability through: Sequence numbers and acknowledgments, Flow control (sliding window protocol), Congestion control algorithms, Error detection (checksums), Retransmission of lost packets, and Connection establishment (three-way handshake) and termination.",
        },
      ],
      pdfUrl: "/pdfs/Computer Networking.pdf",
    },
    {
      id: "osi",
      title: "OSI Model",
      icon: "📊",
      difficulty: "Intermediate",
      content: [
        {
          question: "What is the OSI Model?",
          answer:
            "The OSI (Open Systems Interconnection) model is a conceptual framework that characterizes and standardizes the communication functions of a telecommunication or computing system without regard to its underlying internal structure and technology. It's divided into seven abstraction layers.",
        },
        {
          question: "What are the seven layers of the OSI model?",
          answer:
            "The layers are: 1. Physical (raw bit transmission), 2. Data Link (error detection/correction), 3. Network (packet forwarding/routing), 4. Transport (end-to-end connections), 5. Session (communication management), 6. Presentation (data translation/encryption), 7. Application (network services to applications).",
        },
        {
          question: "Why is the OSI model important?",
          answer:
            "The OSI model provides: A universal language for network communication, Troubleshooting guidance by isolating layer-specific issues, Standardization for network component development, Interoperability between different vendors' equipment, and A framework for understanding complex network interactions.",
        },
      ],
      pdfUrl: "/pdfs/Computer Networking.pdf",
    },
    {
      id: "routing",
      title: "Routing Protocols",
      icon: "🛣️",
      difficulty: "Advanced",
      content: [
        {
          question: "What is Network Routing?",
          answer:
            "Routing is the process of selecting a path for traffic in a network, or between or across multiple networks. Routing decisions are made by specialized network devices called routers, which use routing tables and algorithms to determine the optimal path for data packets.",
        },
        {
          question: "What are the types of routing protocols?",
          answer:
            "Main types include: Distance-vector protocols (RIP, IGRP) that share entire routing tables, Link-state protocols (OSPF, IS-IS) that share information about network topology, Hybrid protocols (EIGRP) that combine features, and Path-vector protocols (BGP) for inter-domain routing.",
        },
        {
          question: "What is BGP and why is it important?",
          answer:
            "BGP (Border Gateway Protocol) is the protocol that makes the internet work. It's a path-vector protocol that maintains a table of IP networks which designate network reachability among autonomous systems. BGP is used for routing between different internet service providers and is crucial for internet stability.",
        },
      ],
      pdfUrl: "/pdfs/Computer Networking.pdf",
    },
    {
      id: "security",
      title: "Network Security",
      icon: "🔒",
      difficulty: "Advanced",
      content: [
        {
          question: "What are common network security threats?",
          answer:
            "Common threats include: DDoS attacks (overwhelming resources), Man-in-the-middle attacks (intercepting communications), Packet sniffing (eavesdropping), IP spoofing (forging source addresses), Port scanning (discovering vulnerabilities), and Malware distribution through network vulnerabilities.",
        },
        {
          question: "What are essential network security mechanisms?",
          answer:
            "Essential mechanisms include: Firewalls (filtering traffic), VPNs (secure remote access), IDS/IPS (intrusion detection/prevention), Encryption (SSL/TLS, IPsec), Authentication protocols (RADIUS, TACACS+), Access control lists, and Network segmentation.",
        },
        {
          question: "What is SSL/TLS and how does it work?",
          answer:
            "SSL (Secure Sockets Layer) and TLS (Transport Layer Security) are cryptographic protocols that provide communications security over a computer network. They use asymmetric cryptography for authentication, symmetric encryption for confidentiality, and message authentication codes for message integrity.",
        },
      ],
      pdfUrl: "/pdfs/Computer Networking.pdf",
    },
    {
      id: "wireless",
      title: "Wireless Networks",
      icon: "📶",
      difficulty: "Intermediate",
      content: [
        {
          question: "What are wireless network types?",
          answer:
            "Main types include: WPAN (Wireless Personal Area Networks - Bluetooth, Zigbee), WLAN (Wireless Local Area Networks - Wi-Fi), WMAN (Wireless Metropolitan Area Networks - WiMAX), WWAN (Wireless Wide Area Networks - Cellular 4G/5G), and Satellite networks.",
        },
        {
          question: "How does Wi-Fi work?",
          answer:
            "Wi-Fi uses radio waves to provide wireless high-speed internet and network connections. It operates on IEEE 802.11 standards, using CSMA/CA for medium access, and supports multiple frequency bands (2.4GHz, 5GHz, 6GHz). Key components include access points, wireless adapters, and various security protocols like WPA2/WPA3.",
        },
        {
          question: "What are the challenges in wireless networking?",
          answer:
            "Challenges include: Signal interference and attenuation, Security vulnerabilities (eavesdropping), Limited bandwidth and spectrum availability, Mobility management (handoffs between access points), Power consumption constraints for mobile devices, and Variable signal quality affecting performance.",
        },
      ],
      pdfUrl: "/pdfs/Computer Networking.pdf",
    },
    {
      id: "dns",
      title: "DNS & Network Services",
      icon: "🔍",
      difficulty: "Intermediate",
      content: [
        {
          question: "What is DNS and how does it work?",
          answer:
            "DNS (Domain Name System) is the phonebook of the internet. It translates human-readable domain names (google.com) to IP addresses (172.217.164.110). DNS uses a hierarchical decentralized naming system with root servers, TLD servers, and authoritative name servers to resolve queries through iterative or recursive resolution.",
        },
        {
          question: "What are other essential network services?",
          answer:
            "Essential services include: DHCP (Dynamic Host Configuration Protocol) for automatic IP assignment, NAT (Network Address Translation) for address conservation, Proxy servers for content filtering and caching, Load balancers for distributing traffic, and CDNs (Content Delivery Networks) for efficient content distribution.",
        },
        {
          question: "What is Anycast and how is it used?",
          answer:
            "Anycast is a network addressing and routing methodology where incoming requests can be routed to various locations. It's commonly used in DNS (root servers), CDNs, and DDoS protection services to provide high availability, reduce latency, and distribute load across multiple geographically dispersed servers.",
        },
      ],
      pdfUrl: "/pdfs/Computer Networking.pdf",
    },
    {
      id: "qos",
      title: "Quality of Service",
      icon: "⚡",
      difficulty: "Advanced",
      content: [
        {
          question: "What is Quality of Service (QoS) in networking?",
          answer:
            "QoS refers to the measurement and improvement of the overall performance of a network service, particularly the performance seen by users. It involves managing network resources to guarantee certain levels of performance for specific data flows or applications.",
        },
        {
          question: "What are QoS mechanisms?",
          answer:
            "Key mechanisms include: Traffic classification and marking (DSCP, CoS), Congestion management (queuing algorithms like FIFO, PQ, CQ, WFQ), Congestion avoidance (RED, WRED), Traffic shaping and policing, Resource reservation (RSVP), and Link efficiency mechanisms (compression, fragmentation).",
        },
        {
          question: "Why is QoS important for modern networks?",
          answer:
            "QoS is crucial for: Supporting real-time applications (VoIP, video conferencing), Prioritizing business-critical traffic, Managing network congestion efficiently, Meeting SLAs (Service Level Agreements), Supporting converged networks carrying voice, video and data, and Ensuring consistent user experience.",
        },
      ],
      pdfUrl: "/pdfs/Computer Networking.pdf",
    },
    {
      id: "sdn",
      title: "Software Defined Networking",
      icon: "🖥️",
      difficulty: "Advanced",
      content: [
        {
          question: "What is Software Defined Networking (SDN)?",
          answer:
            "SDN is an approach to networking that uses software-based controllers or application programming interfaces (APIs) to communicate with underlying hardware infrastructure and direct traffic on a network. It separates the network control plane from the data forwarding plane for more flexible management.",
        },
        {
          question: "What are the components of SDN architecture?",
          answer:
            "Key components include: Application layer (network apps), Control layer (SDN controller), Infrastructure layer (network devices), Northbound APIs (controller to applications), Southbound APIs (controller to devices, like OpenFlow), and Management and orchestration tools.",
        },
        {
          question: "What are the benefits of SDN?",
          answer:
            "Benefits include: Centralized network management, Programmable network configuration, Greater agility and flexibility, Better traffic management and optimization, Reduced operational costs, Enhanced security through centralized policy enforcement, and Support for network virtualization and automation.",
        },
      ],
      pdfUrl: "/pdfs/Computer Networking.pdf",
    },
    {
      id: "ipv6",
      title: "IPv6 & Next Gen Networking",
      icon: "🔮",
      difficulty: "Intermediate",
      content: [
        {
          question: "What is IPv6 and why is it needed?",
          answer:
            "IPv6 (Internet Protocol version 6) is the most recent version of the Internet Protocol. It was developed to deal with IPv4 address exhaustion. IPv6 uses 128-bit addresses (vs IPv4's 32-bit), providing approximately 3.4×10³⁸ addresses compared to IPv4's 4.3 billion addresses.",
        },
        {
          question: "What are key features of IPv6?",
          answer:
            "Key features include: Vastly larger address space, Simplified header format, Improved support for extensions and options, Built-in security (IPsec), Better support for quality of service, Stateless address autoconfiguration (SLAAC), and Enhanced multicast and anycast capabilities.",
        },
        {
          question: "What are the challenges in IPv6 adoption?",
          answer:
            "Challenges include: Network infrastructure upgrades, Application and operating system support, Security considerations (new attack vectors), Transition mechanisms complexity (dual stack, tunneling, translation), Training and expertise requirements, and Cost of implementation and maintenance.",
        },
      ],
      pdfUrl: "/pdfs/Computer Networking.pdf",
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Network className="text-purple-600 w-12 h-12 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                <Link href="/cn" className="hover:underline">Computer Networks</Link> Study Materials
              </span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master fundamental and advanced networking concepts and protocols
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['TCP/IP', 'OSI Model', 'Routing', 'Security', 'Wireless', 'DNS', 'QoS', 'SDN', 'IPv6'].map((topic) => (
              <span key={topic} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
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
              placeholder="Search networking topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all shadow-sm"
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
                          ? "bg-purple-100 border-l-4 border-purple-500"
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
                                ? "text-purple-700"
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
                                className="bg-purple-50 p-4 rounded-lg border border-purple-100"
                              >
                                <h3 className="text-lg font-medium text-purple-700 mb-2">
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
                                  "/pdfs/Computer Networking.pdf",
                                  `${topic.title} - Configuration Examples.pdf`
                                )
                              }
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md"
                            >
                              ⚙️ Configuration Examples
                            </button>

                            {/* Download PDF Button */}
                            <button
                              onClick={() =>
                                handleDownload(
                                  topic.pdfUrl,
                                  `${topic.title}.pdf`
                                )
                              }
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md"
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
          background-color: #c4b5fd;
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

export default CnLayout;