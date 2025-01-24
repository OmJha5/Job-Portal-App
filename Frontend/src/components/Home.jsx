import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import fetchAllJobs from "../utils/fetchAllJobs";
import { useDispatch } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllJobs(dispatch); // Call the utility function with dispatch
  }, []); 

  return (
    <div>
      <Navbar/>

      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>

    </div>
  )
}
