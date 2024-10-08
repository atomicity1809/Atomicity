"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const ClubCard = ({ club }: { club: any }) => {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-40 h-40 p-0 flex flex-col items-center justify-center hover:underline hover:bg-none">
          <Avatar className="w-24 h-24 mb-2 border-[1px] border-black cursor-pointer">
            <Image
              src={club?.logo}
              alt={`${club?.clubName} logo`}
              className="object-cover"
              height={100}
              width={100}
            />
          </Avatar>
          <span className="text-sm font-light text-center">
            {club?.clubName}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <Image
                src={club?.logo}
                alt={`${club?.shortName} logo`}
                className="object-cover"
                height={100}
                width={100}
              />
            </Avatar>
            <div>
              <div>{club?.shortName}</div>
              <div className="text-sm font-normal text-gray-500">
                {club?.clubName}
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="mt-4">
            {club?.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={() => router.push(`/club/${club?._id}`)}>
            Explore
          </Button>
        </div>
        <DialogFooter className=" mr-auto ml-auto text-xs text-muted-foreground">
          © Atomicity Events Inc. | All Rights Reserved | 2024-2025
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ClubEvents = () => {
  const [clubs, setClubs] = useState([]); // State to store club data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const user = useUser();
  // const router = useRouter

  useEffect(() => {
    // Fetch club data from the backend
    const fetchClubs = async () => {
      try {
        const response = await fetch("/api/getclubs");
        if (!response.ok) {
          throw new Error("Failed to fetch clubs");
        }
        const data = await response.json();
        console.log(data.data);
        setClubs(data.data); // Set the fetched data
      } catch (err) {
        setError((err as Error).message); // Set error message
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchClubs(); // Call the async function
  }, []); // Empty dependency array to run only once on mount

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8">
        Explore Campus Clubs
      </h1>
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 justify-items-center">
          {clubs.map((club: any) => (
            <ClubCard key={club?._id} club={club} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ClubEvents;
