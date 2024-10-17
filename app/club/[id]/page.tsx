"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Twitter, Instagram, Linkedin, Globe, Mail, Radio, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface ClubData {
  clubName: string;
  type: string;
  bio: string;
  logo: string;
  coverImage: string;
  membershipForm: string;
  socialMediaLinks: string[];
  facultyAdvisor: string;
  website: string;
  emailId: string;
  events: { title: string; description: string; date: string }[];
  members: { name: string; role: string }[];
}

const getSocialIcon = (link: string) => {
  if (link.includes("facebook")) return <Facebook className="h-4 w-4" />;
  if (link.includes("twitter")) return <Twitter className="h-4 w-4" />;
  if (link.includes("instagram")) return <Instagram className="h-4 w-4" />;
  if (link.includes("linkedin")) return <Linkedin className="h-4 w-4" />;
  return <Radio className="h-4 w-4" />;
};

// Skeleton Loader Component
const Skeleton = ({ className }: { className: string }) => {
  return <div className={`animate-pulse bg-gray-300 ${className}`} />;
};

const ClubProfile: React.FC = () => {
  const router = useRouter();
  const [clubData, setClubData] = useState<ClubData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/club/")[1];

    const fetchClubData = async () => {
      try {
        const response = await fetch(`/api/admin/${id}`);
        if (response.ok) {
          const dataArray = await response.json();
          const data = dataArray.data[0];
          
          setClubData({
            coverImage: data.coverImage || "",
            bio: data.bio || "",
            membershipForm: data.membershipForm || "",
            socialMediaLinks: data.socialMediaLinks || [],
            facultyAdvisor: data.facultyAdvisor || "",
            website: data.website || "",
            clubName: data.clubName || "",
            type: data.type || "",
            logo: data.logo || "",
            emailId: data.emailId || "",
            events: data.events || [],
            members: data.members || [],
          });
        } else {
          toast.error("Failed to fetch club data");
        }
      } catch (error) {
        console.error("Error fetching club data:", error);
        toast.error("An error occurred while fetching club data");
      } finally {
        setDataLoading(false);
      }
    };

    fetchClubData();
  }, []);

  if (dataLoading) {
    return (
      <div className="bg-gray-100">
        <div className="relative h-64 md:h-80">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-6">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32 mt-2" />
                </div>
              </div>
              <div className="mt-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </div>
              <div className="mt-6 flex space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  if (!clubData) {
    return <p>No data available for this club.</p>;
  }

  return (
    <div className="bg-gray-100">
      <div className="relative h-64 md:h-80">
        <Image
          src={clubData.coverImage}
          alt={`${clubData.clubName} cover`}
          layout="fill"
          objectFit="cover"
        />
        <Button 
          className="absolute top-4 left-4 z-10"
          onClick={() => router.back()}
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Club Header */}
          <div className="p-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={clubData.logo || "/api/placeholder/100"} alt={clubData.clubName} />
                <AvatarFallback>{clubData.clubName}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{clubData.clubName}</h1>
                <p className="text-xl text-gray-600">{clubData.type}</p>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-6">
              <p className="text-gray-700">{clubData.bio}</p>
            </div>

            {/* Social Media and Contact Links */}
            <div className="mt-6 flex space-x-4">
              {clubData.socialMediaLinks.map((link, index) => (
                <Button key={index} variant="outline" size="icon" asChild>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {getSocialIcon(link)}
                  </a>
                </Button>
              ))}
              {clubData.website && (
                <Button variant="outline" size="icon" asChild>
                  <a href={clubData.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {clubData.emailId && (
                <Button variant="outline" size="icon" asChild>
                  <a href={`mailto:${clubData.emailId}`}>
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="join">Join Us</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{clubData.bio}</p>
                  <p>
                    <strong>Faculty Advisor:</strong> {clubData.facultyAdvisor}
                  </p>
                  <p>
                    <strong>Website:</strong>{" "}
                    <a href={clubData.website} className="text-blue-600 hover:underline">
                      {clubData.website}
                    </a>
                  </p>
                  <p>
                    <strong>Email:</strong> {clubData.emailId}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="space-y-4">
                {clubData.events.length > 0 ? (
                  clubData.events.map((event, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{event.description}</p>
                        <p className="text-sm text-gray-600">Date: {event.date}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No events available.</p>
                )}
              </div>
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members">
              <div className="space-y-4">
                {clubData.members.length > 0 ? (
                  clubData.members.map((member, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{member.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Role: {member.role}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No members available.</p>
                )}
              </div>
            </TabsContent>

            {/* Join Us Tab */}
            <TabsContent value="join">
              {clubData.membershipForm ? (
                <Button variant="outline" asChild>
                  <a href={clubData.membershipForm} target="_blank" rel="noopener noreferrer">
                    Join {clubData.clubName}
                  </a>
                </Button>
              ) : (
                <p>Membership form not available.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;
