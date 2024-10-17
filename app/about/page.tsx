"use client"

import React from 'react';
import { Sparkles, Globe, Users, ArrowRight, Atom, Zap, Orbit, Flame } from 'lucide-react';

const AtomicParticle = ({ children, delay = 0 }:any) => (
  <div 
    className="relative group"
    style={{ animation: `float 3s ease-in-out infinite ${delay}s` }}
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-1000"></div>
    <div className="relative bg-white rounded-lg p-6 transition-transform duration-300 group-hover:scale-105">
      {children}
    </div>
  </div>
);

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 text-gray-800 overflow-hidden">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(12px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(12px) rotate(-360deg); }
        }
        
        .orbital {
          animation: orbit 20s linear infinite;
        }
      `}</style>

      <header className="relative overflow-hidden bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4">
            <Atom className="w-10 h-10 text-purple-600 orbital" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              About Atomicity
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative elements */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-purple-200/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-0 w-64 h-64 bg-indigo-200/50 rounded-full blur-3xl"></div>

        <section className="mb-16 relative">
          <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
            <Orbit className="w-8 h-8 mr-3 text-purple-600" />
            Our Nucleus
          </h2>
          <AtomicParticle>
            <p className="text-lg text-gray-700 leading-relaxed">
              Just as atoms are the building blocks of matter, Atomicity forms the foundation of campus event management. We harness the energy of student communities, creating a chain reaction of connections, opportunities, and unforgettable experiences.
            </p>
          </AtomicParticle>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
            <Zap className="w-8 h-8 mr-3 text-purple-600" />
            Our Energy State
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <AtomicParticle delay={0.1}>
              <h3 className="text-xl text-indigo-600 font-bold flex items-center mb-4">
                <Sparkles className="w-6 h-6 mr-2" />
                Vision
              </h3>
              <p className="text-gray-700">
                Catalyzing campus life through a quantum leap in event management, where every interaction sparks new possibilities.
              </p>
            </AtomicParticle>
            <AtomicParticle delay={0.2}>
              <h3 className="text-xl text-indigo-600 font-bold flex items-center mb-4">
                <Flame className="w-6 h-6 mr-2" />
                Mission
              </h3>
              <p className="text-gray-700">
                To energize student communities by fusing technology with human connection, creating a sustained chain reaction of engagement.
              </p>
            </AtomicParticle>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
            <Atom className="w-8 h-8 mr-3 text-purple-600" />
            Our Orbital Path
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <AtomicParticle delay={0.1}>
              <Globe className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Connect</h3>
              <p className="text-gray-700">
                Binding students and organizations into a cohesive network of opportunities.
              </p>
            </AtomicParticle>
            <AtomicParticle delay={0.2}>
              <Users className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Amplify</h3>
              <p className="text-gray-700">
                Accelerating event impact through streamlined planning and promotion.
              </p>
            </AtomicParticle>
            <AtomicParticle delay={0.3}>
              <Zap className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Transform</h3>
              <p className="text-gray-700">
                Elevating campus experiences to their highest energy state.
              </p>
            </AtomicParticle>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Join Our Reaction</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Become part of something greater. Add your energy to our growing network of event innovators.
          </p>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
            <span className="flex items-center">
              Initiate Fusion
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;