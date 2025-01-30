import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  let user = useSelector((state) => state.auth.user);
  let navigate = useNavigate();

  useEffect(() => {

    if(user?.role == "recruiter"){
      navigate("/admin/companies")
    }
    
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
