import Image from "next/image";
import Chatbot from "@/compoenent/chatbot";
import Navbar from "@/compoenent/navbar";
import Hero from "@/compoenent/Hero";
import VideoLearningHub from "@/compoenent/VideoLearningHub";
import StudyMaterialsHub from "@/compoenent/StudyMaterialsHub";
import DownloadCenter from "@/compoenent/DownloadCenter";
import ProjectIdeas from "@/compoenent/Projectideas";
import InterviewPrep from "@/compoenent/Interviewpre";
import Footer from "@/compoenent/Footer";
import PythonNotes from "@/compoenent/Notes/StudyNotesSection";
import NotesPdfLayout from "@/compoenent/Notes/StudyNotesSection";
import PythonIntroPage from "@/compoenent/Notes/StudyNotesSection";
export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero />
    <VideoLearningHub />
    <StudyMaterialsHub />
    <DownloadCenter />
    <ProjectIdeas />
    <InterviewPrep />
    <Footer />
    </>

  );
}
