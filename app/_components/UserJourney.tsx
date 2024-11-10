"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  Search,
  Ticket,
  CalendarCheck,
  Mail,
  PartyPopper,
} from "lucide-react";

const journey = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description:
      "Create your account in seconds and personalize your event preferences.",
    color: "bg-blue-500",
  },
  {
    icon: Search,
    title: "Discover Events",
    description:
      "Browse through a curated list of exciting events tailored to your interests.",
    color: "bg-green-500",
  },
  {
    icon: Ticket,
    title: "Book Tickets",
    description: "Secure your spot with our easy and secure booking process.",
    color: "bg-yellow-500",
  },
  {
    icon: Mail,
    title: "E-Ticket Delivery",
    description: "Get your e-ticket delivered straight to your inbox.",
    color: "bg-purple-500",
  },
  {
    icon: CalendarCheck,
    title: "Event Reminders",
    description:
      "Receive timely notifications to keep you updated about your upcoming event.",
    color: "bg-red-500",
  },
  {
    icon: PartyPopper,
    title: "Enjoy the Event",
    description: "Have an amazing time at your event!",
    color: "bg-pink-500",
  },
];

const UserJourney: React.FC = () => {
  return (
    <section className="py-8 bg-gradient-to-b from-purple-200 to-purple-500">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold text-center text-purple-500 mb-12">
          Your Journey to{" "}
          <span className="text-white">Unforgettable Events</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          {journey.map((step, index) => (
            <TimelineStep
              key={index}
              step={step}
              index={index}
              totalSteps={journey.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TimelineStepProps {
  step: {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
  };
  index: number;
  totalSteps: number;
}

const TimelineStep: React.FC<TimelineStepProps> = ({
  step,
  index,
  totalSteps,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="mb-8 flex"
    >
      <div className="flex flex-col items-center mr-4">
        <div className={`rounded-full p-2 ${step.color}`}>
          <step.icon className="text-white" size={24} />
        </div>
        {index < totalSteps - 1 && (
          <div className="h-full w-0.5 bg-purple-300 mt-2"></div>
        )}
      </div>
      <Card className="flex-grow">
        <CardContent className="pt-6">
          <div className="flex items-center mb-2">
            <h3 className="text-xl font-semibold text-purple-800 mr-2">
              {step.title}
            </h3>
            <Badge variant="secondary">Step {index + 1}</Badge>
          </div>
          <p className="text-gray-600">{step.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserJourney;
