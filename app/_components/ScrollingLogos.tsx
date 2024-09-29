"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Array of club objects with names and logo paths
const clubs = [
  { name: "ECO", logo: "/logos/eco.png" },
  { name: "CSI", logo: "/logos/csi.jpg" },
  { name: "ISTE", logo: "/logos/iste.jpg" },
  { name: "EESA", logo: "/logos/eesa.jpg" },
  { name: "MESA", logo: "/logos/mesa.png" },
  { name: "NUMAISH", logo: "/logos/numaish.jpg" },
  { name: "ORCES", logo: "/logos/orces.png" },
  { name: "ROBOTECH", logo: "/logos/robotech.png" },
  { name: "ACES", logo: "/logos/aces.jpg" },
];

// Double the array to create a seamless loop
const clubLogos = [...clubs, ...clubs];

const ScrollingLogos = () => {
  return (
    <div className="overflow-hidden bg-purple-500 py-10 pb-9">
      <h2 className="text-7xl text-white text-center mb-8">Clubs 
        <span className=' font-thin ml-2'>
            <i>@</i>
            Atomi<b>City</b>
        </span>
      </h2>
      <motion.div 
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {clubLogos.map((club, index) => (
          <div
            key={`${club.name}-${index}`}
            className="flex-shrink-0 mx-4"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center">
              <Image 
                src={club.logo} 
                alt={`${club.name} logo`}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <p className="text-center text-white font-light mt-2 text-sm">{club.name}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollingLogos;