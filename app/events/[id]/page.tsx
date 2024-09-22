"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  DownloadIcon,
  EyeIcon,
  ShareIcon,
  HeartIcon,
  CircleUserIcon,
  StarIcon,
  ArrowLeftIcon,
  CheckIcon,
  CopyIcon,
  XIcon,
  Heart,
  CreditCardIcon,
  LoaderIcon,
  MailIcon,
  CheckCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation"; // Import for handling not found pages
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import EventPageSkeleton from "./EventPageSkeleton";
import { sendMail } from "@/lib/mail";
import { sendConfMail } from "../sendConfMail";
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const MDPreview = dynamic(() => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown), { ssr: false });

interface Event {
  [key: string]: any;
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  location: string;
  time: string;
  fees: number;
  maxAllowedParticipants: number;
  noMaxParticipants: boolean;
  coverImg: string;
  detailImg: string;
  supportFile: string;
  visibility: boolean;
  isAvailableToReg: boolean;
  views: number;
  recentRegistrations: { name: string; avatar: string }[];
  tags: string[]; // New field
  categories: string[]; // New field
  likeCounter: number; // New field
  links: string[]; // New field
  registrationOpenTill: string; // New field
  additionalInfo: string; // New field
  ownerId:string;
}


const event: Event = {
  _id: "66d0165246303cad142ea872",
  title: "Garba Night Extravaganza",
  subtitle: "Garba Night",
  description:
    "Join us for a night of traditional Garba dancing and festivities!",
  date: "2024-09-15T00:00:00.000Z", // Corrected date format (YYYY-MM-DD)
  location: "Dome Ground, Nirma University, Ahmedabad",
  time: "7:00 PM Onwards",
  fees: 200,
  maxAllowedParticipants: 1500,
  noMaxParticipants: false,
  coverImg:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  detailImg: "/imgs/img5.jpg",
  supportFile: "https://example.com/files/rules_and_guidelines.pdf",
  visibility: true,
  isAvailableToReg: true,
  views: 4520,
  recentRegistrations: [
    { name: "John Doe", avatar: "https://github.com/shadcn.png" },
    { name: "Jane Smith", avatar: "https://github.com/shadcn.png" },
    { name: "Alice Johnson", avatar: "https://github.com/shadcn.png" },
    { name: "Bob Brown", avatar: "https://github.com/shadcn.png" },
    { name: "Charlie Davis", avatar: "https://github.com/shadcn.png" },
  ],
  tags: ["Garba", "Dance", "Festivity"], // New field
  categories: ["Cultural", "Traditional", "Music"], // New field
  likeCounter: 1023, // New field
  links: [
    "https://example.com/register",
    "https://example.com/schedule",
  ], // New field
  registrationOpenTill: "2024-09-10T00:00:00.000Z", // New field
  additionalInfo: "Please wear traditional attire and bring a water bottle.", // New field
  ownerId:"123"
};


const ShareCard: React.FC<{ event: Event }> = ({ event }) => {
  const [copied, setCopied] = useState(false);
  const eventUrl = `https://atomicity.vercel.app/events/${event._id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(eventUrl).then(() => {
      setCopied(true);
      toast.success("Event link has been copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="w-[300px]">
      <CardHeader className="p-0">
        <Image
          src={event.coverImg}
          alt={event.title}
          width={300}
          height={150}
          className="w-full h-[150px] object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{event.title}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm mb-2">Share this event:</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={eventUrl}
              readOnly
              className="flex-1 px-2 py-1 text-sm border rounded"
            />
            <Button size="sm" onClick={copyToClipboard}>
              {copied ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EventPage: React.FC = () => {
  const [showTicketBanner, setShowTicketBanner] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [registerStatus, setRegisterStatus] = useState("Register Now");
  const coverImageRef = useRef<HTMLDivElement>(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const [registrationState, setRegistrationState] = useState<'initial' | 'registering' | 'sending_email' | 'success'>('initial');

  useEffect(() => {
    const handleScroll = () => {
      if (coverImageRef.current) {
        const rect = coverImageRef.current.getBoundingClientRect();
        const threshold = window.innerHeight * 0.4; // 20% of viewport height
        setShowTicketBanner(rect.bottom <= threshold);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRegister = () => {
    setIsDrawerOpen(true);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleEventRegister = async (curEventId: string) => {
    // Register event logic here
    if (!user) {
      console.log("Please log in first to register for the event.");
      toast.warning("Please log in first to register for the event.");
      return;
    }
    bang_setLoading(true);
    setRegistrationState('registering');

    try {
      const url = `/api/event/register/${eventId}`;
      const userID = user.id;
      const eventDate = new Date(event.date).toISOString().split("T")[0];
      const generateConfirmationNumber = (
        eventTitle: string,
        eventId: string,
        eventDate: string,
        userId: string
      ) => {
        const shortEventTitle = eventTitle.slice(0, 3).toUpperCase(); // First 3 chars of event title
        const shortEventId = eventId.slice(-4); // Last 4 chars of event ID
        const shortDate = eventDate.replace(/-/g, "").slice(-6); // Last 6 digits of the event date (yyyymmdd -> mmdd)
        const shortUserId = userId.slice(-4); // Last 4 chars of user ID
        const timestamp = Date.now().toString().slice(-5); // Last 5 digits of the current timestamp

        return `${shortEventTitle}-${shortEventId}-${shortDate}-${shortUserId}-${timestamp}`;
      };

      const confirmationNumber = generateConfirmationNumber(
        event.title,
        event._id,
        eventDate,
        userID
      );

      const requestBody = {
        eventId: curEventId,
        userId: userID,
        confirmationNumber,
      };
      // console.log("from frontend: ",requestBody);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.status == 200) {
        console.log("Registration successful:", data);
        toast.success("Registration successful");
        setRegistrationState('sending_email');

        const userMail =
          user?.emailAddresses[0]?.emailAddress || "default@example.com";
        const userName = user?.fullName || "Default Name";
        const eventTitle = event.title || "Default Event Title";
        const eventTime = event.time.toString();
        const eventLocation = event.location;
        const eventImg = event.coverImg;
        const eventOrgName = "Rare Society of Cultural Events";
        const current_date = new Date().toString();

        // Prepare user data object
        const userData = {
          emailAddresses: [{ emailAddress: userMail }],
          fullName: userName,
        };

        console.log("test", userData, eventTitle);
        try {
          await sendConfMail({
            user: userData,
            event,
            eventDate,
            eventTime,
            eventLocation,
            confirmationNumber,
            eventImg,
            eventOrgName,
            current_date,
          });
          console.log("Confirmation email sent");
          // toast.success("Ticket Sent to Mail !!");
          setRegistrationState('success');
          toast.success("Ticket sent to your email!");
        } catch (error) {
          console.error("Error sending email:", error);
          toast.error("Failed to send ticket email. Please contact support.");
          setRegistrationState('initial');
        }

        // router.push("/events");
      } else if (
        response.status == 404 ||
        response.status == 406 ||
        response.status == 408
      ) {
        toast.error("Something went wrong");
      } else {
        console.error("Registration failed:");
        toast.error("Registration failed:");
        setIsDialogOpen(false);
        setRegistrationState('initial');
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      toast.error("Unexpected error caused, retry again");
    } finally {
      bang_setLoading(false);
    }
  };

  const handleCloseAndRefresh = () => {
    setIsDialogOpen(false);
    setRegistrationState('initial');
    router.push('/events');
    // This will refresh the current page
    // router.refresh();
  };
  const renderDialogContent = () => {
    switch (registrationState) {
      case 'initial':
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-purple-500 mr-3" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-purple-500 mr-3" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-purple-500 mr-3" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <CreditCardIcon className="h-5 w-5 text-purple-500 mr-3" />
                <span>₹{event.fees}</span>
              </div>
            </div>
            <Button
              onClick={() => handleEventRegister(event._id)}
              className="w-full mt-6 bg-purple-500 hover:bg-purple-600 text-white"
            >
              Confirm Booking
            </Button>
          </>
        );
      case 'registering':
        return (
          <div className="text-center py-8">
            <LoaderIcon className="h-12 w-12 animate-spin text-purple-500 mx-auto mb-4" />
            <p className="text-lg">Registering for the event...</p>
          </div>
        );
      case 'sending_email':
        return (
          <div className="text-center py-8">
            <MailIcon className="h-12 w-12 text-purple-500 mx-auto mb-4 animate-bounce" />
            <p className="text-lg">Delivering your ticket via email...</p>
          </div>
        );
      case 'success':
        return (
          <div className="text-center py-8">
            <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">Registration Successful!</p>
            <p>Your ticket has been sent to your email.</p>
            <Button
              onClick={handleCloseAndRefresh}
              className="mt-6 bg-purple-500 hover:bg-purple-600 text-white"
            >
              Close
            </Button>
          </div>
        );
    }
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [bang_loading, bang_setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  console.log(pathname);
  const eventId = pathname.split("/").pop();
  console.log("slug: ", eventId);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const userID = user?.id;
        const response = await fetch(`/api/event/${eventId}`);
        const data = await response.json();
        console.log("Data: ", data.data[0]);

        if (data.success) {
          // setEventData(data.data[0]);
          const fetchedEventData = data.data[0];
          Object.keys(fetchedEventData).forEach((key) => {
            event[key] = fetchedEventData[key];
          });
          console.log("fetchEventData: ", fetchedEventData);
          console.log(fetchedEventData["registeredUsers"].includes(userID));

          if (fetchedEventData["registeredUsers"].includes(userID)) {
            setRegisterStatus("Already Registered");
          }
        } else {
          setError("Failed to load events. Please refresh this page.");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  return (
    <>
      {loading ? (
        <EventPageSkeleton />
      ) : error ? (
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-red-600">{error}</h1>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Sticky Ticket Banner */}
          <div
            className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 ease-in-out ${
              showTicketBanner
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0"
            }`}
          >
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/events">
                  <Button variant="ghost" size="sm" className="p-1">
                    <ArrowLeftIcon className="h-5 w-5" />
                  </Button>
                </Link>
                <Image
                  src="/imgs/logo.png"
                  alt="Rare Vyom Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold">{event.title}</h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <StarIcon className="h-4 w-4 mr-1" />I am Interested
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      <ShareIcon className="h-5 w-5 mr-2" />
                      Share
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <ShareCard event={event} />
                  </PopoverContent>
                </Popover>
                <Button
                  className={`w-full ${
                    registerStatus === "Already Registered"
                      ? "bg-gray-500 cursor-not-allowed hover:cursor-crosshair"
                      : "bg-purple-500 hover:bg-purple-700"
                  }`}
                  onClick={handleRegister}
                  disabled={registerStatus === "Already Registered"}
                >
                  {registerStatus}
                </Button>
              </div>
            </div>
          </div>

          {/* Top Section with Image and Main Details */}
          <div className="relative mb-8" ref={coverImageRef}>
      <Image
        src={event.coverImg}
        alt={event.title}
        width={1200}
        height={600}
        className="w-full h-[600px] object-cover rounded-lg shadow-lg"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75 rounded-lg" />
      <Link href="/events">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4 bg-white/50 hover:bg-white/75 text-black"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Events
        </Button>
      </Link>
      <div className="absolute bottom-8 left-8 right-8">
        <h1 className="text-white text-6xl font-bold mb-2">
          {event.title}
        </h1>
        <p className="text-white text-2xl mb-4">{event.subtitle}</p>
        <div className="flex items-center space-x-4 text-white">
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-5 w-5 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
      
      {/* Brand logo and platform name */}
      <div className="absolute bottom-4 right-4 flex items-center bg-white px-3 py-2 rounded-full">
        <Image
          src="/imgs/atomicity_logo.png" // Replace with your actual logo path
          alt="Atomcity Logo"
          width={24}
          height={24}
          className="mr-1 mt-1"
        />
        <span className=" text-black text-sm font-semibold">
          Powered by Atomicity
        </span>
      </div>
    </div>

          {/* Main Content */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Event Details */}
            <div className="col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="details">Event Details</TabsTrigger>
                  <TabsTrigger value="organizer">Organizer</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                  <Card>
                    <CardHeader>
                      <CardTitle>About the Event</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{event.description}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle>Event Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <CalendarIcon className="h-5 w-5 mr-2 text-purple-600" />
                          <span>
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-5 w-5 mr-2 text-purple-600" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-5 w-5 mr-2 text-purple-600" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center">
                          <UserIcon className="h-5 w-5 mr-2 text-purple-600" />
                          <span>Capacity: {event.maxAllowedParticipants}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="organizer">
                  <Card>
                    <CardHeader>
                      <CardTitle>Organizer Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="/imgs/logo.png" alt="Organizer" />
                          <AvatarFallback>NU</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">
                            Rare Society of Cultural Events
                          </h3>
                          <p className="text-sm text-gray-500">
                            Event Organizer
                          </p>
                        </div>
                      </div>
                      <p className="mt-4">
                        Rare Society is committed to providing high-quality
                        education and memorable experiences for students.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Additional Details */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <MDPreview source={event.additionalInfo} />
                </CardContent>
              </Card>

              {/* support files */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>
                    Additional Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Rules and Guidelines
                      </h3>
                      <a
                        href={event.supportFile}
                        className="flex items-center text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DownloadIcon className="h-5 w-5 mr-2" />
                        Download Rules and Guidelines
                      </a>
                    </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Registration and Stats */}
            <div className="space-y-8">
              {/* Registration Card */}
              <Card className="bg-purple-50">
                <CardHeader>
                  <CardTitle>Register for the Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Registration Fee</span>
                      <span className="font-bold">₹{event.fees}</span>
                    </div>
                    <Button
                      className={`w-full ${
                        registerStatus === "Already Registered"
                          ? "bg-gray-400 cursor-not-allowed hover:cursor-crosshair"
                          : "bg-purple-500 hover:bg-purple-700"
                      }`}
                      onClick={handleRegister}
                      disabled={registerStatus === "Already Registered"}
                    >
                      {registerStatus}
                    </Button>
                    <div className="text-center text-sm text-gray-500">
                      {event.maxAllowedParticipants} people are attending
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 mr-2 text-purple-600" />
                        <span>Interested by</span>
                      </div>
                      <span className="font-bold">{event.likeCounter}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 mr-2 text-purple-600" />
                        <span>Attendees</span>
                      </div>
                      <span className="font-bold">
                        {event.registeredUsers.length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Links Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Useful Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {event.links.length > 0 ? (
                      event.links.map((link, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:underline"
                          >
                            {link}
                          </a>
                        </div>
                      ))
                    ) : (
                      <p>No additional links available.</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tags Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.length > 0 ? (
                      event.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))
                    ) : (
                      <p>No tags available.</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Categories Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {event.categories.length > 0 ? (
                      event.categories.map((category, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm"
                        >
                          {category}
                        </span>
                      ))
                    ) : (
                      <p>No categories available.</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Share and Favorite */}
              <div className="flex space-x-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      <ShareIcon className="h-5 w-5 mr-2" />
                      Share
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <ShareCard event={event} />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" className="flex-1">
                  <StarIcon className="h-5 w-5 mr-2" />
                  I am interested
                </Button>
              </div>
            {/* </div> */}


              {/* Drawer for Fancy Ticket Booking */}
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) setRegistrationState('initial');
              }}>
                <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden">
                  <DialogHeader className="bg-purple-500 text-white p-6">
                    <DialogTitle className="text-2xl font-light">
                      {registrationState === 'initial' ? 'Confirm Booking' : 'Registration Status'}
                    </DialogTitle>
                    <DialogClose />
                  </DialogHeader>
                  <div className="p-6">
                    {renderDialogContent()}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
      <hr className="border-[1px] border-purple-200 mt-2 mb-2"/>
      <p className="flex justify-center text-xs text-gray-400 items-center">© Atomicity Events Inc. | All Rights Reserved | 2024-2025</p>
      <hr className="border-[1px] border-purple-200 mt-2 mb-2"/>
    </>
  );
};

export default EventPage;