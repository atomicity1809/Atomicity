"use client";
import React, { useState, useMemo } from "react";
import { format, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CalendarEvents = ({ events }: { events: any[] }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const eventDates = useMemo(() => events.map((event) => new Date(event.date)), [events]);

  const selectedDateEvents = useMemo(() => {
    return events.filter(
      (event) => selectedDate && isSameDay(new Date(event.date), selectedDate)
    );
  }, [events, selectedDate]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-lg">
      <Card className="w-full md:w-auto flex-shrink-0">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800 mr-auto ml-auto">Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(newDate) => setSelectedDate(newDate)}
            className="rounded-md border"
            components={{
              Day: ({ date: currentDate, ...props }) => {
                const hasEvent = eventDates.some((eventDate) => isSameDay(eventDate, currentDate));
                return (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedDate(currentDate);
                    }}
                    className={`w-9 h-9 p-0 font-normal relative ${
                      hasEvent ? "bg-purple-100 hover:bg-purple-200" : ""
                    }`}
                  >
                    {format(currentDate, "d")}
                    {hasEvent && (
                      <div className="w-1 h-1 bg-purple-500 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2"></div>
                    )}
                  </Button>
                );
              },
            }}
          />
        </CardContent>
      </Card>

      <Card className="w-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center space-x-2 text-2xl font-bold text-gray-800 mr-auto ml-auto">
            <CalendarIcon className="w-6 h-6" />
            <span className=" font-semibold">
              {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          {selectedDateEvents.length > 0 ? (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <Card key={event._id} className="p-4 transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-lg mb-2 text-gray-800">{event.title}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="w-4 h-4 mr-2" />
                          <span>{format(new Date(event.date), "h:mm a")}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4" asChild>
                        <a href={`/events/${event._id}`} className="flex items-center">
                          Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Badge variant="secondary" className="text-lg py-2 px-4">No events</Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarEvents;