'use client';

import { useState, useEffect, useRef } from 'react';
import { PlayCircle, X } from 'lucide-react';

const categories = ['All', 'Programming', 'DSA', 'Web Dev', 'DBMS', 'OS'];

// Helper function to extract YouTube ID from any URL format
const extractYouTubeId = (url) => {
  if (!url) return null;
  
  // Regular expression for all YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  
  // Return ID only if it's 11 characters (standard YouTube ID length)
  return (match && match[2].length === 11) ? match[2] : null;
};

// Video data with YouTube URLs (cleaned URLs without tracking parameters)
const videoUrls = [
  { 
    title: 'Learn HTML in 1 Hour', 
    views: '125K', 
    duration: '1:00:00',
    url: 'https://youtu.be/BsDoLVMnmZs', // Removed ?si parameter
    category: 'Web Dev'
  },
  { 
    title: 'DSA Crash Course', 
    views: '89K', 
    duration: '2:30:00',
    url: 'https://youtu.be/8hly31xKli0',
    category: 'DSA'
  },
  { 
    title: 'React Complete Guide', 
    views: '156K', 
    duration: '3:15:00',
    url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
    category: 'Web Dev'
  },
  { 
    title: 'Database Design Basics', 
    views: '78K', 
    duration: '1:20:00',
    url: 'https://youtu.be/ztHopE5Wnpc',
    category: 'DBMS'
  },
  { 
    title: 'Python for Beginners', 
    views: '234K', 
    duration: '2:00:00',
    url: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    category: 'Programming'
  },
  { 
    title: 'OS Fundamentals', 
    views: '67K', 
    duration: '1:45:00',
    url: 'https://youtu.be/vBURTt97EkA',
    category: 'OS'
  },
];

// Process videos to extract IDs and generate thumbnail URLs
const processVideos = (videoUrls) => {
  return videoUrls.map(video => {
    const id = extractYouTubeId(video.url);
    
    // Thumbnail quality fallback chain with HTTPS
    const thumbnailUrls = [
      `https://img.youtube.com/vi/${id}/maxresdefault.jpg`, // Highest quality
      `https://img.youtube.com/vi/${id}/hqdefault.jpg`,    // High quality
      `https://img.youtube.com/vi/${id}/mqdefault.jpg`,    // Medium quality
      'https://via.placeholder.com/800x450?text=No+Thumbnail' // Reliable fallback
    ];
    
    return {
      ...video,
      id,
      thumbnailUrls,
      isValid: !!id
    };
  });
};

const videos = processVideos(videoUrls);

export default function VideoLearningHub() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState({});

  // Filter videos based on active tab
  const filteredVideos = activeTab === 'All' 
    ? videos 
    : videos.filter(video => video.category === activeTab);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (window.location.hash === '#video-hub-section') {
            window.history.replaceState(null, null, ' ');
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Handle hash-based scrolling
  useEffect(() => {
    if (window.location.hash === '#video-hub-section') {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  // Handle image loading errors
  const handleImageError = (videoId) => {
    console.log(`Failed to load thumbnail for video ${videoId}`);
    setImageLoadStates(prev => ({
      ...prev,
      [videoId]: (prev[videoId] || 0) + 1
    }));
  };

  // Get current thumbnail URL based on load attempts
  const getCurrentThumbnail = (video) => {
    if (!video.isValid) return 'https://via.placeholder.com/800x450?text=Invalid+Video';
    const attempts = imageLoadStates[video.id] || 0;
    return video.thumbnailUrls[Math.min(attempts, video.thumbnailUrls.length - 1)];
  };

  const openVideo = (video) => {
    if (!video.isValid) {
      alert('This video cannot be played. Please check the URL.');
      return;
    }
    setSelectedVideo(video);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div 
      ref={sectionRef}
      className={`min-h-screen bg-white p-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div id="video-hub-section" className="max-w-7xl mx-auto">
        <h1 className={`text-red-500 text-3xl font-extrabold flex items-center justify-center gap-4 transform transition-all duration-700 delay-100 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}>
          <span>📽️</span> Video Learning Hub
        </h1>
        <p className={`text-gray-950 items-center justify-center text-center mt-4 transform transition-all duration-700 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'
          }`}>
          Watch and learn from expert tutorials
        </p>

        {/* Tabs */}
        <div className={`mt-6 bg-white/90 rounded-full shadow-md flex flex-wrap justify-center gap-2 p-2 transform transition-all duration-700 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'
          }`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Cards */}
        <div className={`grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10 transform transition-all duration-700 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          {filteredVideos.map((video, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer group"
              onClick={() => openVideo(video)}
            >
              {/* Thumbnail with multiple fallbacks */}
              <div className="relative aspect-video">
                <img 
                  src={getCurrentThumbnail(video)}
                  alt={video.title}
                  className="w-full h-full object-cover bg-gray-200"
                  onError={() => handleImageError(video.id)}
                  loading="lazy" // Add lazy loading
                />
                <div className="absolute inset-0 flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                  <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
                <span className="absolute top-3 right-3 text-xs font-semibold bg-black/80 text-white px-2 py-1 rounded-md">
                  {video.duration}
                </span>
              </div>
              
              {/* Video Info */}
              <div className="p-4">
                <h2 className="font-semibold line-clamp-2">{video.title}</h2>
                <div className="text-sm text-gray-500 flex justify-between items-center mt-2">
                  <span>{video.views} views</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    video.category === 'Web Dev' ? 'bg-blue-100 text-blue-800' :
                    video.category === 'DSA' ? 'bg-purple-100 text-purple-800' :
                    video.category === 'Programming' ? 'bg-green-100 text-green-800' :
                    video.category === 'DBMS' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {video.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {isModalOpen && selectedVideo?.isValid && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl">
              <button 
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
              >
                <X size={24} />
              </button>
              
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[500px]"
                  title={selectedVideo.title}
                ></iframe>
              </div>
              
              <div className="p-6 bg-gray-900 text-white">
                <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-gray-400">{selectedVideo.views} views</span>
                  <span className="text-gray-400">{selectedVideo.duration}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}