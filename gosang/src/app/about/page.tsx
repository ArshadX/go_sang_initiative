import AboutHero from '@/components/about/AboutHero'
import TeamSection from '@/components/about/Team'
import OurMission from '@/components/about/OurMission'
import OurValues from '@/components/about/OurValues'
import React from 'react'
import Footer from '@/components/footer/Footer'
import ScrollToTop from '@/components/common/ScrollToTop'
import Objectives from '@/components/about/Objectives'



export default function Page() {

  return (
    <>
      <AboutHero />
      {/* <OurMission/> */}
      <Objectives />
      <OurValues/>
      <TeamSection />
      <Footer/>
      <ScrollToTop />

    </>
    ) 
}