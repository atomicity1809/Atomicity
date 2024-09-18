"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useUser } from '@clerk/nextjs';

const Profile = () => {
  // const {user} = useUser();
  const user = {
    image: "/imgs/atomicity_logo.png",
    fullName: "Atom 2",
    username: "atomicity",
    email: "atomicity.atom2@example.com",
    mobile: "+1 234 567 8900",
    institute: "Tech University",
    categories: ["Technology", "Business", "Design"]
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user?.image} alt="user img" />
                {/* <AvatarFallback>{user?.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback> */}
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">{user?.fullName}</h2>
                <p className="text-gray-500">@{user?.username}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input id="mobile" value={user.mobile} readOnly />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institute">Institute Name</Label>
              <Input id="institute" value={user.institute} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Categories Interested</Label>
              <div className="flex flex-wrap gap-2">
                {user.categories.map((category, index) => (
                  <Badge key={index} variant="secondary">{category}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;