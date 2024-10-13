"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Twitter, Instagram, Linkedin, Globe, Mail, Radio, ArrowLeft } from "lucide-react";
import { toast } from "sonner"; // Assuming you're using toast for notifications

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

const ClubProfile: React.FC = () => {
  const router = useRouter();
  const [clubData, setClubData] = useState<ClubData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const path = window.location.pathname; // Get the path from the window object
    const id = path.split("/club/")[1]; // Extract the ID from the URL

    const fetchClubData = async () => {
      try {
        const response = await fetch(`/api/admin/${id}`);
        if (response.ok) {
          const data = await response.json();
          setClubData({
            coverImage: data.data.coverImage || "",
            bio: data.data.bio || "",
            membershipForm: data.data.membershipForm || "",
            socialMediaLinks: data.data.socialMediaLinks || [],
            facultyAdvisor: data.data.facultyAdvisor || "",
            website: data.data.website || "",
            clubName: data.data.clubName || "",
            type: data.data.type || "",
            logo: data.data.logo || "",
            emailId: data.data.emailId || "",
            events: data.data.events || [],
            members: data.data.members || [],
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
  }, []); // Run only once when the component mounts

  if (dataLoading) {
    return <p>Loading...</p>; // or a spinner/loading indicator
  }

  if (!clubData) {
    return <p>No data available for this club.</p>;
  }

  return (
    <div className="bg-gray-100">
      {/* Cover Image */}
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
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  {clubData.events.length > 0 ? (
                    clubData.events.map((event, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="font-bold text-lg">{event.title}</h3>
                        <p>{event.description}</p>
                        <p className="text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    ))
                  ) : (
                    <p>No events available at the moment.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <CardTitle>Club Members</CardTitle>
                </CardHeader>
                <CardContent>
                  {clubData.members.length > 0 ? (
                    clubData.members.map((member, index) => (
                      <div key={index} className="mb-4">
                        <p className="font-bold">{member.name}</p>
                        <p className="text-gray-600">{member.role}</p>
                      </div>
                    ))
                  ) : (
                    <p>No member information available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Join Us Tab */}
            <TabsContent value="join">
              <Card>
                <CardHeader>
                  <CardTitle>Join Our Club</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Interested in joining {clubData.clubName}? Fill out our membership form to get started!</p>
                  {clubData.membershipForm && (
                    <Button asChild>
                      <a href={clubData.membershipForm} target="_blank" rel="noopener noreferrer">
                        Open Membership Form
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;
