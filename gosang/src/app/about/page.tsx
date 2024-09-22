import AboutHero from '@/components/about/AboutHero'
import TeamSection from '@/components/about/Team'
import OurValues from '@/components/about/OurValues'
import React from 'react'
import ScrollToTop from '@/components/common/ScrollToTop'
import Objectives from '@/components/about/Objectives'
import StatsSection from '@/components/about/StatsSection'



export default function Page() {

  return (
    <>
      <AboutHero />
      {/* <OurMission/> */}
      <Objectives />
      <OurValues/>
      <StatsSection/>
      <TeamSection />
      <ScrollToTop />

    </>
    ) 
}