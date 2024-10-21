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
} from "@/components/ui/dropdown-menu";
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
  HeartIcon,
  MapIcon,
  CheckCheck,
  Heart,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import ClubEvents from "./_tabs/ClubEvents";
import CalendarEvents from "./_tabs/CalendarEvents";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Navbar from "../_components/Navbar"
import useSWR from "swr";
// ... (imports remain the same)

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
  ownerName: string;
  ownerLogo: string;
}

interface EventCardProps {
  event: Event;
  isRegistered: boolean;
  isInterested: boolean;
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

const EventCard: React.FC<EventCardProps> = ({ event, isRegistered, isInterested }) => {
  return (
    <Card className="overflow-hidden relative group">
      <CardContent className="p-0 relative">
        <img
          src={event.coverImg}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-100" />
        
        {/* Floating Status Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-3">
          {isRegistered && (
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75" />
              <div className="relative bg-white text-white p-2 rounded-full transform hover:scale-110 transition-transform cursor-pointer shadow-lg backdrop-blur-sm">
                <CheckCheck className="w-5 h-5 text-black" />
              </div>
              {/* <div className="absolute -right-2 -top-2 w-3 h-3 bg-white rounded-full" /> */}
            </div>
          )}
          
          {isInterested && (
            <div className="relative">
              <div className="relative bg-purple-200 text-purple-500 p-2 rounded-full transform hover:scale-110 transition-transform cursor-pointer shadow-lg backdrop-blur-sm hover:animate-pulse">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              {/* <div className="absolute -left-2 -bottom-1 w-2 h-2 bg-purple-500 rounded-full" /> */}
              {/* <div className="absolute -right-1 -top-1 w-2 h-2 bg-purple-500 rounded-full" /> */}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-2xl font-semibold mb-1 truncate">{event.title}</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="flex items-center backdrop-blur-sm bg-white/30 rounded-full px-3 py-1 transition-colors hover:bg-white/40">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(event.date).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={event.ownerLogo} alt={event.clubName} />
              <AvatarFallback>{event.clubName}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{event.ownerName}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-sm font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
              {event.fees === 0 ? "Free" : `₹${event.fees}`}
            </span>
            <span className="flex items-center text-sm text-muted-foreground">
              <User className="w-4 h-4 mr-1" />
              {event.registeredUsers.length}
            </span>
          </div>
          
          {event.isAvailableToReg ? (
            <Link href={`/events/${event._id}`} prefetch>
              <Button 
                variant="outline" 
                size="sm"
                className="transition-all hover:shadow-md hover:translate-y-[-2px]"
              >
                {isRegistered ? "View Details" : "Book Now"}
              </Button>
            </Link>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              disabled 
              className="opacity-50"
            >
              Registration Closed
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

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!data.success) {
    throw new Error("Failed to load data");
  }
  return data.data;
};

const EventsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedInstitutes, setSelectedInstitutes] = useState<string[]>([]);
  const { isSignedIn, user } = useUser();
  const [activeTab, setActiveTab] = useState("events");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEvents, setUserEvents] = useState<{ registeredEvents: string[], interestedEvents: string[] }>({ registeredEvents: [], interestedEvents: [] });
  const [currentView, setCurrentView] = useState<string>('browse');

  const {
    data: events,
    error,
    isValidating,
  } = useSWR<Event[]>("/api/event", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 60000,
    dedupingInterval: 60000,
  });

  const { data: userData, error: userError } = useSWR(
    isSignedIn ? `/api/user/${user?.id}/event` : null,
    fetcher
  );

  useEffect(() => {
    if (userData) {
      setUserEvents(userData);
      console.log(userData);
    }
  }, [userData]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filterEventsByView = (events: Event[]) => {
    if (!events) return [];
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (currentView) {
      case 'upcoming':
        return events.filter(event => {
          const eventDate = new Date(event.date);
          // Remove time component for date comparison
          const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
          return eventDateOnly > today;
        });
        
      case 'live':
        return events.filter(event => {
          const eventDate = new Date(event.date);
          // Compare only the date components
          return eventDate.getFullYear() === today.getFullYear() &&
                 eventDate.getMonth() === today.getMonth() &&
                 eventDate.getDate() === today.getDate();
        });
        
      case 'registered':
        return events.filter(event => 
          userEvents?.registeredEvents?.includes(event._id)
        );
        
      case 'interested':
        return events.filter(event => 
          userEvents?.interestedEvents?.includes(event._id)
        );
        
      case 'browse':
      default:
        return events;
    }
  };

  // Apply search and category filters after view filtering
  const filteredEvents = events
    ? filterEventsByView(events).filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategories.length === 0 || selectedCategories.includes(event.eventType)) &&
        (selectedInstitutes.length === 0 || selectedInstitutes.includes(event.clubName))
      )
    : [];


  const finalFilteredEvents = filterEventsByView(filteredEvents);

  const handleCategoryChange = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleInstituteChange = (value: string) => {
    setSelectedInstitutes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
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
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
              <AvatarFallback>
                {user?.firstName?.charAt(0) || ""}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.fullName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
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
            <Link href={"/settings/user"}>
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

  const renderEventsList = () => {
    if (isValidating && !events) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return <div className="text-red-500">Failed to load events</div>;
    }

    if (filteredEvents.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <p className="text-lg font-medium mb-2">No events found</p>
          <p className="text-sm">
            {currentView === 'registered' ? "You haven't registered for any events yet." :
             currentView === 'interested' ? "You haven't marked any events as interested yet." :
             currentView === 'live' ? "No events happening today." :
             currentView === 'upcoming' ? "No upcoming events found." :
             "No events match your search criteria."}
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <EventCard 
            key={event._id} 
            event={event} 
            isRegistered={userEvents?.registeredEvents?.includes(event._id) || false}
            isInterested={userEvents?.interestedEvents?.includes(event._id) || false}
          />
        ))}
      </div>
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
        return <ClubEvents />;
      case "calendar":
        return <CalendarEvents events={events || []} />;
      default:
        return null;
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load events. Please try again later.
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        selectedCategories={selectedCategories}
        handleCategoryChange={handleCategoryChange}
        selectedInstitutes={selectedInstitutes}
        handleInstituteChange={handleInstituteChange}
        onViewChange={setCurrentView}
        currentView={currentView}
      />
      <MainContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleSidebar={toggleSidebar}
        renderTabContent={renderTabContent}
        // UserMenu={UserMenu}
      />
    </div>
  );
};

export default EventsPage;