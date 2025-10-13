"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Download,
  Star,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  BarChart3,
  Target,
  FileText,
  Sparkles,
  RotateCcw,
  X,
} from "lucide-react";

const questions = [
  {
    id: 1,
    q: "Tell me about yourself.",
    a: "Start with a brief personal introduction, then focus on your education, relevant experience, skills, and achievements. End with why you're interested in this position and how you can contribute. Keep it concise (1-2 minutes) and professional.",
    category: "Introduction",
  },
  {
    id: 2,
    q: "What are your strengths?",
    a: "Identify 2-3 key strengths relevant to the role. For each strength, provide a specific example of how you've used it. Good options include: communication skills, problem-solving, leadership, adaptability, or technical skills specific to the job.",
    category: "Self-assessment",
  },
  {
    id: 3,
    q: "What are your weaknesses?",
    a: "Choose a real but not critical weakness. Show self-awareness and explain steps you're taking to improve. Example: 'I used to struggle with public speaking, so I joined Toastmasters and now feel much more confident presenting to groups.'",
    category: "Self-assessment",
  },
  {
    id: 4,
    q: "Where do you see yourself in 5 years?",
    a: "Show ambition aligned with the company's growth. Mention wanting to develop specific skills, take on more responsibility, and grow with the organization. Avoid mentioning specific job titles or roles that might not exist in the company.",
    category: "Career Goals",
  },
  {
    id: 5,
    q: "Why should we hire you?",
    a: "Summarize your most relevant qualifications, experience, and skills. Explain how you can solve their problems or help achieve their goals. Mention what makes you unique compared to other candidates.",
    category: "Value Proposition",
  },
  {
    id: 6,
    q: "How do you handle pressure or stressful situations?",
    a: "Explain your approach to stress management. You might mention: breaking large tasks into smaller steps, prioritizing, maintaining work-life balance, or using specific techniques like mindfulness. Provide a brief example.",
    category: "Behavioral",
  },
  {
    id: 7,
    q: "Describe a time you had a conflict at work and how you resolved it.",
    a: "Use the STAR method: Situation (briefly describe the conflict), Task (your role in resolving it), Action (steps you took to address it), Result (outcome and what you learned). Focus on communication and problem-solving skills.",
    category: "Behavioral",
  },
  {
    id: 8,
    q: "Why do you want to work here?",
    a: "Show you've researched the company. Mention specific things that appeal to you: their mission, values, culture, projects, reputation, or growth. Explain how these align with your own career goals and values.",
    category: "Company Interest",
  },
  {
    id: 9,
    q: "How do you prioritize your work when you have multiple deadlines?",
    a: "Explain your prioritization framework. You might mention: evaluating urgency vs importance, communicating with stakeholders about timelines, using tools like to-do lists or project management software, and being flexible when priorities change.",
    category: "Work Style",
  },
  {
    id: 10,
    q: "Describe your leadership style.",
    a: "If you have leadership experience, describe your approach (collaborative, democratic, transformational, etc.). Provide an example of how your style has helped a team succeed. If you don't have formal leadership experience, describe how you influence others.",
    category: "Leadership",
  },
  {
    id: 11,
    q: "What motivates you?",
    a: "Be honest but professional. Good answers include: solving challenging problems, learning new skills, helping others succeed, seeing projects through to completion, or contributing to company goals.",
    category: "Self-assessment",
  },
  {
    id: 12,
    q: "How do you handle feedback?",
    a: "Explain that you welcome constructive feedback as an opportunity to grow. Describe your process for receiving feedback (listening without being defensive, asking clarifying questions, creating an action plan for improvement) and provide an example.",
    category: "Behavioral",
  },
  {
    id: 13,
    q: "What are your salary expectations?",
    a: "Research typical salaries for the role and location beforehand. Provide a range rather than a specific number. You can say: 'Based on my research and experience, I'm expecting somewhere in the range of [range]. However, I'm flexible based on the total compensation package.'",
    category: "Compensation",
  },
  {
    id: 14,
    q: "Do you have any questions for us?",
    a: "Always have questions prepared. Good options include: 'What do you enjoy most about working here?', 'What are the biggest challenges facing this team/department?', 'How do you measure success in this role?', 'What opportunities for professional development are available?'",
    category: "Closing",
  },
];

const tips = [
  {
    title: "Body Language",
    content: "Maintain eye contact, sit up straight, and use natural gestures. Avoid crossing your arms or fidgeting excessively.",
    icon: "👁️"
  },
  {
    title: "STAR Method",
    content: "Use the Situation, Task, Action, Result framework to structure your answers to behavioral questions.",
    icon: "⭐"
  },
  {
    title: "Stay Positive",
    content: "Never speak negatively about previous employers or colleagues. Frame challenges as learning experiences.",
    icon: "😊"
  },
  {
    title: "Be Specific",
    content: "Use concrete examples and quantifiable achievements to back up your claims whenever possible.",
    icon: "📊"
  },
  {
    title: "Prepare Questions",
    content: "Have 2-3 thoughtful questions ready to ask the interviewer about the role, team, or company culture.",
    icon: "❓"
  },
  {
    title: "Practice",
    content: "Rehearse your answers but avoid sounding scripted. Focus on conveying authenticity and enthusiasm.",
    icon: "🎯"
  },
  {
    title: "Research",
    content: "Learn about the company's mission, values, recent news, and products/services before the interview.",
    icon: "🔍"
  },
  {
    title: "Follow Up",
    content: "Send a thank-you email within 24 hours, reiterating your interest and key qualifications.",
    icon: "✉️"
  },
];

const categoryColors = {
  "Introduction": "bg-blue-100 text-blue-800 border border-blue-200",
  "Self-assessment": "bg-purple-100 text-purple-800 border border-purple-200",
  "Career Goals": "bg-amber-100 text-amber-800 border border-amber-200",
  "Value Proposition": "bg-green-100 text-green-800 border border-green-200",
  "Behavioral": "bg-rose-100 text-rose-800 border border-rose-200",
  "Company Interest": "bg-indigo-100 text-indigo-800 border border-indigo-200",
  "Work Style": "bg-cyan-100 text-cyan-800 border border-cyan-200",
  "Leadership": "bg-violet-100 text-violet-800 border border-violet-200",
  "Compensation": "bg-emerald-100 text-emerald-800 border border-emerald-200",
  "Closing": "bg-fuchsia-100 text-fuchsia-800 border border-fuchsia-200",
};

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/30"></div>
      <motion.div 
        className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-400/5"
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: [
              "#3b82f6", "#60a5fa", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"
            ][Math.floor(Math.random() * 6)],
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ 
            opacity: 0,
            y: -100,
            x: Math.random() * 100 - 50,
          }}
          animate={{ 
            opacity: [0, 1, 0],
            y: [0, Math.random() * 200 + 100],
            x: [0, Math.random() * 200 - 100],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1 + Math.random() * 2,
            delay: Math.random() * 0.5,
            times: [0, 0.5, 1],
          }}
        />
      ))}
    </div>
  );
};

export default function HRQuestionsPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedQuestions, setSavedQuestions] = useState(new Set());
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.1]);

  const toggleAnswer = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const toggleSaveQuestion = (id, e) => {
    e.stopPropagation();
    const newSaved = new Set(savedQuestions);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    setSavedQuestions(newSaved);
  };

  const categories = ["All", ...new Set(questions.map((q) => q.category))];

  const filteredQuestions = questions.filter((q) => {
    const matchesCategory = activeCategory === "All" || q.category === activeCategory;
    const matchesSearch = 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSaved = !showSavedOnly || savedQuestions.has(q.id);
    return matchesCategory && matchesSearch && matchesSaved;
  });

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
      opacity: 1
    }
  };

  const downloadPDF = () => {
    // Create a new jsPDF instance
    const { jsPDF } = require("jspdf");
    const doc = new jsPDF();
    
    // Set initial y position
    let y = 20;
    
    // Add title
    doc.setFontSize(20);
    doc.text("HR Interview Preparation Guide", 105, y, { align: "center" });
    y += 15;
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, y, { align: "center" });
    y += 20;
    
    // Add questions and answers
    doc.setFontSize(16);
    doc.text("Interview Questions & Answers", 20, y);
    y += 10;
    
    questions.forEach((item, index) => {
      // Check if we need to add a new page
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      
      // Add question
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`${index + 1}. ${item.q}`, 20, y);
      y += 8;
      
      // Add category
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`Category: ${item.category}`, 20, y);
      y += 6;
      
      // Add answer
      const splitAnswer = doc.splitTextToSize(item.a, 170);
      doc.text(splitAnswer, 20, y);
      y += (splitAnswer.length * 6) + 10;
      
      // Add separator
      if (index < questions.length - 1) {
        doc.line(20, y, 190, y);
        y += 5;
      }
    });
    
    // Add tips section
    doc.addPage();
    y = 20;
    doc.setFontSize(16);
    doc.text("Interview Success Tips", 20, y);
    y += 10;
    
    tips.forEach((tip, index) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`${index + 1}. ${tip.title}`, 20, y);
      y += 8;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      const splitContent = doc.splitTextToSize(tip.content, 170);
      doc.text(splitContent, 20, y);
      y += (splitContent.length * 6) + 10;
    });
    
    // Save the PDF
    doc.save("HR-Interview-Preparation-Guide.pdf");
  };

  const resetFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
    setShowSavedOnly(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 transition-colors duration-300 relative overflow-hidden">
      <AnimatedBackground />
      <FloatingParticles />
      {showConfetti && <Confetti />}
      
      <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10" ref={containerRef}>
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 relative"
        >
          <motion.div 
            className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
            }}
          />
          <motion.div 
            className="absolute -bottom-5 -right-5 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -180, -360],
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
            }}
          />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4 relative"
          >
            <Target className="text-blue-600" size={24} />
            <motion.div 
              className="absolute inset-0 border-2 border-blue-300 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            HR Interview Preparation
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Master common HR interview questions with expert answers, actionable tips, and strategies to impress your interviewers.
          </motion.p>
          
          <motion.div 
            className="absolute top-5 right-10 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={40} />
          </motion.div>
        </motion.section>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: FileText, value: questions.length, label: "Questions", color: "blue" },
            { icon: BarChart3, value: categories.length - 1, label: "Categories", color: "purple" },
            { icon: Lightbulb, value: tips.length, label: "Tips", color: "amber" },
            { icon: BookmarkCheck, value: savedQuestions.size, label: "Saved", color: "green" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center transition-all hover:shadow-md relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-80"></div>
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-${stat.color}-100 rounded-full mb-3`}>
                  <stat.icon className={`text-${stat.color}-600`} size={20} />
                </div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
              
              <motion.div 
                className={`absolute -bottom-4 -right-4 w-16 h-16 bg-${stat.color}-500/10 rounded-full`}
                animate={{ 
                  scale: [1, 1.5, 1],
                }}
                transition={{ 
                  duration: 3 + index,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="mb-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <motion.input
                type="text"
                placeholder="Search questions or answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm transition-all"
                whileFocus={{ scale: 1.01 }}
              />
            </div>
            
            <motion.button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                showSavedOnly
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <BookmarkCheck size={16} />
              Saved Only
            </motion.button>
            
            {(activeCategory !== "All" || searchQuery || showSavedOnly) && (
              <motion.button
                onClick={resetFilters}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw size={16} />
                Reset
              </motion.button>
            )}
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Filter size={18} className="text-gray-500" />
                <span>Category:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Questions Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <BookOpen size={22} className="text-blue-600" />
              Interview Questions
            </h3>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredQuestions.length} of {questions.length}
            </span>
          </div>
          
          {filteredQuestions.length > 0 ? (
            <div className="grid gap-4">
              {filteredQuestions.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md relative"
                  layout
                >
                  <div 
                    onClick={() => toggleAnswer(item.id)}
                    className="cursor-pointer p-6 flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <motion.span 
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[item.category]}`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {item.category}
                        </motion.span>
                      </div>
                      <h4 className="text-lg font-semibold pr-8 text-gray-800">{item.q}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button 
                        onClick={(e) => toggleSaveQuestion(item.id, e)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label={savedQuestions.has(item.id) ? "Unsave question" : "Save question"}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {savedQuestions.has(item.id) ? (
                          <BookmarkCheck size={18} className="text-blue-500" />
                        ) : (
                          <Bookmark size={18} className="text-gray-400" />
                        )}
                      </motion.button>
                      <motion.div
                        animate={{ rotate: openIndex === item.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {openIndex === item.id ? (
                          <ChevronUp size={20} className="text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-500 flex-shrink-0" />
                        )}
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {openIndex === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex gap-3 items-start">
                            <motion.div 
                              className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full mt-1 flex-shrink-0"
                              animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              <Star className="text-amber-600" size={16} />
                            </motion.div>
                            <div>
                              <h5 className="font-medium text-gray-700 mb-2">Expert Answer</h5>
                              <p className="text-gray-600 leading-relaxed">{item.a}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-200 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FileText className="mx-auto mb-3 text-gray-400" size={42} />
              <p className="text-lg font-medium mb-2">No questions found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </motion.div>

        {/* Tips Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-4xl mx-auto"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <motion.div 
              className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full"
              animate={{ 
                rotate: [0, 10, -10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            >
              <Lightbulb size={18} className="text-amber-600" />
            </motion.div>
            Interview Success Tips
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-80 z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="text-2xl"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 5,
                        delay: i * 0.5,
                      }}
                    >{tip.icon}</motion.div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">{tip.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{tip.content}</p>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  className="absolute -bottom-4 -right-4 w-16 h-16 bg-amber-500/10 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                  }}
                  transition={{ 
                    duration: 5 + i,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Download Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-16"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-10 rounded-2xl text-white shadow-lg relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
              animate={{ 
                x: [0, -30, 0],
                y: [0, -30, 0],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
              }}
            />
            
            <div className="relative z-10">
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 360,
                }}
                transition={{ 
                  duration: 0.5,
                }}
              >
                <Download className="text-white" size={28} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Download Complete HR Interview Guide</h3>
              <p className="mb-6 opacity-90 max-w-xl mx-auto">Get all questions, answers, and tips in a professionally formatted PDF for your interview preparation</p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadPDF}
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-medium px-6 py-3.5 rounded-lg shadow hover:bg-gray-50 transition-colors"
                >
                  <Download size={18} /> Download PDF
                </motion.button>
              </div>
            </div>
            
            <motion.div 
              className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
              }}
            />
            <motion.div 
              className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full"
              animate={{ 
                scale: [1, 1.7, 1],
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
              }}
            />
          </div>
                </motion.section>

      </main>
    </div>
  );
}