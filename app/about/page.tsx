import React from 'react';
import { Sparkles, Globe, Users, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">About Atomicity</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
          <p className="text-lg text-gray-700 mb-6">
            Atomicity was born from a simple idea: to create a platform that brings together the vibrant energy of college events and the power of community. We believe that every student should have the opportunity to explore, engage, and excel beyond the classroom.
          </p>
          <p className="text-lg text-gray-700">
            Since our inception, we've been on a mission to revolutionize the way students discover, participate in, and organize events across campuses nationwide.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-xl text-indigo-600 font-medium flex items-center">
              <Sparkles className="w-6 h-6 mr-2" />
              Empowering student communities through seamless event experiences
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <Globe className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0" />
                <p className="text-gray-700">To create a unified platform that connects students, clubs, and institutions, fostering a thriving ecosystem of events and opportunities.</p>
              </li>
              <li className="flex items-start">
                <Users className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0" />
                <p className="text-gray-700">To empower student organizations with tools to effortlessly plan, promote, and manage events that enrich campus life.</p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0" />
                <p className="text-gray-700">To facilitate personal and professional growth by connecting students with diverse experiences and networking opportunities.</p>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Us</h2>
          <p className="text-lg text-gray-700 mb-6">
            Whether you're a student looking to explore new horizons, a club aiming to boost engagement, or an institution seeking to enhance campus life, Atomicity is here to support your journey.
          </p>
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;