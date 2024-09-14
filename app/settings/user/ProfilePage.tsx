import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Link as LinkIcon, Mail, Edit2 } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Cover Photo */}
      <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      
      {/* Profile Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-auto">
          <div className="p-6 sm:p-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="flex-shrink-0">
                  <img className="mx-auto h-32 w-32 rounded-full border-4 border-white shadow-lg" src="/api/placeholder/150" alt="Profile" />
                </div>
                <div className="mt-4 sm:mt-0 sm:pt-1 text-center sm:text-left">
                  <p className="text-xl font-bold text-gray-900 sm:text-2xl">Sarah Johnson</p>
                  <p className="text-sm font-medium text-gray-600">Professional Event Planner</p>
                  <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Calendar className="mr-1 h-3 w-3" />
                      10+ Years Experience
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <MapPin className="mr-1 h-3 w-3" />
                      New York, NY
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-center sm:mt-0">
                <Button className="flex items-center">
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="about" className="mt-6">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Bio</h3>
                    <p className="text-gray-700 mb-4">
                      Passionate event planner with over a decade of experience crafting unforgettable moments. 
                      Specialized in corporate events, weddings, and large-scale conferences. 
                      Known for attention to detail and creative problem-solving.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Mail className="mr-2 h-5 w-5" />
                        sarah.johnson@example.com
                      </div>
                      <div className="flex items-center text-gray-600">
                        <LinkIcon className="mr-2 h-5 w-5" />
                        <a href="#" className="text-blue-600 hover:underline">www.sarahjohnsonevents.com</a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="events">
                <Card className='flex'>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h3>
                    <ul className="space-y-4">
                      <li className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">TechConf 2024</h4>
                        <p className="text-sm text-gray-600">Annual technology conference</p>
                        <p className="text-sm text-gray-600">June 15-17, 2024</p>
                      </li>
                      <li className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Smith-Johnson Wedding</h4>
                        <p className="text-sm text-gray-600">Elegant countryside wedding</p>
                        <p className="text-sm text-gray-600">August 22, 2024</p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Client Reviews</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex items-center mb-2">
                          <img className="h-10 w-10 rounded-full mr-3" src="/api/placeholder/40" alt="Reviewer" />
                          <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-sm text-gray-600">CEO, Tech Innovators</p>
                          </div>
                        </div>
                        <p className="text-gray-700">"Sarah's attention to detail made our company retreat a huge success. Highly recommended!"</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex items-center mb-2">
                          <img className="h-10 w-10 rounded-full mr-3" src="/api/placeholder/40" alt="Reviewer" />
                          <div>
                            <p className="font-medium">Emma Wilson</p>
                            <p className="text-sm text-gray-600">Bride</p>
                          </div>
                        </div>
                        <p className="text-gray-700">"Our wedding was absolutely perfect thanks to Sarah's expert planning and coordination."</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;