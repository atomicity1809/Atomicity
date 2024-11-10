"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  User,
  Mail,
  MessageSquare,
  Award,
  ChevronRight,
  Bell,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

const Main = ({ setActivePage }: any) => {
  // from clerk hook
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);
  const [recentCertificates, setRecentCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reqBody = { clerkId: user?.id };
    if (!reqBody.clerkId) return;
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/getuser", {
          method: "POST",
          body: JSON.stringify(reqBody),
        });
        const dataArray = await response.json();
        console.log(dataArray);
        const data = dataArray.userData;
        const registeredEventsData = dataArray.eventData;
        console.log(data);
        setUserDetails(data);
        setRegisteredEvents(registeredEventsData); // Set registered events
        setRecentCertificates(data.certificates.slice(0, 3)); // Get the 3 most recent certificates
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Loading state while fetching user details
  }

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <p className="text-3xl font-light">
            Welcome, <span className="font-bold">{user?.fullName} ✌🏻✌🏻</span>
          </p>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6" />
            </Button>
            <UserButton />
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
                  <span className="text-muted-foreground font-mono bg-purple-200 p-1 rounded-xl">
                    @{user?.username}
                  </span>
                  <p className="text-gray-500">
                    {user?.emailAddresses[0].emailAddress}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setActivePage("Profile")}
              >
                Edit Profile
              </Button>
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
                  <p className="text-2xl font-bold">
                    {registeredEvents.length}
                  </p>
                  <p className="text-sm text-gray-500">Registered Events</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {recentCertificates.length}
                  </p>
                  <p className="text-sm text-gray-500">Certificates Earned</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-gray-500">Unread Messages</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-gray-500">Past Events</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registered Events Table */}
          {/* <Card className="col-span-1 md:col-span-2">
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
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registeredEvents.map((event) => (
                    <TableRow key={event.confNo}>
                      <TableCell>{event.name}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.confNo}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Send Email
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card> */}

          {/* Recent Certificates */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recentCertificates.map((certificate) => (
                  <li
                    key={certificate.name}
                    className="flex justify-between items-center"
                  >
                    <span>{certificate.name}</span>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </li>
                ))}
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
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </li>
                <li className="flex justify-between items-center">
                  <span>Marketing Summit Inquiry</span>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </li>
                <li className="flex justify-between items-center">
                  <span>Workshop Feedback</span>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Main;
