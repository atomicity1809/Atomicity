"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

interface UserDetails {
  _id: string;
  name: string;
  email: string;
  username: string;
  clerkId: string;
  mobileNo: string;
  institute: string;
  interestedCategories: string[];
  interestedEvents: string[];
  registeredEvents: string[];
  pastEvents: string[];
  certificates: string[];
}

const Profile = () => {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/user/${user.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          const data = await response.json();
          if (data.success) {
            setUserDetails(data.data);
          } else {
            throw new Error(data.error);
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [user]);

  const handleAddCategory = async () => {
    if (!newCategory.trim() || !userDetails) return;

    try {
      const response = await fetch(`/api/user/${user?.id}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: newCategory }),
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      const data = await response.json();
      if (data.success) {
        setUserDetails({
          ...userDetails,
          interestedCategories: [...userDetails.interestedCategories, newCategory],
        });
        toast.success("Category added successfully !!!");
        setNewCategory('');
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  if (loading) {
    // Skeleton Loading UI
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Details Card Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle className="skeleton w-40 h-6"></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="skeleton w-20 h-20 rounded-full"></div>
                <div>
                  <div className="skeleton w-32 h-6 mb-2"></div>
                  <div className="skeleton w-24 h-4"></div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="skeleton w-20 h-4"></Label>
                <div className="skeleton w-full h-10"></div>
              </div>
              <div className="space-y-2">
                <Label className="skeleton w-20 h-4"></Label>
                <div className="skeleton w-full h-10"></div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Details Card Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle className="skeleton w-40 h-6"></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="skeleton w-32 h-4"></Label>
                <div className="skeleton w-full h-10"></div>
              </div>
              <div className="space-y-2">
                <Label className="skeleton w-40 h-4"></Label>
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="skeleton w-16 h-6 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="skeleton w-32 h-4"></Label>
                <div className="flex space-x-2">
                  <div className="skeleton w-full h-10"></div>
                  <div className="skeleton w-16 h-10"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (!userDetails) return <div>No user details available</div>;

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
                <AvatarImage src={user?.imageUrl} alt="user img" />
                <AvatarFallback>{userDetails.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">{userDetails.name}</h2>
                <p className="text-gray-500">@{userDetails.username}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={userDetails.email} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input id="mobile" value={userDetails.mobileNo} readOnly />
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
              <Input id="institute" value={userDetails.institute} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Categories Interested</Label>
              <div className="flex flex-wrap gap-2">
                {userDetails.interestedCategories.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newCategory">Add New Category</Label>
              <div className="flex space-x-2">
                <Input
                  id="newCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category"
                />
                <Button onClick={handleAddCategory}>Add</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;