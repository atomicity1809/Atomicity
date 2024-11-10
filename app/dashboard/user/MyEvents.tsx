import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";

// Define the Event interface
interface Event {
  _id: string;
  title: string;
  ownerName?: string;
  date: string;
  location?: string;
  time: string;
}

const MyEvents = () => {
  const { user } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const clerkId = user?.id;

  // Fetch registered events data from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/user/regevents`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clerkId: clerkId }),
        });
        const result = await response.json();
        console.log(result);

        if (result.success) {
          setEvents(result.data.registeredEvents);
        } else {
          console.error("Failed to fetch events:", result.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (clerkId) {
      fetchEvents();
    }
  }, [clerkId]);

  // Filter events based on the search query
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Events</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Title</TableHead>
                <TableHead>Organizer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Confirmation Number</TableHead>
                <TableHead>Send Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <TableRow key={event._id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.ownerName || "N/A"}</TableCell>
                    <TableCell>
                      {new Date(event.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{event.location || "N/A"}</TableCell>
                    <TableCell>{event.time}</TableCell>
                    <TableCell className="font-mono">conf123</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => console.log("Send Email clicked")}
                      >
                        Send Email
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No events found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyEvents;
