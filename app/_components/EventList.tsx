"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  location: string;
  time: string;
  fees: number;
  noOfParticipants: number;
  coverImg: string;
  isAvailableToReg: boolean;
  clubName: string;
  eventType: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/event");
        const data = await response.json();

        if (data.success) {
          setEvents(data.data.slice(0, 5)); // Get top 5 events
        } else {
          setError("Failed to load events");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="text-center py-10">Loading events...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section id="events" className="py-16 bg-gradient-to-br from-purple-100 via-pink-100 to-red-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center text-purple-800">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-48">
                <Image
                  src={event.coverImg}
                  alt={event.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold text-center px-4">{event.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <CalendarIcon className="h-5 w-5 text-purple-600 mr-2" />
                  <p className="text-gray-600">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                </div>
                <div className="flex items-center mb-2">
                  <MapPinIcon className="h-5 w-5 text-purple-600 mr-2" />
                  <p className="text-gray-600">{event.location}</p>
                </div>
                <div className="flex items-center mb-4">
                  <UsersIcon className="h-5 w-5 text-purple-600 mr-2" />
                  <p className="text-gray-600">{event.noOfParticipants} participants</p>
                </div>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <button 
                  className={`py-2 px-4 rounded-full transition duration-300 ${event.isAvailableToReg ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-400 text-gray-800 cursor-not-allowed'}`}
                  disabled={!event.isAvailableToReg}
                >
                  {event.isAvailableToReg ? "Register Now" : "Registration Closed"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventList;
