import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import { Card, CardContent } from '@/components/ui/card';

const MyEvents = () => {
  // Mock data - in a real application, this would come from a backend or state management
  const events = [
    { id: 1, title: "Tech Conference 2024", organizer: "TechCorp", date: "2024-10-15", ticketNo: "MAI-ebb9-241015-ZlTQ-97379", emailSent: true },
    { id: 2, title: "Design Workshop", organizer: "DesignHub", date: "2024-11-20", ticketNo: "MAI-acc8-241120-YkPR-86268", emailSent: false },
    { id: 3, title: "Business Seminar", organizer: "BizWorld", date: "2024-12-05", ticketNo: "MAI-dcc7-241205-XjOQ-75157", emailSent: true },
    { id: 4, title: "Tech Conference 2024", organizer: "TechCorp", date: "2024-10-15", ticketNo: "MAI-ebb9-241015-ZlTQ-97379", emailSent: true },
    { id: 5, title: "Design Workshop", organizer: "DesignHub", date: "2024-11-20", ticketNo: "MAI-acc8-241120-YkPR-86268", emailSent: false },
    { id: 6, title: "Business Seminar", organizer: "BizWorld", date: "2024-12-05", ticketNo: "MAI-dcc7-241205-XjOQ-75157", emailSent: true },
  ];

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter events based on the search query
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
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
                <TableHead>Ticket No.</TableHead>
                <TableHead>Email Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.organizer}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-mono">{event.ticketNo}</TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "px-2 py-1 text-xs font-semibold",
                        event.emailSent 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      )}>
                        {event.emailSent ? "Sent" : "Not Sent"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
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
