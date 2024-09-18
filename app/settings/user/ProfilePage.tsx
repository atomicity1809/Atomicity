"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, User, Award, MessageSquare, ArrowLeft } from 'lucide-react';
import Main from './Main';
import Profile from './Profile';
import MyEvents from './MyEvents';
import Certificates from './Certificates';
import Conversations from './Conversations';
import Link from 'next/link';

const ProfilePage = () => {
  const [activePage, setActivePage] = useState('Main');

  const renderMainContent = () => {
    switch (activePage) {
      case 'Main':
        return <Main/>;
      case 'Profile':
        return <Profile />;
      case 'My Events':
        return <MyEvents />;
      case 'Certificates':
        return <Certificates />;
      case 'Conversations':
        return <Conversations />;
      default:
        return <Profile />;
    }
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
          <Button 
            variant={activePage === 'Main' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActivePage('Main')}
          >
            <User className="mr-2 h-4 w-4" /> Main
          </Button>
          <Button 
            variant={activePage === 'Profile' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActivePage('Profile')}
          >
            <User className="mr-2 h-4 w-4" /> Profile
          </Button>
          <Button 
            variant={activePage === 'My Events' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActivePage('My Events')}
          >
            <Calendar className="mr-2 h-4 w-4" /> My Events
          </Button>
          <Button 
            variant={activePage === 'Certificates' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActivePage('Certificates')}
          >
            <Award className="mr-2 h-4 w-4" /> Certificates
          </Button>
          <Button 
            variant={activePage === 'Conversations' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActivePage('Conversations')}
          >
            <MessageSquare className="mr-2 h-4 w-4" /> Conversations
          </Button>
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
