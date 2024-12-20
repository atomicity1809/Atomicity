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
  QrCodeIcon,
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
import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Admin from "@/models/adminSchema";
import Head from "next/head";
import NotFound from "@/app/not-found";
import { motion, AnimatePresence } from "framer-motion";
// import { StarIcon } from "@heroicons/react/outline";
import { Input } from "@/components/ui/input";

const MDPreview = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default.Markdown),
  { ssr: false }
);

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
  tags: string[]; // New field
  categories: string[]; // New field
  likeCounter: number; // New field
  registrationOpenTill: string; // New field
  additionalInfo: string; // New field
  ownerId: string;
}

// interface Organizer {
//   clubName: string;
//   logo: string;
// }

const event: Event = {
  _id: "",
  title: "",
  subtitle: "",
  description: "",
  date: "",
  location: "",
  time: "",
  fees: 0,
  maxAllowedParticipants: 0,
  noMaxParticipants: false,
  coverImg: "",
  detailImg: "",
  supportFile: "",
  visibility: true,
  isAvailableToReg: true,
  views: 0,
  tags: [], // New field
  categories: [], // New field
  likeCounter: 0, // New field
  registrationOpenTill: "", // New field
  additionalInfo: "", // New field
  ownerId: "",
};

// const organizer: Organizer = {
//   clubName: "",
//   logo: "",
// };

const ShareCard: React.FC<{ event: Event }> = ({ event }) => {
  const [copied, setCopied] = useState(false);
  const eventUrl = `https://atomicity.vercel.app/events/${event._id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
    eventUrl
  )}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(eventUrl).then(() => {
      setCopied(true);
      toast.success("Event link has been copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `${event.title}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR code downloaded successfully");
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
            {event.location && event.location.trim() !== "" ? (
              <span>{event.location}</span>
            ) : (
              <span className="text-purple-500">Online Event</span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm mb-2">Share this event:</p>
          <Tabs defaultValue="link" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="link" className="flex items-center gap-2">
                <CopyIcon className="h-4 w-4" />
                Link
              </TabsTrigger>
              <TabsTrigger value="qr" className="flex items-center gap-2">
                <QrCodeIcon className="h-4 w-4" />
                QR Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="link" className="mt-2">
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
            </TabsContent>

            <TabsContent value="qr" className="mt-2">
              <div className="flex flex-col items-center space-y-3">
                <div className="bg-white p-2 rounded-lg border">
                  <Image
                    src={qrCodeUrl}
                    alt="Event QR Code"
                    width={160}
                    height={160}
                    className="w-[160px] h-[160px]"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={downloadQRCode}
                >
                  Download QR Code
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

const EventPage: React.FC = () => {
  const [showTicketBanner, setShowTicketBanner] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [registerStatus, setRegisterStatus] = useState(0);
  const coverImageRef = useRef<HTMLDivElement>(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [organizerId, setOrganizerId] = useState("");
  const [isInterested, setIsInterested] = useState(false);
  const router = useRouter();
  const [registrationState, setRegistrationState] = useState<
    "initial" | "registering" | "sending_email" | "success"
  >("initial");
  const [isFeedbackDrawerOpen, setIsFeedbackDrawerOpen] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const pathname = usePathname();
  const eventId = pathname.split("/").pop();

  const handleStarClick = (value: any) => setStarRating(value);

  const handleFeedbackSubmit = async () => {
    const userId = user?.id; // Clerk user ID
    const feedback = feedbackText;
    const rating = starRating;
    if (!userId || !feedback || !rating || !eventId) return;

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clerkId: userId, eventId, feedback, rating }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Feedback submitted successfully:", result.message);
        toast.success("Feedback submitted successfully");
      } else {
        console.error("Failed to submit feedback:", result.error);
        toast.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    }
  };

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
      setIsDialogOpen(false);
      return;
    }
    bang_setLoading(true);
    setRegistrationState("registering");

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

      const resBody = await response.json();

      if (response.status == 200) {
        // console.log("Registration successful:", resBody);
        toast.success("Registration successful");
        setRegistrationState("sending_email");

        const userMail =
          user?.emailAddresses[0]?.emailAddress || "default@example.com";
        const userName = user?.fullName || "Default Name";
        const eventTitle = event.title || "Default Event Title";
        const eventTime = event.time.toString();
        const eventLocation =
          event.location && event.location.trim() !== ""
            ? event.location
            : "Online";

        const eventImg = event.coverImg;
        const eventOrgName = "Rare Society of Cultural Events";
        const current_date = new Date().toString();

        // Prepare user data object
        const userData = {
          emailAddresses: [{ emailAddress: userMail }],
          fullName: userName,
        };

        // console.log("test", userData, eventTitle);
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
            userID,
          });
          console.log("Confirmation email sent");
          // toast.success("Ticket Sent to Mail !!");
          setRegistrationState("success");
          toast.success("Ticket sent to your email!");
        } catch (error) {
          console.error("Error sending email:", error);
          toast.error("Failed to send ticket email. Please contact support.");
          setRegistrationState("initial");
        }

        // router.push("/events");
      } else if (
        response.status == 404 ||
        response.status == 406 ||
        response.status == 408 ||
        response.status == 410
      ) {
        // const resBody = await response.json(); // Parse response body
        toast.error(resBody.message);
        setIsDialogOpen(false);
        setRegistrationState("initial");
        // console.log(resBody)
        // console.log(resBody.message);
        // toast.error(response.message);
      } else {
        console.error("Registration failed:");
        toast.error("Registration failed:");
        setIsDialogOpen(false);
        setRegistrationState("initial");
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
    setRegistrationState("initial");
    router.push("/events");
    // This will refresh the current page
    // router.refresh();
  };
  const renderDialogContent = () => {
    switch (registrationState) {
      case "initial":
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
                <MapPinIcon className="h-4 w-4 mr-2" />
                {event.location && event.location.trim() !== "" ? (
                  <span>{event.location}</span>
                ) : (
                  <span className="italic text-blue-500">Online Event</span>
                )}
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
      case "registering":
        return (
          <div className="text-center py-8">
            <LoaderIcon className="h-12 w-12 animate-spin text-purple-500 mx-auto mb-4" />
            <p className="text-lg">Registering for the event...</p>
          </div>
        );
      case "sending_email":
        return (
          <div className="text-center py-8">
            <MailIcon className="h-12 w-12 text-purple-500 mx-auto mb-4 animate-bounce" />
            <p className="text-lg">Delivering your ticket via email...</p>
          </div>
        );
      case "success":
        return (
          <div className="text-center py-8">
            <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">
              Registration Successful!
            </p>
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
  const handleInterested = async () => {
    // handle interested button click
    const userID = user?.id;
    const updatedInterestedStatus = !isInterested;
    console.log("old value: ", isInterested);
    setIsInterested(updatedInterestedStatus);
    console.log("new value of isInterested: ", updatedInterestedStatus);

    const response = await fetch(`/api/event/interested`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        eventID: eventId,
        interested: updatedInterestedStatus,
      }),
    });
    if (response.ok) {
      console.log("liked");
    } else {
      setIsInterested(!isInterested);
      toast.error("Error in liking event");
    }
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orgLoading, setOrgLoading] = useState<boolean>(true);
  const [orgError, setOrgError] = useState<string | null>(null);

  const [bang_loading, bang_setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const userID = user?.id;
        // const response = await fetch(`/api/event/${eventId}`);
        const response = await fetch(`/api/event/${eventId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID: userID }),
        });
        const data = await response.json();
        // console.log("Data: ", data.data[0]);
        // console.log("rs", response.status);
        if (response.status === 404 || response.status === 400) {
          notFound();
        }

        if (data.success) {
          // setEventData(data.data[0]);
          const fetchedEventData = data.data[0];
          const fetchedEventInterest = data.isInterested;
          console.log(
            "from backend in frontend: ",
            typeof fetchedEventInterest
          );
          Object.keys(fetchedEventData).forEach((key) => {
            event[key] = fetchedEventData[key];
          });
          setOrganizerId(fetchedEventData["ownerId"]);
          setIsInterested(fetchedEventInterest);
          // console.log("fetchEventData: ", fetchedEventData);
          // console.log(fetchedEventData["registeredUsers"].includes(userID));

          if (fetchedEventData["registeredUsers"].includes(userID)) {
            setRegisterStatus(1);
          } else if (fetchedEventData["isAvailableToReg"] == false) {
            setRegisterStatus(3);
          } else if (
            fetchedEventData["noMaxParticipants"] == false &&
            fetchedEventData["registeredUsers"].length >=
              fetchedEventData["maxAllowedParticipants"]
          ) {
            setRegisterStatus(2);
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
      <Head>
        {/* Basic meta tags */}
        <title>{event.title} | Atomicity</title>
        <meta name="description" content={event.subtitle} />

        {/* Open Graph tags optimized for Facebook, WhatsApp, and other platforms */}
        <meta property="og:title" content={`${event.title} | Atomicity`} />
        <meta property="og:description" content={event.subtitle} />
        <meta
          property="og:url"
          content={`https://atomicity.vercel.app/events/${event._id}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Atomicity Events" />
        <meta property="og:locale" content="en_US" />
      </Head>

      {loading ? (
        <EventPageSkeleton />
      ) : error ? (
        <div className="container mx-auto px-4 py-8 text-center">
          {/* <h1 className="text-2xl font-bold text-red-600">{error}</h1> */}
          <NotFound />
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
                  src={event?.ownerLogo}
                  alt="Organizer Logo"
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
                <motion.div
                  className="flex items-center space-x-2 rounded-lg px-3 py-1 border border-purple-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    className="flex items-center justify-center w-8 h-8 rounded-full focus:outline-none"
                    onClick={handleInterested}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className="text-black"
                      animate={{
                        scale: isInterested ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isInterested
                            ? "text-purple-500 fill-current"
                            : "text-black"
                        }`}
                      />
                    </motion.div>
                  </motion.button>

                  <motion.span
                    className="text-xs font-medium"
                    animate={{
                      color: isInterested ? "#8B5CF6" : "#000000", // purple-500 when interested, black when not
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {isInterested ? "Interested" : "I am Interested"}
                  </motion.span>
                </motion.div>
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

                {/* register button */}
                <Button
                  className={`w-full ${
                    registerStatus === 1
                      ? "bg-gray-500 cursor-not-allowed hover:cursor-not-allowed"
                      : registerStatus === 2
                      ? "bg-red-500 cursor-not-allowed hover:cursor-not-allowed"
                      : registerStatus === 3
                      ? "bg-red-500 cursor-not-allowed hover:cursor-not-allowed"
                      : "bg-purple-500 hover:bg-purple-700"
                  }`}
                  onClick={handleRegister}
                  disabled={registerStatus !== 0} // Disable when status is not 0 (registered or full)
                >
                  {registerStatus === 0
                    ? "Register"
                    : registerStatus === 1
                    ? "Registered"
                    : registerStatus === 2
                    ? "Registration Full"
                    : "Registration Closed"}
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
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  {event.location && event.location.trim() !== "" ? (
                    <span>{event.location}</span>
                  ) : (
                    <span className="text-white">Online Event</span>
                  )}
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
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  {/* <TabsTrigger value="about">About</TabsTrigger> */}
                  <TabsTrigger value="details">Event Details</TabsTrigger>
                  <TabsTrigger value="organizer">Organizer</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                  {/* <Card>
                    <CardHeader>
                      <CardTitle>About the Event</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{event.description}</p>
                    </CardContent>
                  </Card> */}
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
                          <ClockIcon className="h-5 w-5 mr-2 text-purple-600" />
                          <span>{event.mode}</span>
                        </div>

                        {event.mode !== "online" && (
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-2" />
                            {event.location && event.location.trim() !== "" ? (
                              <span>{event.location}</span>
                            ) : (
                              <span className="text-white">Online Event</span>
                            )}
                          </div>
                        )}
                        <div className="flex items-center">
                          <UserIcon className="h-5 w-5 mr-2 text-purple-600" />
                          {/* Show "No Limit" if noMaxParticipants is true, else show maxAllowedParticipants */}
                          <span>
                            Capacity:{" "}
                            {event.noMaxParticipants
                              ? "No Limit"
                              : event.maxAllowedParticipants}
                          </span>
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
                          <AvatarImage src={event?.ownerLogo} alt="Organizer" />
                          {/* <AvatarFallback>NUok</AvatarFallback> */}
                        </Avatar>
                        <div className="relative group">
                          <a
                            href={`/club/${organizerId}`}
                            className="text-lg font-semibold text-purple-500 hover:text-purple-800 transition-colors duration-300 flex items-center"
                            rel="noopener noreferrer"
                          >
                            {event?.ownerName}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25l4.5 4.5m0 0l-4.5 4.5m4.5-4.5H3"
                              />
                            </svg>
                          </a>
                          <span className="absolute left-0 mt-1 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Visit Club Page
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Additional Details */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent data-color-mode="light">
                  <MDPreview source={event.additionalInfo} />
                </CardContent>
              </Card>

              {/* support files */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Additional Files</CardTitle>
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
                        registerStatus === 1
                          ? "bg-gray-500 cursor-not-allowed hover:cursor-not-allowed"
                          : registerStatus === 2
                          ? "bg-red-500 cursor-not-allowed hover:cursor-not-allowed"
                          : registerStatus === 3
                          ? "bg-red-500 cursor-not-allowed hover:cursor-not-allowed"
                          : "bg-purple-500 hover:bg-purple-700"
                      }`}
                      onClick={handleRegister}
                      disabled={registerStatus !== 0} // Disable when status is not 0 (registered or full)
                    >
                      {registerStatus === 0
                        ? "Register"
                        : registerStatus === 1
                        ? "Registered"
                        : registerStatus === 2
                        ? "Registration Full"
                        : "Registration Closed"}
                    </Button>

                    {/* <div className="text-center text-sm text-gray-500">
                      {event.maxAllowedParticipants} people are attending
                    </div> */}
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
                        <span>Registered</span>
                      </div>
                      <span className="font-bold">
                        {event?.registeredUsers?.length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Links Section */}
              {/* <Card>
                <CardHeader>
                  <CardTitle>Useful Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {event.links.length > 0 ? (
                      event.links.map((link, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
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
              </Card> */}

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

              {/* Feedback Drawer Trigger */}
              <Button
                onClick={() => setIsFeedbackDrawerOpen(true)}
                className="w-full bg-purple-500 hover:bg-purple-700 mt-4"
              >
                Write Feedback
              </Button>

              {/* Drawer for Feedback Form */}
              {isFeedbackDrawerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-end">
                  <div
                    className="fixed inset-0 bg-black opacity-50"
                    onClick={() => setIsDrawerOpen(false)}
                  ></div>
                  <div className="bg-white p-6 w-80 shadow-lg relative z-10 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">
                      Feedback Form
                    </h2>

                    {/* Star Rating Input */}
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          onClick={() => handleStarClick(star)}
                          className={`h-6 w-6 cursor-pointer ${
                            star <= starRating
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Feedback Text Input */}
                    <Input
                      type="text"
                      placeholder="Your feedback..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      className="mb-4"
                    />

                    {/* Submit Button */}
                    <Button
                      onClick={() => {
                        handleFeedbackSubmit();
                        setIsFeedbackDrawerOpen(false); // Close drawer on submit
                      }}
                      className="w-full bg-purple-500 hover:bg-purple-700"
                    >
                      Submit Feedback
                    </Button>
                  </div>
                </div>
              )}

              {/* Share and Favorite */}
              <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-50">
                <div className="relative group">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className=" bg-purple-200 rounded-full w-12 h-12 flex items-center justify-center"
                      >
                        <ShareIcon className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" side="left">
                      <ShareCard event={event} />
                    </PopoverContent>
                  </Popover>
                  {/* Share Tooltip */}
                  <div className="absolute left-0 transform -translate-x-full -translate-y-1/2 top-1/2 hidden group-hover:block">
                    <div className="bg-white px-3 py-1 rounded-lg border border-gray-200 text-xs font-medium mr-2 whitespace-nowrap">
                      Share
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <motion.div
                    className="rounded-full bg-purple-200 border border-purple-200 w-12 h-12 flex items-center justify-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      className="flex items-center justify-center w-full h-full rounded-full focus:outline-none"
                      onClick={handleInterested}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        className="text-black"
                        animate={{
                          scale: isInterested ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors duration-300 ${
                            isInterested
                              ? "text-purple-500 fill-current"
                              : "text-black"
                          }`}
                        />
                      </motion.div>
                    </motion.button>
                  </motion.div>

                  {/* Interest Tooltip */}
                  <div className="absolute left-0 transform -translate-x-full -translate-y-1/2 top-1/2 hidden group-hover:block">
                    <div
                      className={`bg-white px-3 py-1 rounded-lg border border-purple-200 text-xs font-medium mr-2 whitespace-nowrap ${
                        isInterested ? "text-purple-500" : "text-black"
                      }`}
                    >
                      {isInterested ? "Interested" : "I am Interested"}
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}

              {/* Drawer for Fancy Ticket Booking */}
              <Dialog
                open={isDialogOpen}
                onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) setRegistrationState("initial");
                }}
              >
                <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden">
                  <DialogHeader className="bg-purple-500 text-white p-6">
                    <DialogTitle className="text-2xl font-light">
                      {registrationState === "initial"
                        ? "Confirm Booking"
                        : "Registration Status"}
                    </DialogTitle>
                    <DialogClose />
                  </DialogHeader>
                  <div className="p-6">{renderDialogContent()}</div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
      <hr className="border-[1px] border-purple-200 mt-2 mb-2" />
      <p className="flex justify-center text-xs text-gray-400 items-center">
        © Atomicity Events Inc. | All Rights Reserved | 2024-2025
      </p>
      <hr className="border-[1px] border-purple-200 mt-2 mb-2" />
    </>
  );
};

export default EventPage;
