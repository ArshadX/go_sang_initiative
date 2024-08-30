import AboutHero from '@/components/about/AboutHero'
import TeamSection from '@/components/about/Team'
import OurMission from '@/components/about/OurMission'
import OurValues from '@/components/about/OurValues'
import React from 'react'



export default function Page() {

  return (
    <>
      <AboutHero />
      <OurMission/>
      <OurValues/>
      <TeamSection />
    </>
    ) 
}