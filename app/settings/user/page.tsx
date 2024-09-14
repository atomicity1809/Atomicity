"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, User, Calendar, Bell, CreditCard } from 'lucide-react';
import ProfilePage from './ProfilePage';

const EventManagementSettings = () => {
  const [activeMenu, setActiveMenu] = useState('profile');

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'events', label: 'Event Settings', icon: Calendar },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Menu */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 bg-purple-500 text-white">
          <h2 className="text-2xl font-bold">Action Center</h2>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full px-6 py-3 text-left ${
                activeMenu === item.id ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveMenu(item.id)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <ProfilePage/>
      
      {/* <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <Input id="username" defaultValue="eventplanner123" className="max-w-md" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input id="email" defaultValue="you@example.com" className="max-w-md" />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <Textarea 
                id="bio" 
                placeholder="Tell us about your event planning experience" 
                className="min-h-[100px]"
              />
            </div>
            <Button className="mt-4">Update Profile</Button>
          </CardContent>
        </Card>
      </main> */}
    </div>
  );
};

export default EventManagementSettings;