"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "AI-Powered E-commerce Platform",
    description: "Smart recommendation system with ML integration",
    technologies: ["React", "Node.js", "MongoDB", "AI"],
    level: "Advanced",
    levelColor: "bg-red-500",
    borderColor: "from-blue-600 to-purple-500",
  },
  {
    title: "Real-time Chat Application",
    description: "WebSocket-based messaging platform",
    technologies: ["Socket.io", "Express", "React"],
    level: "Intermediate",
    levelColor: "bg-black",
    borderColor: "from-green-500 to-cyan-500",
  },
  {
    title: "Task Management Dashboard",
    description: "Interactive productivity tool",
    technologies: ["HTML", "CSS", "JavaScript"],
    level: "Beginner",
    levelColor: "bg-green-500", // ✅ Beginner now green
    borderColor: "from-orange-500 to-pink-500",
  },
  {
    title: "Blockchain Voting System",
    description: "Decentralized voting platform",
    technologies: ["Solidity", "Web3", "React"],
    level: "Advanced",
    levelColor: "bg-red-500",
    borderColor: "from-purple-500 to-pink-500",
  },
  {
    title: "AI Resume Analyzer",
    description: "Analyzes resumes and matches with job descriptions",
    technologies: ["Python", "NLP", "Flask", "React"],
    level: "Advanced",
    levelColor: "bg-red-500",
    borderColor: "from-indigo-500 to-pink-500",
  },
  {
    title: "E-Learning Portal",
    description: "Platform with quizzes, leaderboards, and progress tracking",
    technologies: ["Next.js", "Firebase", "Tailwind"],
    level: "Intermediate",
    levelColor: "bg-black",
    borderColor: "from-yellow-500 to-red-500",
  },
  {
    title: "Weather Forecast App",
    description: "Real-time weather updates with OpenWeather API",
    technologies: ["React", "API", "Tailwind"],
    level: "Beginner",
    levelColor: "bg-green-500",
    borderColor: "from-blue-400 to-cyan-400",
  },
  {
    title: "Smart Attendance System",
    description: "Face recognition based attendance tracking",
    technologies: ["Python", "OpenCV", "TensorFlow"],
    level: "Advanced",
    levelColor: "bg-red-500",
    borderColor: "from-green-600 to-teal-500",
  },
  {
    title: "Personal Finance Tracker",
    description: "Expense management with graphs & insights",
    technologies: ["React", "Chart.js", "LocalStorage"],
    level: "Intermediate",
    levelColor: "bg-black",
    borderColor: "from-pink-400 to-purple-500",
  },
  {
    title: "Virtual Reality Tour Guide",
    description: "VR-based travel experience with 360° views",
    technologies: ["Unity", "C#", "VR SDK"],
    level: "Advanced",
    levelColor: "bg-red-500",
    borderColor: "from-purple-600 to-blue-500",
  },
];

export default function ProjectIdeas() {
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash === "#project-ideas-section") {
        setTimeout(() => {
          const element = document.getElementById("project-ideas-section");
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100);
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  // ✅ Filter projects by tab
  const filteredProjects =
    selectedLevel === "All"
      ? projects
      : projects.filter((p) => p.level === selectedLevel);

  return (
    <div className="py-12 px-4 sm:px-8 lg:px-16 bg-gray-50 min-h-screen">
      <div
        id="project-ideas-section"
        className="max-w-7xl mx-auto"
        style={{ scrollMarginTop: "90px" }}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-600 flex justify-center items-center gap-2">
            <span className="text-purple-700 text-4xl">💡</span> Final Year
            Project Ideas
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Innovative projects to showcase your skills
          </p>
        </div>

        {/* ✅ Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
            <button
              key={level}
              onClick={() => {
                setSelectedLevel(level);
                setVisibleCount(6); // reset when changing tab
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedLevel === level
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-purple-100"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* ✅ Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.slice(0, visibleCount).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }} // ⏩ Faster animation
              viewport={{ once: true }}
              className="rounded-xl shadow-lg overflow-hidden bg-white"
            >
              <div
                className={`h-2 bg-gradient-to-r ${project.borderColor}`}
              ></div>
              <div className="p-6 relative">
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold text-white ${project.levelColor}`}
                >
                  {project.level}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {project.title}
                </h3>
                <p className="text-gray-500 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✅ Show More Button */}
        {visibleCount < filteredProjects.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold shadow hover:bg-purple-700 transition"
            >
              Show More Ideas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
