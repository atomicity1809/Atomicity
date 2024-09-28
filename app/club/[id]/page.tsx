"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Facebook, Twitter, Instagram, Globe, Mail, MoreHorizontal, ArrowUpDown, ArrowLeft } from 'lucide-react';

interface BoardMember {
  name: string;
  position: string;
  image: string;
}

interface ClubData {
  clubName: string;
  type: string;
  pastEvents: string[];
  currentEvents: string[];
  boardMembersOfClub: BoardMember[];
  executiveCommitteeMembers: string[];
  bio: string;
  logo: string;
  coverImage: string;
  membershipForm: string;
  socialMediaLinks: string[];
  facultyAdvisor: string;
  website: string;
  emailId: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  type: 'current' | 'past';
  description: string;
}

const ClubProfilePage: React.FC = () => {
  const router = useRouter();
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Mock data (replace with actual data fetching logic)
  const clubData: ClubData = {
    clubName: "Electronics and Communication Student Organization",
    type: "Technology",
    pastEvents: ["Hackathon 2023", "Tech Talk Series"],
    currentEvents: ["AI Workshop", "Coding Competition"],
    boardMembersOfClub: [
      { name: "John Doe", position: "President", image: "/api/placeholder/100" },
      { name: "Jane Smith", position: "Vice President", image: "/api/placeholder/100" },
    ],
    executiveCommitteeMembers: ["Alice Johnson", "Bob Williams"],
    bio: "An organisation for the development of the students of Electronics and Communication Engineering at Nirma University.",
    logo: "/logos/eco.png",
    coverImage: "/logos/eco_itnu_cover.jpeg",
    membershipForm: "https://example.com/membership",
    socialMediaLinks: ["https://facebook.com", "https://twitter.com", "https://instagram.com"],
    facultyAdvisor: "Dr. Emily Brown",
    website: "https://atomicity.club",
    emailId: "contact@atomicity.club"
  };

  const eventsData: Event[] = [
    { id: '1', name: 'AI Workshop', date: '2024-04-15', type: 'current', description: 'Learn about the latest AI technologies' },
    { id: '2', name: 'Coding Competition', date: '2024-05-01', type: 'current', description: 'Test your coding skills' },
    { id: '3', name: 'Hackathon 2023', date: '2023-11-10', type: 'past', description: '24-hour coding challenge' },
    { id: '4', name: 'Tech Talk Series', date: '2023-09-20', type: 'past', description: 'Industry experts share insights' },
  ];

  const [events, setEvents] = useState(eventsData);
  const [sortColumn, setSortColumn] = useState<keyof Event>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300) {
        setShowFloatingNav(true);
      } else {
        setShowFloatingNav(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const sortEvents = (column: keyof Event) => {
    const direction = column === sortColumn && sortDirection === 'asc' ? 'desc' : 'asc';
    const sorted = [...events].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setEvents(sorted);
    setSortColumn(column);
    setSortDirection(direction);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {showFloatingNav && (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={clubData.logo} alt={clubData.clubName} />
                <AvatarFallback>{clubData.clubName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{clubData.clubName}</h2>
                <p className="text-sm text-gray-600">{clubData.type}</p>
              </div>
            </div>
            <div className="flex space-x-2">
                
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button size="sm">
                <Globe className="h-4 w-4 mr-2" />
                Website
              </Button>

            </div>
          </div>
        </div>
      )}

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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={clubData.logo} alt={clubData.clubName} />
                <AvatarFallback>{clubData.clubName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{clubData.clubName}</h1>
                <p className="text-xl text-gray-600">{clubData.type}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-gray-700">{clubData.bio}</p>
            </div>
            
            <div className="mt-6 flex space-x-4">
              {clubData.socialMediaLinks.map((link, index) => (
                <Button key={index} variant="outline" size="icon">
                  {index === 0 && <Facebook className="h-4 w-4" />}
                  {index === 1 && <Twitter className="h-4 w-4" />}
                  {index === 2 && <Instagram className="h-4 w-4" />}
                </Button>
              ))}
              <Button variant="outline" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="join">Join Us</TabsTrigger>
            </TabsList>
            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <CardTitle>Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">
                          <Button variant="ghost" onClick={() => sortEvents('name')}>
                            Name
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button variant="ghost" onClick={() => sortEvents('date')}>
                            Date
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button variant="ghost" onClick={() => sortEvents('type')}>
                            Type
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.name}</TableCell>
                          <TableCell>{event.date}</TableCell>
                          <TableCell>{event.type}</TableCell>
                          <TableCell>{event.description}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(event.id)}>
                                  Copy event ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View details</DropdownMenuItem>
                                <DropdownMenuItem>Register</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <CardTitle>Club Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">Board Members</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {clubData.boardMembersOfClub.map((member, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Executive Committee</h3>
                  <ul className="list-disc pl-5">
                    {clubData.executiveCommitteeMembers.map((member, index) => (
                      <li key={index}>{member}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{clubData.bio}</p>
                  <p><strong>Faculty Advisor:</strong> {clubData.facultyAdvisor}</p>
                  <p><strong>Website:</strong> <a href={clubData.website} className="text-blue-600 hover:underline">{clubData.website}</a></p>
                  <p><strong>Email:</strong> {clubData.emailId}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="join">
              <Card>
                <CardHeader>
                  <CardTitle>Join Our Club</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Interested in joining {clubData.clubName}? Fill out our membership form to get started!</p>
                  <Button asChild>
                    <a href={clubData.membershipForm} target="_blank" rel="noopener noreferrer">
                      Open Membership Form
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClubProfilePage;