import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Updated club data
const clubs = [
  { id: 1, shortName: "CSI", fullName: "Computer Society of India", logo: "/logos/csi.jpg", description: "Fostering the science of Computer Engineering and promoting professional development." },
  { id: 2, shortName: "ECO", fullName: "Electronics and Communication Students Organisation", logo: "/logos/eco.png", description: "Advancing knowledge in electronics and communication engineering." },
  { id: 3, shortName: "ISTE", fullName: "Indian Society for Technical Education", logo: "/logos/iste.jpg", description: "Promoting technical education and fostering students' professional development." },
  { id: 4, shortName: "MESA", fullName: "Mechanical Engineering Students Association", logo: "/logos/mesa.png", description: "Uniting mechanical engineering students and promoting industry interaction." },
  { id: 5, shortName: "NUMAISH", fullName: "Numaish (Music Band)", logo: "/logos/numaish.jpg", description: "Campus music band showcasing student talents and entertaining the community." },
  { id: 6, shortName: "ORCES", fullName: "Organization of Civil Engineering Students", logo: "/logos/orces.png", description: "Bringing together civil engineering students and promoting practical learning." },
  { id: 7, shortName: "ROBOTECH", fullName: "Robotech", logo: "/logos/robotech.png", description: "Exploring robotics and automation technologies through hands-on projects." },
  { id: 8, shortName: "EESA", fullName: "Electrical Engineering Students Association", logo: "/logos/eesa.jpg", description: "Promoting electrical engineering knowledge and industry connections." },
];

const ClubCard = ({ club }: { club: any }) => (
  <Dialog>
    <DialogTrigger asChild>
      <div className="w-40 h-40 p-0 flex flex-col items-center justify-center hover:underline hover:bg-none">
        <Avatar className="w-24 h-24 mb-2 border-[1px] border-black cursor-pointer">
          <img src={club.logo} alt={`${club.shortName} logo`} className="object-cover" />
        </Avatar>
        <span className="text-sm font-light text-center">{club.shortName}</span>
      </div>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Avatar className="w-10 h-10">
            <img src={club.logo} alt={`${club.shortName} logo`} className="object-cover" />
          </Avatar>
          <div>
            <div>{club.shortName}</div>
            <div className="text-sm font-normal text-gray-500">{club.fullName}</div>
          </div>
        </DialogTitle>
        <DialogDescription className="mt-4">{club.description}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Button>Join Club</Button>
        <Button variant="outline">Learn More</Button>
      </div>
      <DialogFooter className=' mr-auto ml-auto text-xs text-muted-foreground'>
      © Atomicity Events Inc. | All Rights Reserved | 2024-2025
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const ClubEvents = () => {
  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8">Explore Campus Clubs</h1>
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 justify-items-center">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default ClubEvents;