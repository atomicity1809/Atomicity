import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Users, Zap } from 'lucide-react';
import AdditionalFeatures from './AdditionalFeatures';

const Hero: React.FC = () => {
  return (
    <section id="home" className="bg-gradient-to-t from-purple-500 to-white py-20">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto mb-12 transition-all duration-500 ease-in-out transform hover:scale-105">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
            Unleash the Power of{' '}
            <span className="text-purple-500">Unforgettable Events</span>
          </h1>
          <p className="text-xl text-black font-light mb-10">
            Transform your ideas into extraordinary experiences with our cutting-edge event management platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* <Button size="lg" className="bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 transition-colors duration-300">
              <Link href='/events'>Explore Events</Link>
            </Button> */}
            <Button>
              <Link href='/events'>Explore Events</Link>
            </Button>
            {/* <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600 transition-colors duration-300">
              <Link href='/create'>Create Event</Link>
            </Button> */}
            <Button variant="outline">
              <Link href='/create'>Create Events</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-white">
          {[
            { icon: Calendar, title: "Easy Scheduling", description: "Plan and organize events with our intuitive calendar interface" },
            { icon: Users, title: "Seamless Collaboration", description: "Work together with your team in real-time for flawless execution" },
            { icon: Zap, title: "Powerful Analytics", description: "Gain insights and optimize your events with detailed reports" }
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center transition-all duration-500 ease-in-out transform hover:scale-105">
              <feature.icon size={48} className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;