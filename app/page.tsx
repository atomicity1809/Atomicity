// import Image from "next/image";

import AdditionalFeatures from "./_components/AdditionalFeatures";
import EventList from "./_components/EventList";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";
import ScrollingLogos from "./_components/ScrollingLogos";
import TestimonialSection from "./_components/TestimonialSection";
import UserJourney from "./_components/UserJourney";

export default function Home() {
  return (
    <div className="main-home-page">
      <Navbar/>
      <Hero/>
      <UserJourney/>
      <ScrollingLogos/>
      {/* <AdditionalFeatures/> */}
      {/* <EventList/> */}
      {/* <TestimonialSection/> */}
      <Footer/>
    </div>
  );
}
