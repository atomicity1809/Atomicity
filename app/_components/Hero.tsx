"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const Hero: React.FC = () => {
  const router = useRouter();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleExploreEvents = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push('/events');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="home" className="bg-gradient-to-b from-white to-purple-200 py-16 min-h-screen flex items-center relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <Image
            src="/imgs/atomicity_logo.png"
            alt="Atomicity Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-5xl font-bold text-gray-800 mb-8 leading-tight"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            Discover and Join <span className="text-purple-500">Amazing Events</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-xl text-gray-700 mb-10"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            Find exciting experiences, meet new people, and create lasting memories with our event platform.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/events" onClick={handleExploreEvents} prefetch={true}>
              <Button
                size="lg"
                className="text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Explore Events</span>
                <motion.div
                  className="absolute inset-0 bg-purple-600"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
