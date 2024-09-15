"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ArrowLeft, Calendar as CalendarIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";

interface EventData {
  title: string;
  subtitle: string;
  description: string;
  date: Date;
  location: string;
  time: string;
  fees: number;
  noOfParticipants: number;
  coverImg: string;
  detailImg: string;
  supportFile: string;
  visibility: boolean;
  isAvailableToReg: boolean;
}

const OWNER_ID = "66c6d9bba15522307994e4bc";

const EventCreationForm: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [eventData, setEventData] = useState<EventData>({
    title: "",
    subtitle: "",
    description: "",
    date: new Date(),
    location: "",
    time: "",
    fees: 0,
    noOfParticipants: 0,
    coverImg: "",
    detailImg: "",
    supportFile: "",
    visibility: true,
    isAvailableToReg: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setEventData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setEventData((prev) => ({ ...prev, date }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setEventData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // const coverImgUrl = eventData.coverImgFile
      //   ? await uploadToCloudinary(eventData.coverImgFile, "events")
      //   : "";
      // const detailImgUrl = eventData.detailImgFile
      //   ? await uploadToCloudinary(eventData.detailImgFile, "events")
      //   : "";
      // const supportFileUrl = eventData.supportFile
      //   ? await uploadToCloudinary(eventData.supportFile, "events")
      //   : "";

      const eventDataWithOwner = {
        ...eventData,
        owner: OWNER_ID,
        // coverImg: coverImgUrl,
        // detailImg: detailImgUrl,
        // supportFile: supportFileUrl,
        date: eventData.date.toISOString(), // Convert Date to ISO string for MongoDB
      };

      // if (!(coverImgUrl && detailImgUrl && supportFileUrl)) {
      //   toast({
      //     title: "Error",
      //     description: "Failed to upload image. Please try again.",
      //     variant: "destructive",
      //   });
      //   return;
      // }

      const response = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDataWithOwner),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const result = await response.json();

      toast({
        title: "Event Created",
        description: "Your event has been successfully created.",
      });

      router.push("/events");
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className=" flex items-center gap-2">
          <Link href={"/events"}>
            <ArrowLeft />
          </Link>
          <h2 className="text-2xl font-bold">Create Event</h2>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              name="subtitle"
              value={eventData.subtitle}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !eventData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {eventData.date ? (
                    format(eventData.date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={eventData.date}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              name="time"
              type="time"
              value={eventData.time}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="fees">Fees</Label>
            <Input
              id="fees"
              name="fees"
              type="number"
              value={eventData.fees}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="noOfParticipants">Number of Participants</Label>
            <Input
              id="noOfParticipants"
              name="noOfParticipants"
              type="number"
              value={eventData.noOfParticipants}
              onChange={handleInputChange}
            />
          </div>
          {/* <div>
            <Label htmlFor="coverImg">Cover Image URL</Label>
            <Input id="coverImg" name="coverImg" value={eventData.coverImg} placeholder="https://images.unsplash.com/photo" onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="detailImg">Detail Image URL</Label>
            <Input id="detailImg" name="detailImg" value={eventData.detailImg} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="supportFile">Support File URL</Label>
            <Input id="supportFile" name="supportFile" value={eventData.supportFile} onChange={handleInputChange} />
          </div> */}
          {/* cover image */}
          <div className="flex items-center space-x-2">
            <CldUploadWidget
              uploadPreset="atomicity"
              resource_type="image"
              onSuccess={({ event, info }) => {
                setEventData((prev) => ({
                  ...prev,
                  coverImg: info["secure_url"],
                }));
              }}
              onError={(error) => {
                toast({
                  title: "Error",
                  description: "Failed to upload image. Please try again.",
                  variant: "destructive",
                });
                console.error("Upload failed: ", error);
              }}
            >
              {({ open }) => {
                return (
                  <button onClick={() => open()}>Upload a Cover Image</button>
                );
              }}
            </CldUploadWidget>
          </div>
          {/* detail image */}
          <div className="flex items-center space-x-2">
            <CldUploadWidget
              uploadPreset="atomicity"
              resource_type="image"
              
              onSuccess={({ event, info }) => {
                setEventData((prev) => ({
                  ...prev,
                  detailImg: info["secure_url"],
                }));
              }}
              onError={(error) => {
                toast({
                  title: "Error",
                  description: "Failed to upload image. Please try again.",
                  variant: "destructive",
                });
                console.error("Upload failed: ", error);
              }}
            >
              {({ open }) => {
                return (
                  <button onClick={() => open()}>Upload a Detail Image</button>
                );
              }}
            </CldUploadWidget>
          </div>
          {/* Support file */}
          <div className="flex items-center space-x-2">
            <CldUploadWidget
              uploadPreset="atomicity"
              resource_type="raw"
              onSuccess={({ event, info }) => {
                setEventData((prev) => ({
                  ...prev,
                  supportFile: info["secure_url"],
                }));
              }}
              onError={(error) => {
                toast({
                  title: "Error",
                  description: "Failed to upload image. Please try again.",
                  variant: "destructive",
                });
                console.error("Upload failed: ", error);
              }}
            >
              {({ open }) => {
                return (
                  <button onClick={() => open()}>Upload a Support File</button>
                );
              }}
            </CldUploadWidget>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="visibility"
              checked={eventData.visibility}
              onCheckedChange={handleSwitchChange("visibility")}
            />
            <Label htmlFor="visibility">Visibility</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isAvailableToReg"
              checked={eventData.isAvailableToReg}
              onCheckedChange={handleSwitchChange("isAvailableToReg")}
            />
            <Label htmlFor="isAvailableToReg">Available for Registration</Label>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Event..." : "Create Event"}
          </Button>
        </div>
      </form>

      {/* PREVIEW SECTION */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Event Preview</h2>
        <p className=" flex justify-center gap-2 items-center text-xs">
          <InfoIcon size={15} />
          Your changes reflect here.
        </p>
        <div className="rounded-lg overflow-hidden border">
          <div className="relative h-48">
            <img
              src={eventData.coverImg || "/api/placeholder/1200/400"}
              alt="Event cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
              <h3 className="text-2xl font-bold">
                {eventData.title || "Event Title"}
              </h3>
              <p>{eventData.subtitle || "Event Subtitle"}</p>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <p>
              {eventData.description || "Event description will appear here."}
            </p>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{format(eventData.date, "PPP")}</span>
              <span>{eventData.time || "Event Time"}</span>
            </div>
            <p>{eventData.location || "Event Location"}</p>
            <div className="flex justify-between">
              <span>Fees: ₹{eventData.fees}</span>
              <span>Participants: {eventData.noOfParticipants}</span>
            </div>
            <div className="flex space-x-2">
              {eventData.visibility && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Visible
                </span>
              )}
              {eventData.isAvailableToReg && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  Registration Open
                </span>
              )}
            </div>
            <Button className="w-full" disabled={!eventData.isAvailableToReg}>
              {eventData.isAvailableToReg
                ? "Register Now"
                : "Registration Closed"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreationForm;
