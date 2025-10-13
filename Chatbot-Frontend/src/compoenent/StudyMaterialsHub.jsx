'use client';
import Link from 'next/link';
import { BookOpen, Globe, Server, Cpu, Database, Layers } from 'lucide-react';
import { useEffect } from 'react';

const subjects = [
  {
    icon: <BookOpen className="text-blue-600" />,
    title: "Programming",
    link: "/NotesPdfLayout",
    topics: ['Python', 'Java', 'C++', 'JavaScript'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Globe className="text-green-600" />,
    title: "Web Development",
    link: "/WebDevelopmentLayout",
    topics: ['HTML', 'CSS', 'React', 'Node.js'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: <Cpu className="text-purple-600" />,
    title: "DSA",
    link: "/DsaLayout",
    topics: ['Arrays', 'Trees', 'Graphs', 'DP'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: <Database className="text-orange-600" />,
    title: "DBMS",
    link: "/DbmsLayout",
    topics: ['SQL', 'NoSQL', 'Normalization', 'Indexing'],
    color: 'from-orange-500 to-rose-500',
  },
  {
    icon: <Server className="text-indigo-600" />,
    title: "OS",
    link: "/OsLayout",
    topics: ['Process', 'Memory', 'File System', 'Scheduling'],
    color: 'from-indigo-500 to-violet-500',
  },
  {
    icon: <Layers className="text-cyan-600" />,
    title: "CN",
    link: "/CnLayout",
    topics: ['TCP/IP', 'OSI Model', 'Routing', 'Security'],
    color: 'from-cyan-500 to-blue-500',
  },
];

export default function StudyMaterialsHub() {
  useEffect(() => {
    if (window.location.hash === '#study-materials-section') {
      setTimeout(() => {
        const element = document.getElementById('study-materials-section');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 animate-fade-in">
      <div 
        id="study-materials-section" 
        className="max-w-7xl mx-auto"
        style={{ scrollMarginTop: '80px' }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold flex items-center justify-center gap-2">
            <span role="img">📘</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Study Materials Hub
            </span>
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Interactive learning resources for all CS subjects
          </p>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-12 max-w-7xl mx-auto">
          {subjects.map((subject, index) => (
            <Link
              key={index}
              href={subject.link}
              className="block rounded-xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-all transform hover:scale-[1.02] cursor-pointer"
            >
              <div className={`h-2 w-full bg-gradient-to-r ${subject.color}`}></div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xl font-semibold">
                  {subject.icon}
                  <span>{subject.title}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {subject.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                  <li className="flex items-center gap-2">
                    📄 Notes & PDFs
                  </li>
                  <li className="flex items-center gap-2">
                    💻 Code Examples
                  </li>
                  <li className="flex items-center gap-2">
                    🧠 Interactive Diagrams
                  </li>
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}