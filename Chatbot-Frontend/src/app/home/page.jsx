import DownloadCenter from '@/compoenent/DownloadCenter'
import Footer from '@/compoenent/Footer'
import Hero from '@/compoenent/Hero'
import InterviewPrep from '@/compoenent/Interviewpre'
import Navbar from '@/compoenent/Navbar'
import ProjectIdeas from '@/compoenent/Projectideas'
import StudyMaterialsHub from '@/compoenent/StudyMaterialsHub'
import VideoLearningHub from '@/compoenent/VideoLearningHub'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <VideoLearningHub/>
        <StudyMaterialsHub/>
        <DownloadCenter/>
        <ProjectIdeas/>
        <InterviewPrep/>
        <Footer/>

    </div>
  )
}

export default page
   