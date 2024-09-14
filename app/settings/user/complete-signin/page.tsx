"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // Fetch Clerk user details
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveRight } from "lucide-react";
import Event from "@/models/eventSchema";
import Admin from "@/models/adminSchema";

const clubCategories = [
  { value: "popular", label: "Popular" },
  { value: "technical", label: "Technical" },
  { value: "cultural", label: "Cultural" },
  { value: "sports", label: "Sports" },
  { value: "academic", label: "Academic" },
  { value: "social", label: "Social" },
  { value: "professional", label: "Professional" },
];

interface IUser {
  name: string;
  email: string;
  username: string;
  clerkId: string;
  mobileNo: string;
  institute: string;
  interestedCategories: string[];
  certificates: string[];
  registeredEvents: (typeof Event)[];
  pastEvents: (typeof Event)[];
  memberOfClubs: (typeof Admin)[];
}

const CompleteSignIn = () => {
  const { user } = useUser();
  const router = useRouter();

  // State to store form details
  const [formData, setFormData] = useState<IUser>({
    name: "",
    email: "",
    username: "",
    clerkId: "",
    mobileNo: "",
    institute: "",
    interestedCategories: [],
    certificates: [],
    registeredEvents: [],
    pastEvents: [],
    memberOfClubs: [],
  });

  // UseEffect to update formData once the user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: "",
        email: user?.emailAddresses[0]?.emailAddress || "",
        username: user?.username || "",
        clerkId: user?.id || "",
        mobileNo: "",
        institute: "",
        interestedCategories: [],
        certificates: [],
        registeredEvents: [],
        pastEvents: [],
        memberOfClubs: [],
      });
    }
  }, [user]);

  // Handle form change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFormData({
        ...formData,
        interestedCategories: [...formData.interestedCategories, value],
      });
    } else {
      setFormData({
        ...formData,
        interestedCategories: formData.interestedCategories.filter(
          (category) => category !== value
        ),
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Data:", formData);
    try {
      const url = `/api/user`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.status) {
        console.log("Registration successful:", data);
      } else {
        console.error("Registration failed:");
      }
    } catch (error) {
      console.error("An error occurred during registration dp :", error);
    }

    // Redirect to events page after submission
    router.push("/events");
  };

  return (
    <div className="w-full lg:grid lg:min-h-[300px] lg:grid-cols-2 xl:min-h-[300px]">
      {/* Left Column with the SignIn Form */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Complete Sign In</h1>
            <p className="text-muted-foreground">
              Fill in the details to proceed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Name Field */}
            <div className="grid gap-1">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </div>

            {/* Email Field */}
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly
                className="mt-1 block w-full"
              />
            </div>

            {/* Username Field */}
            <div className="grid gap-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                readOnly
                className="mt-1 block w-full"
              />
            </div>

            {/* Mobile Number Field */}
            <div className="grid gap-1">
              <Label htmlFor="mobileNo">Mobile Number</Label>
              <Input
                id="mobileNo"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required
                className="mt-1 block w-full"
              />
            </div>

            {/* Institute Select Field */}
            <div className="grid gap-1">
              <Label htmlFor="institute">Institute</Label>
              <select
                id="institute"
                name="institute"
                value={formData.institute}
                onChange={handleChange}
                className="mt-1 block w-full"
              >
                <option value="itnu">ITNU</option>
                <option value="imnu">IMNU</option>
                <option value="ipnu">IPNU</option>
                <option value="ianu">IANU</option>
              </select>
            </div>

            {/* Interested Categories (Checkboxes) */}
            <div className="grid gap-1">
              <Label>Interested Categories</Label>
              {clubCategories.map((category) => (
                <div key={category.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category.value}
                    name="interestedCategories"
                    value={category.value}
                    checked={formData.interestedCategories.includes(
                      category.value
                    )}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  <label htmlFor={category.value}>{category.label}</label>
                </div>
              ))}
            </div>

            {/* Proceed Button */}
            <Button type="submit" className="flex w-full mt-3 items-center">
              Proceed
              <MoveRight className="ml-2" />
            </Button>
          </form>
        </div>
      </div>

      {/* Right Column with the Image */}
      <div className="hidden bg-muted lg:block">
        <span className="absolute text-white font-light text-9xl top-[40%] ml-5">
          Atomi<span className=" font-bold">City</span>
        </span>
        <Image
          src="/imgs/img5.jpg" // Path to your image
          alt="Cover Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default CompleteSignIn;
