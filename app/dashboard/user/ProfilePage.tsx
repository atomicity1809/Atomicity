"use client";

import React, { useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, User, Award, MessageSquare, ArrowLeft, ChevronsUpDown, Tags, GraduationCap, X } from 'lucide-react';

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedInstitutes, setSelectedInstitutes] = useState<string[]>([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleCategoryChange = (value: string) => {
    setSelectedCategories(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleInstituteChange = (value: string) => {
    setSelectedInstitutes(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const clubCategories = [
    { value: "popular", label: "Popular" },
    { value: "technical", label: "Technical" },
    { value: "cultural", label: "Cultural" },
    { value: "sports", label: "Sports" },
    { value: "academic", label: "Academic" },
    { value: "social", label: "Social" },
    { value: "professional", label: "Professional" },
  ];

  const institutes = [
    { value: "itnu", label: "ITNU" },
    { value: "imnu", label: "IMNU" },
    { value: "ipnu", label: "IPNU" },
    { value: "ips", label: "IPS" },
    { value: "ild", label: "ILD" },
  ];

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
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-60 bg-white shadow-md p-6 overflow-y-auto transition-all duration-300 ease-in-out lg:translate-x-0 lg:static`}>
        <div className="flex items-center justify-between mb-6">
          {/* <Link href={'/events'}>
            <Button variant='outline'>
              <ArrowLeft />
            </Button>
          </Link> */}
          {/* <span className="text-xl font-bold">Atomicity</span> */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold px-2 text-purple-500">NAVIGATE</div>
            <nav className="space-y-1">
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
          </div>

          
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default ProfilePage;
