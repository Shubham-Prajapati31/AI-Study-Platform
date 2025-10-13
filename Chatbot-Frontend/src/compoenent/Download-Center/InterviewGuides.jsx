"use client";

import { useState } from 'react';
import Head from 'next/head';

// SVG Icons for company logos
const CompanyLogos = {
  Google: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  ),
  Amazon: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24">
      <path fill="#FF9900" d="M10.922 17.366c-.455 0-.866-.183-1.167-.48l-1.13-1.092-2.843 2.708 1.13 1.092c.301.297.712.48 1.167.48h10.533v-2.708H10.922zM6.782 12.358L1.5 7.641l2.153-2.053 5.282 4.717-2.153 2.053zm7.674-7.674c.455 0 .866.183 1.167.48l1.13 1.092 2.843-2.708-1.13-1.092a1.656 1.656 0 0 0-1.167-.48H5.326v2.708h9.13zm7.044 7.674l-5.282-4.717 2.153-2.053 5.282 4.717-2.153 2.053z"/>
    </svg>
  ),
  Microsoft: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24">
      <path fill="#F1511B" d="M1 1h10v10H1V1z"/>
      <path fill="#80CC28" d="M1 13h10v10H1V13z"/>
      <path fill="#00ADEF" d="M13 1h10v10H13V1z"/>
      <path fill="#FBBC09" d="M13 13h10v10H13V13z"/>
    </svg>
  ),
  Meta: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24">
      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Apple: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24">
      <path fill="#000000" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
    </svg>
  ),
  Netflix: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24">
      <path fill="#E50914" d="M5.398 0v.006c-1.989.046-3.376.457-4.19 1.043-.897.656-1.208 1.723-1.208 2.734v16.319c0 .993.311 2.078 1.208 2.734.814.586 2.201.997 4.19 1.043v-.006h13.204v.006c1.989-.046 3.376-.457 4.19-1.043.897-.656 1.208-1.723 1.208-2.734V3.783c0-.993-.311-2.078-1.208-2.734C21.978.463 20.591.052 18.602.006h.006V0H5.398zm0 1.685h13.204c-1.693.052-2.786.312-3.287.601-.494.285-.658.725-.658 1.497v16.319c0 .772.164 1.212.658 1.497.501.289 1.594.549 3.287.601H5.398c1.693-.052 2.786-.312 3.287-.601.494-.285.658-.725.658-1.497V3.783c0-.772-.164-1.212-.658-1.497-.501-.289-1.594-.549-3.287-.601z"/>
    </svg>
  ),
  Tesla: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24">
      <path fill="#E82127" d="M12 5.362l5.429 3.85-2.075 6.388H8.646L6.571 9.212zm-3.334 10.836h6.668L12 24zM6.667 6.667h10.666L12 4zM1.333 0h21.334L12 18.667z"/>
    </svg>
  ),
  Twitter: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24">
      <path fill="#1DA1F2" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  )
};

export default function InterviewGuides() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [expandedCompanies, setExpandedCompanies] = useState(new Set());

  // Sample data with more questions
  const companies = [
    {
      id: 1,
      name: 'Google',
      logo: 'Google',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-red-100 to-orange-100',
      questions: [
        {
          id: 101,
          question: "What is the time complexity of binary search?",
          answer: "The time complexity of binary search is O(log n), where n is the number of elements in the sorted array."
        },
        {
          id: 102,
          question: "Explain the concept of MapReduce.",
          answer: "MapReduce is a programming model for processing large data sets with a parallel, distributed algorithm on a cluster. It consists of a Map step that processes key-value pairs and a Reduce step that combines intermediate values."
        },
        {
          id: 103,
          question: "What is the difference between TCP and UDP?",
          answer: "TCP is connection-oriented, reliable, and ensures ordered delivery of data. UDP is connectionless, unreliable, and does not guarantee order, but it's faster and has less overhead."
        },
        {
          id: 104,
          question: "How would you design a scalable web service?",
          answer: "I would use horizontal scaling with load balancers, implement caching strategies, use a CDN for static assets, employ database sharding or replication, and design stateless services that can be easily scaled out."
        },
        {
          id: 105,
          question: "Explain Bigtable and its use cases at Google.",
          answer: "Bigtable is a distributed storage system for managing structured data designed to scale to petabytes. It's used by many Google services including Google Search, Google Maps, and Gmail. It provides low latency and high throughput for random reads and writes."
        },
        {
          id: 106,
          question: "What is PageRank algorithm?",
          answer: "PageRank is an algorithm used by Google Search to rank web pages. It works by counting the number and quality of links to a page to determine a rough estimate of the website's importance."
        },
        {
          id: 107,
          question: "How does Google handle large-scale data processing?",
          answer: "Google uses technologies like MapReduce, Bigtable, and Spanner for large-scale data processing. They've also developed Borg for cluster management and protocol buffers for efficient data serialization."
        }
      ]
    },
    {
      id: 2,
      name: 'Amazon',
      logo: 'Amazon',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-orange-100',
      questions: [
        {
          id: 201,
          question: "What are the principles of AWS Well-Architected Framework?",
          answer: "The AWS Well-Architected Framework is based on five pillars: Operational Excellence, Security, Reliability, Performance Efficiency, and Cost Optimization."
        },
        {
          id: 202,
          question: "How would you handle a situation where a product launch deadline is approaching but the team is behind schedule?",
          answer: "I would first assess the critical path items, prioritize must-have features, communicate transparently with stakeholders about the situation, and see if additional resources can be allocated or if the deadline can be negotiated."
        },
        {
          id: 203,
          question: "What is Amazon's leadership principle 'Customer Obsession'?",
          answer: "Customer Obsession means leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust. Although leaders pay attention to competitors, they obsess over customers."
        },
        {
          id: 204,
          question: "How does Amazon's fulfillment center algorithm work?",
          answer: "Amazon uses complex algorithms to determine optimal inventory placement, predict demand, route orders to the nearest fulfillment center, and optimize picking paths for workers. Machine learning models predict what products will be in demand where and when."
        },
        {
          id: 205,
          question: "Explain Amazon's two-pizza team rule.",
          answer: "The two-pizza team rule states that teams should be small enough to be fed with two pizzas. This promotes autonomy, agility, and accountability within teams."
        },
        {
          id: 206,
          question: "What is AWS Lambda and how does it work?",
          answer: "AWS Lambda is a serverless compute service that runs code in response to events and automatically manages the underlying compute resources. It allows you to run code without provisioning or managing servers."
        }
      ]
    },
    {
      id: 3,
      name: 'Microsoft',
      logo: 'Microsoft',
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-gradient-to-br from-blue-100 to-purple-100',
      questions: [
        {
          id: 301,
          question: "What is the difference between value types and reference types in C#?",
          answer: "Value types store their data directly in memory, while reference types store a reference to the memory location. Value types include primitive types, structs and enums, while classes, interfaces, arrays and delegates are reference types."
        },
        {
          id: 302,
          question: "Explain the architecture of Azure.",
          answer: "Azure is Microsoft's cloud computing platform with services ranging from simple web apps to complex AI systems. Its architecture includes global data centers, networking infrastructure, compute services, storage solutions, and management tools, all designed for scalability, reliability, and security."
        },
        {
          id: 303,
          question: "What is Microsoft's approach to accessibility?",
          answer: "Microsoft follows inclusive design principles, ensuring products are accessible to people with disabilities. This includes features like narrator screen reader, high contrast modes, keyboard navigation, and adherence to WCAG guidelines in all products."
        },
        {
          id: 304,
          question: "What is .NET Core and how is it different from .NET Framework?",
          answer: ".NET Core is a cross-platform, open-source successor to .NET Framework. It's modular, faster, and can be used to build applications for Windows, Linux, and macOS, whereas .NET Framework is Windows-only."
        },
        {
          id: 305,
          question: "How does Microsoft approach cloud security in Azure?",
          answer: "Microsoft employs a multi-layered security approach in Azure that includes physical security, network security, encryption, identity and access management, and compliance with various industry standards and regulations."
        }
      ]
    },
    {
      id: 4,
      name: 'Meta',
      logo: 'Meta',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-gradient-to-br from-indigo-100 to-blue-100',
      questions: [
        {
          id: 401,
          question: "How would you design a news feed algorithm?",
          answer: "I would consider factors like relevance score based on user interactions, post freshness, content type preferences, relationship with the poster, and explicit user signals to create a personalized ranking algorithm."
        },
        {
          id: 402,
          question: "What is React Fiber and how does it improve performance?",
          answer: "React Fiber is a complete rewrite of React's core algorithm. It enables incremental rendering, allowing React to split rendering work into chunks and prioritize updates, resulting in smoother animations and more responsive user interfaces."
        },
        {
          id: 403,
          question: "How does Facebook handle data at scale?",
          answer: "Facebook uses a combination of distributed systems including TAO (their graph data store), HBase for analytics, and RocksDB for storage. They've developed techniques like sharding, caching with McRouter, and compression to handle petabytes of data efficiently."
        },
        {
          id: 404,
          question: "What is GraphQL and why did Facebook create it?",
          answer: "GraphQL is a query language for APIs that allows clients to request only the data they need. Facebook created it to solve problems of over-fetching and under-fetching data that often occur with REST APIs, especially for mobile applications."
        },
        {
          id: 405,
          question: "How does Meta approach content moderation at scale?",
          answer: "Meta uses a combination of AI systems and human reviewers to moderate content. The AI systems flag potentially violating content, which is then reviewed by human moderators who make final decisions based on community standards."
        }
      ]
    },
    {
      id: 5,
      name: 'Apple',
      logo: 'Apple',
      color: 'from-gray-700 to-gray-900',
      bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200',
      questions: [
        {
          id: 501,
          question: "What makes iOS user experience distinctive?",
          answer: "iOS UX is characterized by its simplicity, intuitive navigation, consistency across applications, attention to detail in animations and transitions, strong privacy focus, and seamless ecosystem integration."
        },
        {
          id: 502,
          question: "How does Apple approach privacy in product design?",
          answer: "Apple follows a privacy-by-design approach, minimizing data collection, processing data on-device when possible, providing transparency about data use, and giving users control over their information through privacy settings and nutrition labels."
        },
        {
          id: 503,
          question: "What is the Swift programming language's key features?",
          answer: "Swift features include type safety, optionals to handle nil values, automatic memory management with ARC, functional programming patterns, protocol-oriented programming, and interoperability with Objective-C."
        },
        {
          id: 504,
          question: "Explain the concept of 'Retina Display'.",
          answer: "Retina Display is a marketing term used by Apple for displays that have a high enough pixel density that the human eye is unable to distinguish individual pixels at a typical viewing distance. This creates smoother text and images."
        },
        {
          id: 505,
          question: "How does Apple's A-series chip design differ from competitors?",
          answer: "Apple's A-series chips use a custom ARM-based architecture with focus on performance per watt. They integrate CPU, GPU, Neural Engine, and other components on a single chip, optimizing for specific iOS/macOS needs rather than general-purpose computing."
        }
      ]
    },
    {
      id: 6,
      name: 'Netflix',
      logo: 'Netflix',
      color: 'from-red-600 to-red-800',
      bgColor: 'bg-gradient-to-br from-red-100 to-pink-100',
      questions: [
        {
          id: 601,
          question: "How does Netflix recommend content to users?",
          answer: "Netflix uses collaborative filtering algorithms that compare your viewing habits with similar users, content-based filtering that analyzes metadata about shows you've watched, and hybrid approaches that combine multiple techniques."
        },
        {
          id: 602,
          question: "What is the Netflix microservices architecture?",
          answer: "Netflix pioneered cloud-native microservices architecture with hundreds of independent services that communicate through APIs. This enables rapid development, deployment, and scaling. They also developed tools like Hystrix for fault tolerance and Eureka for service discovery."
        },
        {
          id: 603,
          question: "How does Netflix handle video streaming globally?",
          answer: "Netflix uses Open Connect, its custom content delivery network, with servers embedded within ISPs worldwide. They employ adaptive bitrate streaming that adjusts video quality based on network conditions, and use compression algorithms to optimize bandwidth usage."
        },
        {
          id: 604,
          question: "What is the Chaos Monkey tool?",
          answer: "Chaos Monkey is a tool developed by Netflix that randomly terminates instances in their production environment to ensure that engineers implement their services to be resilient to instance failures."
        },
        {
          id: 605,
          question: "How does Netflix handle A/B testing?",
          answer: "Netflix uses a sophisticated A/B testing platform that allows them to test different algorithms, UI changes, and content strategies with subsets of their user base before rolling out changes globally."
        }
      ]
    },
    {
      id: 7,
      name: 'Tesla',
      logo: 'Tesla',
      color: 'from-red-600 to-gray-800',
      bgColor: 'bg-gradient-to-br from-red-100 to-gray-100',
      questions: [
        {
          id: 701,
          question: "How does Tesla's Autopilot system work?",
          answer: "Tesla's Autopilot uses a combination of cameras, ultrasonic sensors, and radar to perceive the environment. Neural networks process this data to identify objects, predict behavior, and make driving decisions, with the system continuously improving through fleet learning."
        },
        {
          id: 702,
          question: "What is unique about Tesla's battery technology?",
          answer: "Tesla uses lithium-ion batteries with nickel-cobalt-aluminum chemistry that offers high energy density. Their battery management system optimizes charging, discharging, and thermal management to maximize lifespan and performance. They've also developed structural battery pack designs."
        },
        {
          id: 703,
          question: "How does Tesla's over-the-air update system work?",
          answer: "Tesla's OTA update system allows them to remotely update vehicle software, similar to how smartphones receive updates. This enables bug fixes, performance improvements, and new features to be delivered without requiring a visit to a service center."
        },
        {
          id: 704,
          question: "What is Tesla's approach to autonomous driving?",
          answer: "Tesla uses a vision-based approach to autonomous driving, relying primarily on cameras rather than Lidar. They collect vast amounts of data from their fleet of vehicles to train neural networks that can handle diverse driving scenarios."
        }
      ]
    },
    {
      id: 8,
      name: 'Twitter',
      logo: 'Twitter',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      questions: [
        {
          id: 801,
          question: "How would you design Twitter's trending topics algorithm?",
          answer: "I would consider factors like tweet velocity, engagement rate, diversity of sources, geographical relevance, and historical patterns. The algorithm would need to detect emerging topics quickly while filtering out spam and manipulation attempts."
        },
        {
          id: 802,
          question: "What challenges does Twitter face with content moderation?",
          answer: "Twitter must balance free expression with preventing harm. Challenges include scale (millions of tweets daily), context understanding, evolving tactics of bad actors, cultural differences across regions, and consistency in policy enforcement while minimizing false positives."
        },
        {
          id: 803,
          question: "How does Twitter's timeline algorithm work?",
          answer: "Twitter uses a ranking algorithm that considers factors like recency, relevance, engagement, relationship to the tweet author, and rich media to determine which tweets to show users in their timeline."
        },
        {
          id: 804,
          question: "What is Twitter's approach to handling spam and bots?",
          answer: "Twitter uses machine learning models to detect spammy behavior patterns, analyzes account creation signals, monitors for coordinated manipulation campaigns, and employs both automated systems and human review to combat spam and bots."
        }
      ]
    }
  ];

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.questions.some(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const toggleQuestion = (questionId) => {
    setActiveQuestion(activeQuestion === questionId ? null : questionId);
  };

  const toggleCompanyExpansion = (companyId, e) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedCompanies);
    if (newExpanded.has(companyId)) {
      newExpanded.delete(companyId);
    } else {
      newExpanded.add(companyId);
    }
    setExpandedCompanies(newExpanded);
  };

  const LogoComponent = ({ name }) => {
    const Logo = CompanyLogos[name];
    return Logo ? <Logo /> : <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center text-gray-700 font-bold">{name.charAt(0)}</div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50">
      <Head>
        <title>Interview Guides | Company-wise Preparation</title>
        <meta name="description" content="Prepare for company interviews with our comprehensive question and answer guides" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
           Company Interview Preparation
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Browse through questions and answers from top tech companies to ace your next interview
          </p>
        </div>

        <div className="mb-10 max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search companies or questions..."
              className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl leading-5 bg-white/80 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredCompanies.map(company => (
            <div 
              key={company.id} 
              className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${selectedCompany?.id === company.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div 
                className={`p-6 cursor-pointer ${company.bgColor}`}
                onClick={() => {
                  setSelectedCompany(company);
                  setActiveQuestion(null);
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4 p-2 rounded-2xl bg-white shadow-inner flex items-center justify-center">
                    <LogoComponent name={company.logo} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl">{company.name}</h3>
                    <p className="text-gray-600 text-sm">{company.questions.length} questions</p>
                  </div>
                </div>
                <button 
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                  onClick={(e) => toggleCompanyExpansion(company.id, e)}
                >
                  {expandedCompanies.has(company.id) ? 'Hide questions' : 'Show preview'}
                  <svg 
                    className={`w-4 h-4 ml-1 transition-transform ${expandedCompanies.has(company.id) ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {expandedCompanies.has(company.id) && (
                <div className="bg-white p-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Sample Questions:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {company.questions.slice(0, 3).map((q, index) => (
                      <li key={index} className="truncate">• {q.question}</li>
                    ))}
                    {company.questions.length > 3 && (
                      <li className="text-blue-600">+ {company.questions.length - 3} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedCompany && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 mb-10">
            <div className={`p-6 bg-gradient-to-r ${selectedCompany.color} text-white`}>
              <div className="flex items-center">
                <div className="mr-4 p-2 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                  <LogoComponent name={selectedCompany.logo} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedCompany.name} Interview Questions</h2>
                  <p className="opacity-90">Click on questions to reveal answers</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {selectedCompany.questions.map((q) => (
                  <div 
                    key={q.id} 
                    className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${activeQuestion === q.id ? 'ring-2 ring-blue-500 shadow-md' : 'hover:shadow-md'}`}
                  >
                    <button
                      className="flex justify-between items-center w-full text-left p-5 focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => toggleQuestion(q.id)}
                    >
                      <h3 className="font-medium text-gray-900 pr-4">{q.question}</h3>
                      <svg 
                        className={`w-5 h-5 text-gray-500 flex-shrink-0 transform transition-transform duration-300 ${activeQuestion === q.id ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeQuestion === q.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="p-5 bg-white border-t border-gray-200">
                        <p className="text-gray-700">{q.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-4 bg-gray-50 text-center">
              <button 
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => setSelectedCompany(null)}
              >
                Back to all companies
              </button>
            </div>
          </div>
        )}

        {!selectedCompany && filteredCompanies.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10 text-center border border-gray-200">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Select a company to get started</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">Choose a company from the grid above to view its complete list of interview questions and detailed answers</p>
            <div className="animate-bounce text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        )}

        {filteredCompanies.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10 text-center border border-gray-200">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 max-w-md mx-auto">Try adjusting your search query or browse all companies by clearing the search field</p>
            <button 
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              onClick={() => setSearchQuery('')}
            >
              Clear search
            </button>
          </div>
        )}
      </main>
    </div>
  );
}