"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Club {
  _id: string;
  clubName: string;
  shortName: string;
  logo: string;
  description: string;
  clerkId: string;
}

const ClubCard: React.FC<{ club: Club }> = ({ club }) => {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="z-99999 w-full p-4 flex flex-col items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
          <Avatar className="w-24 h-24 mb-2 border border-gray-200">
            <AvatarImage src={club.logo} alt={`${club.clubName} logo`} />
            <AvatarFallback>{club.shortName}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-center">
            {club.clubName}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={club.logo} alt={`${club.shortName} logo`} />
              <AvatarFallback>{club.shortName}</AvatarFallback>
            </Avatar>
            <div>
              <div>{club.shortName}</div>
              <div className="text-sm font-normal text-gray-500">
                {club.clubName}
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="mt-4">
            {club.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={() => router.push(`/club/${club.clerkId}`)}>
            Know More about Club
          </Button>
        </div>
        <DialogFooter className="text-xs text-muted-foreground mr-auto ml-auto">
          © Atomicity Events Inc. | All Rights Reserved | 2024-2025
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ClubSkeleton: React.FC = () => (
  <div className="w-full p-4 flex flex-col items-center justify-center">
    <Skeleton className="w-24 h-24 rounded-full mb-2" />
    <Skeleton className="h-4 w-3/4" />
  </div>
);

const ClubEvents: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("/api/getclubs");
        if (!response.ok) {
          throw new Error("Failed to fetch clubs");
        }
        const data = await response.json();
        setClubs(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const filteredClubs = clubs.filter((club) =>
    club.clubName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Explore Campus Clubs
      </h1>
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clubs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <ClubSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredClubs.map((club) => (
              <ClubCard key={club._id} club={club} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ClubEvents;
