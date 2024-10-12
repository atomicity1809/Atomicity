"use client"

import React, { useState, lazy, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, User, Award, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const Main = lazy(() => import('./Main'));
const Profile = lazy(() => import('./Profile'));
const MyEvents = lazy(() => import('./MyEvents'));
const Certificates = lazy(() => import('./Certificates'));
const Conversations = lazy(() => import('./Conversations'));

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
  </div>
);

const ProfilePage = () => {
  const [activePage, setActivePage] = useState('Main');

  const renderMainContent = () => {
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        {(() => {
          switch (activePage) {
            case 'Main':
              return <Main setActivePage={setActivePage} />;
            case 'Profile':
              return <Profile />;
            case 'My Events':
              return <MyEvents />;
            case 'Certificates':
              return <Certificates />;
            case 'Conversations':
              return <Conversations />;
            default:
              return <Main setActivePage={setActivePage} />;
          }
        })()}
      </Suspense>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Link href={'/events'}>
            <Button variant='outline'>
              <ArrowLeft/>
            </Button>
          </Link>
          <span className="text-xl font-bold">Atomicity</span>
        </div>
        <nav className="space-y-4">
          {[
            { name: 'Main', icon: User },
            { name: 'Profile', icon: User },
            { name: 'My Events', icon: Calendar },
            { name: 'Certificates', icon: Award },
            { name: 'Conversations', icon: MessageSquare }
          ].map((item) => (
            <Button 
              key={item.name}
              variant={activePage === item.name ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActivePage(item.name)}
            >
              <item.icon className="mr-2 h-4 w-4" /> {item.name}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default ProfilePage;