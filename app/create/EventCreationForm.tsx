"use client";

import React, { useState, ChangeEvent } from "react";
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
import { Client, Storage, ID } from "appwrite";

interface EventData {
  title: string;
  subtitle: string;
  description: string;
  date: Date;
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
}

const OWNER_ID = "66c6d9bba15522307994e4bc";
const PROJECT_ID = '66e82a130039a555701b';
const BUCKET_ID = '66e82bad0006fa424b7e';

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const storage = new Storage(client);


const EventCreationForm: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  // const OWNER_ID = "66c6d9bba15522307994e4bc";

  const [eventData, setEventData] = useState<EventData>({
    title: "",
    subtitle: "",
    description: "",
    date: new Date(),
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

  const handleMaxParticipantsCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setEventData((prev) => ({
      ...prev,
      noMaxParticipants: checked,
      maxAllowedParticipants: checked ? -1 : 0,
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

  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
        const fileUrl = storage.getFileView(BUCKET_ID, response.$id).href;
        setEventData((prev) => ({ ...prev, [field]: fileUrl }));
        toast({
          title: "File Uploaded",
          description: `${field} has been successfully uploaded.`,
        });
      } catch (error) {
        console.error(`Error uploading ${field}:, error`);
        toast({
          title: "Upload Error",
          description: `Failed to upload ${field}. Please try again.`,
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const eventDataWithOwner = {
        ...eventData,
        owner: OWNER_ID,
        date: eventData.date.toISOString(),
      };

      const response = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDataWithOwner),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
        toast.error("Failed to create Event...");
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
        <div className="flex items-center gap-2">
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
            <Label htmlFor="maxParticipants">
              Maximum Allowed Participants
            </Label>
            <Input
              id="maxAllowedParticipantsOf"
              name="maxAllowedParticipants"
              type="number"
              value={
                eventData.noMaxParticipants === true
                  ? ""
                  : eventData.maxAllowedParticipants
              }
              onChange={handleInputChange}
              disabled={eventData.noMaxParticipants}
              placeholder={eventData.noMaxParticipants ? "No limit" : ""}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="noMaxParticipants"
              type="checkbox"
              checked={eventData.noMaxParticipants}
              onChange={handleMaxParticipantsCheckbox}
            />
            <Label htmlFor="noMaxParticipants">No maximum participation</Label>
          </div>

          <div>
            <Label htmlFor="coverImg">Cover Image</Label>
            <Input
              id="coverImg"
              name="coverImg"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "coverImg")}
            />
          </div>
          <div>
            <Label htmlFor="detailImg">Detail Image</Label>
            <Input
              id="detailImg"
              name="detailImg"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "detailImg")}
            />
          </div>
          <div>
            <Label htmlFor="supportFile">Support File</Label>
            <Input
              id="supportFile"
              name="supportFile"
              type="file"
              onChange={(e) => handleFileUpload(e, "supportFile")}
            />
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
        <p className="flex justify-center gap-2 items-center text-xs">
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
              <span>
                Maximum Participants:{" "}
                {eventData.noMaxParticipants
                  ? "N/A"
                  : `${eventData.maxAllowedParticipants}`}
              </span>
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
