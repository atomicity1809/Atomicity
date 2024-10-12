"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, User, Mail, MessageSquare, Award, ChevronRight, Bell } from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';

const Main = ({ setActivePage}:any) => {
    // from clerk hook
    const {user} = useUser();

    // static event details
    // to be replaced with actual
    const registeredEvents = [
        { id: 1, title: 'Tech Conference 2024', date: '2024-09-15', confNo: 'TECH001', emailStatus: 'Sent' },
        { id: 2, title: 'Marketing Summit', date: '2024-10-22', confNo: 'MKTG002', emailStatus: 'Pending' },
        { id: 3, title: 'Leadership Workshop', date: '2024-11-05', confNo: 'LEAD003', emailStatus: 'Sent' },
      ];
      
  return (
    <main className="flex-1 p-8 overflow-y-auto">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <p className="text-3xl font-light">Welcome, <span className=' font-bold
        '>{user?.fullName} ✌🏻✌🏻</span></p>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
          </Button>
          <UserButton/>
        </div>
      </header>

      {/* Main ProfilePage content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Profile Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.imageUrl} alt="@shadcn" />
                <AvatarFallback>{user?.firstName}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{user?.fullName}</h2>
                <span className=' text-muted-foreground font-mono bg-purple-200 p-1 rounded-xl'>@{user?.username}</span>
                <p className="text-gray-500">{user?.emailAddresses[0].emailAddress}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setActivePage('Profile')}>Edit Profile</Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-500">Upcoming Events</p>
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-500">Certificates Earned</p>
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-500">Unread Messages</p>
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-500">Past Events</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registered Events Table */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Registered Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Conf. No.</TableHead>
                  <TableHead>Email Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registeredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.confNo}</TableCell>
                    <TableCell>{event.emailStatus}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Certificates */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Advanced JavaScript</span>
                <Button variant="outline" size="sm">View</Button>
              </li>
              <li className="flex justify-between items-center">
                <span>Project Management Essentials</span>
                <Button variant="outline" size="sm">View</Button>
              </li>
              <li className="flex justify-between items-center">
                <span>Data Science Fundamentals</span>
                <Button variant="outline" size="sm">View</Button>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Recent Conversations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Tech Conference Support</span>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </li>
              <li className="flex justify-between items-center">
                <span>Marketing Summit Inquiry</span>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </li>
              <li className="flex justify-between items-center">
                <span>Workshop Feedback</span>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
  )
}

export default Main
