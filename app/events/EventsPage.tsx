"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  DollarSignIcon,
  UserIcon,
  PlusCircle,
  Radio,
  Clock,
  ListMusic,
  Music,
  User,
  BarChart2,
  Search,
  Home,
  LayoutDashboard,
  Settings,
  LogOut,
  LogIn,
  CheckIcon,
  ChevronsUpDown,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import ClubEvents from "./_tabs/ClubEvents";
import CalendarEvents from "./_tabs/CalendarEvents";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

interface Event {
  _id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  location: string;
  time: string;
  fees: number;
  maxAllowedParticipants: number;
  noMaxParticipants: boolean;
  coverImg: string;
  isAvailableToReg: boolean;
  clubName: string;
  eventType: string;
  registeredUsers: string[];
}

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

const EventCard: React.FC<{ event: Event }> = ({ event }): JSX.Element => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 relative">
        <Image
          src={event.coverImg}
          alt={event.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-semibold mb-1 truncate">{event.title}</h3>
          <p className="text-sm opacity-80 mb-2 truncate">{event.subtitle}</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="flex items-center bg-white bg-opacity-20 rounded px-2 py-1">
              <CalendarIcon className="w-3 h-3 mr-1" />
              {new Date(event.date).toLocaleDateString()}
            </span>
            <span className="flex items-center bg-white bg-opacity-20 rounded px-2 py-1">
              <ClockIcon className="w-3 h-3 mr-1" />
              {event.time}
            </span>
            <span className="flex items-center bg-white bg-opacity-20 rounded px-2 py-1">
              <MapPinIcon className="w-3 h-3 mr-1" />
              {event.location}
            </span>
          </div>
        </div>
      </CardContent>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt={event.clubName} />
              <AvatarFallback>{event.clubName}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Rare Society of Cultural Events</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-sm text-muted-foreground">
              {/* <DollarSignIcon className="w-4 h-4 mr-1" /> */}
              {event.fees === 0 ? "Free" : `₹${event.fees}`}
            </span>
            <span className="flex items-center text-sm text-muted-foreground">
              <UserIcon className="w-4 h-4 mr-1" />
              {event.registeredUsers.length}
            </span>
          </div>
          {event.isAvailableToReg ? (
            <Link href={`/events/${event._id}`} prefetch>
              <Button variant="outline" size="sm">
                Book Now
              </Button>
            </Link>
          ) : (
            <Button variant="outline" size="sm" disabled>
              Closed
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <Card className="overflow-hidden">
    <CardContent className="p-0">
      <Skeleton className="w-full h-48" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <Skeleton className="h-4 w-16 inline-block" />
            <Skeleton className="h-4 w-16 inline-block" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </CardContent>
  </Card>
);


// main component
const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedInstitutes, setSelectedInstitutes] = useState<string[]>([]);
  const { isSignedIn, user } = useUser();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("events");
  const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [events, setEvents] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/event");
        const data = await response.json();

        if (data.success) {
          setEvents(data.data);
        } else {
          setError("Failed to load events");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        // setLoading(false);
        setIsLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.includes(event.eventType)) &&
      (selectedInstitutes.length === 0 || selectedInstitutes.includes(event.clubName))
  );

  const handleCategoryChange = (value: string) => {
    setSelectedCategories(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleInstituteChange = (value: string) => {
    setSelectedInstitutes(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const UserMenu = () => {
    if (!isSignedIn) {
      return (
        <SignInButton mode="modal" fallbackRedirectUrl={"/events"}>
          <Button variant="ghost" className="text-purple-500">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        </SignInButton>
      );
    }


    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />
              <AvatarFallback>{user?.firstName?.charAt(0) || ''}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.fullName}</p>
              <p className="text-xs leading-none text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <Link href={'/settings/user'}>
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <SignOutButton redirectUrl="/events">Sign out</SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "events":
        return (
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex ml-5 text-3xl font-semibold">
              {selectedCategories.join(", ")}
            </div>
            <ScrollArea className="flex-1 px-4 pb-6">
              {renderEventsList()}
            </ScrollArea>
          </div>
        );
      case "clubs":
        return (
          <ClubEvents/>
        );
      case "calendar":
        return (
          <CalendarEvents events={events} />
        );
      default:
        return null;
    }
  };

  const renderEventsList = () => {
    if (isLoadingEvents) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    );
  };

  // if (loading) {
  //   return (
  //     <div className="flex h-screen bg-background">
  //       {/* Sidebar skeleton */}
  //       <div className="w-64 border-r p-4">
  //         <Skeleton className="h-8 w-32 mb-4" />
  //         <Skeleton className="h-4 w-full mb-2" />
  //         <Skeleton className="h-4 w-3/4 mb-2" />
  //         <Skeleton className="h-4 w-1/2 mb-4" />
  //         {/* Repeat for other sidebar items */}
  //       </div>
        
  //       {/* Main content skeleton */}
  //       <div className="flex-1 p-6">
  //         <div className="flex justify-between items-center mb-6">
  //           <Skeleton className="h-10 w-64" />
  //           <div className="flex space-x-2">
  //             <Skeleton className="h-10 w-40" />
  //             <Skeleton className="h-10 w-40" />
  //           </div>
  //         </div>
  //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  //           {[...Array(6)].map((_, index) => (
  //             <LoadingSkeleton key={index} />
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }


  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
    );
  }

 
  
  return (
    <div className="flex h-screen bg-background">
      
      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        selectedCategories={selectedCategories}
        handleCategoryChange={handleCategoryChange}
        selectedInstitutes={selectedInstitutes}
        handleInstituteChange={handleInstituteChange}
      />

      {/* Main Content */}
      <MainContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleSidebar={toggleSidebar}
        renderTabContent={renderTabContent}
      />

    </div>
  );
};

export default EventsPage;