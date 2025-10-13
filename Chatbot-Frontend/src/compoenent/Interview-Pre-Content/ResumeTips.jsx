"use client"

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function ResumeTips() {
  const [activeTip, setActiveTip] = useState(0);
  const [activeSample, setActiveSample] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSections, setAnimatedSections] = useState([]);
  const sectionRefs = useRef([]);

  useEffect(() => {
    setIsVisible(true);
    
    const tipInterval = setInterval(() => {
      setActiveTip((prev) => (prev + 1) % resumeTips.length);
    }, 5000);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedSections((prev) => [...prev, entry.target.dataset.section]);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      clearInterval(tipInterval);
      observer.disconnect();
    };
  }, []);

  const resumeTips = [
    {
      title: "Tailor Your Resume",
      content: "Customize your resume for each job application. Highlight relevant skills and experiences that match the job description.",
      icon: "🎯",
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-100"
    },
    {
      title: "Quantify Achievements",
      content: "Use numbers to demonstrate your impact. Instead of 'increased sales,' say 'increased sales by 27% in Q2 2023.'",
      icon: "📊",
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-100"
    },
    {
      title: "Keep It Concise",
      content: "Limit your resume to 1-2 pages. Recruiters spend an average of 7 seconds reviewing a resume initially.",
      icon: "⏱️",
      color: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-100"
    },
    {
      title: "Use Action Verbs",
      content: "Start bullet points with strong action verbs like 'developed,' 'managed,' 'created,' or 'implemented.'",
      icon: "💪",
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-100"
    },
    {
      title: "Clean Formatting",
      content: "Use a clean, professional layout with consistent formatting. Ensure proper spacing and avoid clutter.",
      icon: "✨",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      title: "Include Keywords",
      content: "Incorporate keywords from the job description to get past automated applicant tracking systems (ATS).",
      icon: "🔍",
      color: "from-indigo-500 to-indigo-700",
      bgColor: "bg-indigo-100"
    }
  ];

  const proTips = [
    {
      title: "Customize for Each Application",
      content: "Tailor your resume for every job application. Research the company and incorporate keywords from the job description to show you're a perfect fit.",
      icon: "🎯"
    },
    {
      title: "Quantify Your Achievements",
      content: "Use numbers to demonstrate your impact. Instead of 'managed a team,' say 'managed a team of 12 and increased productivity by 25%.'",
      icon: "📈"
    },
    {
      title: "Use Action Verbs",
      content: "Start each bullet point with a strong action verb like 'developed,' 'implemented,' 'transformed,' or 'spearheaded' to make your experience stand out.",
      icon: "💪"
    },
    {
      title: "Keep It Concise",
      content: "Limit your resume to one page if you have less than 10 years of experience. Recruiters appreciate brevity and clarity.",
      icon: "✂️"
    },
    {
      title: "Proofread Meticulously",
      content: "Typos and grammatical errors can immediately disqualify you. Read your resume aloud, use spell check, and have someone else review it.",
      icon: "🔍"
    },
    {
      title: "Focus on Results",
      content: "Instead of listing responsibilities, highlight your accomplishments and how they benefited your previous employers.",
      icon: "🏆"
    }
  ];

  const resumeSamples = [
    {
      title: "Professional Corporate",
      description: "Clean, traditional layout ideal for finance, law, and corporate positions",
      color: "blue",
      industry: "Finance, Law, Business",
      bestFor: "Traditional industries and conservative companies",
      tips: [
        "Use conservative fonts like Times New Roman or Arial",
        "Focus on achievements with quantifiable metrics",
        "Keep design minimal and professional",
        "Use a reverse-chronological format",
        "Include a professional summary at the top"
      ],
      features: ["Clean lines", "Neutral colors", "Standard sections", "ATS-friendly"],
      icon: "💼",
      image: "/images/corporate-resume.png",
      templateLink: "/images/corporate-resume.png",
      exampleLink: "/images/corporate-resume.png"
    },
    {
      title: "Modern Creative",
      description: "Contemporary design perfect for designers, marketers, and tech roles",
      color: "purple",
      industry: "Design, Marketing, Tech",
      bestFor: "Creative fields and innovative companies",
      tips: [
        "Incorporate subtle colors and design elements",
        "Showcase portfolio links prominently",
        "Balance creativity with readability",
        "Consider a skills-based format",
        "Add a personal branding statement"
      ],
      features: ["Modern layout", "Subtle colors", "Visual elements", "Personal brand"],
      icon: "🎨",
      image: "/images/creative-resume.png",
      templateLink: "/images/creative-resume.png",
      exampleLink: "/images/creative-resume.png"
    },
    {
      title: "Academic & Research",
      description: "Comprehensive format for academic, research, and scientific positions",
      color: "green",
      industry: "Education, Research, Science",
      bestFor: "Academic and research-intensive roles",
      tips: [
        "Highlight publications and research experience",
        "Include conferences and presentations",
        "Detail relevant coursework and projects",
        "List grants and awards received",
        "Emphasize teaching experience if applicable"
      ],
      features: ["Publications section", "Research focus", "Detailed projects", "Academic honors"],
      icon: "📚",
      image: "/images/academic-resume.png",
      templateLink: "/images/academic-resume.png",
      exampleLink: "/images/academic-resume.png"
    },
    {
      title: "Executive Level",
      description: "Strategic, leadership-focused resume for senior positions",
      color: "amber",
      industry: "Executive, Leadership, Management",
      bestFor: "C-level and senior management roles",
      tips: [
        "Focus on leadership and strategic impact",
        "Highlight revenue growth and cost savings",
        "Include board memberships and affiliations",
        "Emphasize team leadership and scaling",
        "Keep it to 2-3 pages maximum"
      ],
      features: ["Leadership focus", "Strategic achievements", "Board experience", "Company growth"],
      icon: "👔",
      image: "/images/executive-resume.png",
      templateLink: "/images/executive-resume.png",
      exampleLink: "/images/executive-resume.png"
    }
  ];

  const resumeBasics = [
    {
      title: "Contact Information",
      items: ["Full Name", "Professional Email", "Phone Number", "LinkedIn Profile", "Portfolio/GitHub (if applicable)"],
      icon: "📞"
    },
    {
      title: "Professional Summary",
      items: ["2-3 sentence overview of your qualifications", "Highlight key achievements and skills", "Tailor to the specific role"],
      icon: "📝"
    },
    {
      title: "Work Experience",
      items: ["List in reverse chronological order", "Include company name, position, and dates", "Use bullet points to describe achievements"],
      icon: "💼"
    },
    {
      title: "Education",
      items: ["Degree, major, institution name", "Graduation year", "Relevant coursework or honors"],
      icon: "🎓"
    },
    {
      title: "Skills Section",
      items: ["Technical skills", "Soft skills", "Languages", "Certifications"],
      icon: "🛠️"
    }
  ];

  const commonMistakes = [
    "Spelling and grammar errors",
    "Using an unprofessional email address",
    "Including irrelevant personal information",
    "Using passive language instead of action verbs",
    "Being too vague about accomplishments",
    "Inconsistent formatting",
    "Including every job you've ever had"
  ];

  const isSectionAnimated = (sectionId) => animatedSections.includes(sectionId);

  // Function to get color classes based on sample color
  const getColorClasses = (color) => {
    const classes = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-300',
        button: 'bg-blue-600 hover:bg-blue-700',
        from: 'from-blue-500',
        to: 'to-blue-700'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        border: 'border-purple-300',
        button: 'bg-purple-600 hover:bg-purple-700',
        from: 'from-purple-500',
        to: 'to-purple-700'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-300',
        button: 'bg-green-600 hover:bg-green-700',
        from: 'from-green-500',
        to: 'to-green-700'
      },
      amber: {
        bg: 'bg-amber-100',
        text: 'text-amber-800',
        border: 'border-amber-300',
        button: 'bg-amber-600 hover:bg-amber-700',
        from: 'from-amber-500',
        to: 'to-amber-600'
      }
    };
    return classes[color] || classes.blue;
  };

// For PNG images - will open in new tab
const handleViewExample = (exampleLink) => {
  window.open(exampleLink, '_blank', 'noopener,noreferrer');
};

// For DOCX templates - will trigger download
const handleDownloadTemplate = (templateLink) => {
  const link = document.createElement('a');
  link.href = templateLink;
  link.download = templateLink.split('/').pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  // Function to render sample image
  const renderSampleImage = (sample) => {
    return (
      <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-300 flex items-center justify-center">
        {/* Actual Image */}
        <Image 
          src={sample.image} 
          alt={`${sample.title} Resume Example`}
          fill
          className="object-contain"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70 rounded-xl">
          <div className="text-white text-center p-4">
            <div className="text-lg font-semibold mb-2">Resume Preview</div>
            <div className="text-sm">Click to view full sample</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Resume Excellence | Build Impressive Resumes</title>
        <meta name="description" content="Expert tips and samples to create impressive resumes that get you noticed by employers" />
      </Head>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-block p-3 rounded-2xl bg-white shadow-lg mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
              <span className="text-2xl text-white">📄</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4">
            Craft Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Perfect Resume</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Professional guidance, templates, and examples to create resumes that stand out and land interviews
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Tips Section */}
        <div 
          ref={el => sectionRefs.current[0] = el}
          data-section="tips"
          className={`mb-20 transition-all duration-1000 ${isSectionAnimated("tips") ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Essential Resume <span className="text-blue-600">Tips</span></h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Expert advice to transform your resume from good to exceptional</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeTips.map((tip, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border-t-4 border-${tip.color.split('-')[1]}-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}
              >
                <div className={`w-16 h-16 rounded-2xl ${tip.bgColor} flex items-center justify-center mb-5`}>
                  <span className="text-3xl">{tip.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{tip.title}</h3>
                <p className="text-slate-600">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips Section */}
        <div 
          ref={el => sectionRefs.current[1] = el}
          data-section="protips"
          className={`mb-20 transition-all duration-1000 delay-150 ${isSectionAnimated("protips") ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 mr-4"></div>
            <h2 className="text-4xl font-bold text-slate-800 whitespace-nowrap">Pro <span className="text-blue-600">Tips</span></h2>
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 ml-4"></div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-6">Advanced Strategies</h3>
                <p className="text-blue-100 text-lg mb-8">Go beyond the basics with these expert recommendations to make your resume truly stand out.</p>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                  <h4 className="text-xl font-semibold mb-3">Bonus Tip</h4>
                  <p>Create a master resume with all your experiences, then create tailored versions for specific applications by selecting the most relevant content.</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {proTips.map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-white/20 rounded-lg p-2 mr-4 flex-shrink-0">
                      <span className="text-xl">{tip.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{tip.title}</h4>
                      <p className="text-blue-100">{tip.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Resume Samples Section */}
        <div 
          ref={el => sectionRefs.current[2] = el}
          data-section="samples"
          className={`mb-20 transition-all duration-1000 delay-300 ${isSectionAnimated("samples") ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Resume <span className="text-blue-600">Samples</span> & Templates</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore professionally designed resume templates for different industries and career levels
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Sample Navigation Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto scrollbar-hide px-6">
                {resumeSamples.map((sample, index) => {
                  const colorClass = getColorClasses(sample.color);
                  return (
                    <button
                      key={index}
                      className={`px-6 py-4 font-medium whitespace-nowrap transition-all duration-300 relative flex items-center ${
                        activeSample === index 
                          ? `${colorClass.text} font-semibold` 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveSample(index)}
                    >
                      <span className="mr-2">{sample.icon}</span>
                      {sample.title}
                      {activeSample === index && (
                        <div className={`absolute bottom-0 left-0 right-0 h-1 ${colorClass.bg} rounded-t-full`}></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Sample Content */}
            <div className="p-8">
              {resumeSamples.map((sample, index) => {
                const colorClass = getColorClasses(sample.color);
                return (
                  <div key={index} className={`${activeSample === index ? 'block' : 'hidden'} animate-fadeIn`}>
                    <div className="grid lg:grid-cols-2 gap-10">
                      {/* Sample Info */}
                      <div>
                        <div className="flex items-start mb-6">
                          <div className={`w-14 h-14 rounded-xl ${colorClass.bg} flex items-center justify-center mr-4`}>
                            <span className="text-2xl">{sample.icon}</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-800">{sample.title}</h3>
                            <p className="text-slate-600">{sample.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-6 mb-8">
                          <div className="bg-slate-50 rounded-xl p-4">
                            <h4 className="font-semibold text-slate-700 mb-2">Industry</h4>
                            <p className="text-slate-600">{sample.industry}</p>
                          </div>
                          <div className="bg-slate-50 rounded-xl p-4">
                            <h4 className="font-semibold text-slate-700 mb-2">Best For</h4>
                            <p className="text-slate-600">{sample.bestFor}</p>
                          </div>
                        </div>
                        
                        <div className="mb-8">
                          <h4 className="font-semibold text-slate-800 mb-3">Key Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {sample.features.map((feature, i) => (
                              <span key={i} className={`px-3 py-1 rounded-full ${colorClass.bg} ${colorClass.text} text-sm`}>
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className={`rounded-2xl p-5 ${colorClass.bg} border ${colorClass.border}`}>
                          <h4 className="font-semibold mb-3 flex items-center">
                            <span className="mr-2">💡</span>
                            Best Practices
                          </h4>
                          <ul className="space-y-2">
                            {sample.tips.map((tip, i) => (
                              <li key={i} className="flex items-start">
                                <span className={`mr-2 ${colorClass.text}`}>•</span>
                                <span className="text-slate-700">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Sample Preview with Image */}
                      <div>
                        <div className="sticky top-6">
                          {/* Image Display */}
                          <div className="mb-6">
                            {renderSampleImage(sample)}
                          </div>
                          
                          <div className="flex justify-center space-x-4">
                            <button 
                              className={`px-6 py-3 text-white rounded-lg font-medium transition-all hover:shadow-lg ${colorClass.button}`}
                              onClick={() => handleDownloadTemplate(sample.templateLink)}
                            >
                              Download Template
                            </button>
                            <button 
                              className="px-6 py-3 border border-gray-300 text-slate-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
                              onClick={() => handleViewExample(sample.exampleLink)}
                            >
                              View Example
                            </button>
                          </div>
                          
                          <p className="text-center text-sm text-gray-500 mt-4">
                            Fully customizable template compatible with Word, Google Docs, and PDF
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resume Basics & Mistakes */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <div 
            ref={el => sectionRefs.current[3] = el}
            data-section="basics"
            className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-1000 delay-500 ${isSectionAnimated("basics") ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <span className="text-green-600 text-xl">📄</span>
              </div>
              <h2 className="text-3xl font-semibold text-slate-800">Resume Fundamentals</h2>
            </div>
            
            <div className="space-y-6">
              {resumeBasics.map((section, index) => (
                <div 
                  key={index} 
                  className="bg-slate-50 rounded-xl p-5 border-l-4 border-green-400 transition-all duration-500 hover:shadow-md"
                >
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{section.icon}</span>
                    <h3 className="text-xl font-medium text-slate-800">{section.title}</h3>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-slate-600">
                    {section.items.map((item, i) => (
                      <li key={i} className="transition-all duration-300 hover:translate-x-1">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div 
            ref={el => sectionRefs.current[4] = el}
            data-section="mistakes"
            className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-1000 delay-700 ${isSectionAnimated("mistakes") ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
              <h2 className="text-3xl font-semibold text-slate-800">Common Mistakes to Avoid</h2>
            </div>
            
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <ul className="space-y-4">
                {commonMistakes.map((mistake, index) => (
                  <li 
                    key={index} 
                    className="flex items-start transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="text-red-500 text-xl mr-3">✗</span>
                    <span className="text-slate-700">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center mb-3">
                <span className="text-2xl text-blue-600 mr-3">💎</span>
                <h3 className="text-xl font-medium text-blue-800">Final Pro Tip</h3>
              </div>
              <p className="text-slate-700">
                Save your resume as a PDF with a professional filename (e.g., "YourName_Resume.pdf") to preserve formatting and present a polished image to employers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}