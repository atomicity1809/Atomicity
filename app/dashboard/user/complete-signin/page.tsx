"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Check, User, Mail, Phone, Building2, Tags } from "lucide-react";
import Event from "@/models/eventSchema";
import Admin from "@/models/adminSchema";

// Types
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

const clubCategories = [
  { value: "popular", label: "Popular" },
  { value: "technical", label: "Technical" },
  { value: "cultural", label: "Cultural" },
  { value: "sports", label: "Sports" },
  { value: "academic", label: "Academic" },
  { value: "social", label: "Social" },
  { value: "professional", label: "Professional" },
  { value: "entrepreneurship", label: "Entrepreneurship" },
  { value: "literary", label: "Literary" },
  { value: "music", label: "Music" },
  { value: "art", label: "Art" },
  { value: "communityService", label: "Community Service" },
  { value: "environmental", label: "Environmental" },
  { value: "gaming", label: "Gaming" },
  { value: "wellness", label: "Wellness" },
  { value: "media", label: "Media" },
  { value: "debate", label: "Debate" }
];

const institutes = [
  { value: "itnu", label: "ITNU" },
  { value: "imnu", label: "IMNU" },
  { value: "ipnu", label: "IPNU" },
  { value: "ianu", label: "IANU" }
];

// Step Indicator Component
const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { number: 1, title: "Profile" },
    { number: 2, title: "Contact" },
    { number: 3, title: "Interests" }
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          />
        </div>

        {steps.map(({ number, title }) => (
          <div
            key={number}
            className="relative flex flex-col items-center gap-2"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${
                number <= currentStep
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {number < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                number
              )}
            </div>
            <span className="text-sm font-medium text-gray-600">
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
const StepWiseSignUpForm = () => {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [finalClick, setFinalClick] = useState(false);
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

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user?.fullName || "",
        email: user?.emailAddresses[0]?.emailAddress || "",
        username: user?.username || "",
        clerkId: user?.id || "",
      }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInstituteChange = (value: string) => {
    setFormData({
      ...formData,
      institute: value,
    });
  };

  const toggleInterest = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      interestedCategories: prevData.interestedCategories.includes(value)
        ? prevData.interestedCategories.filter((category) => category !== value)
        : [...prevData.interestedCategories, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (formData.interestedCategories.length === 0 && !finalClick) {
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Registration successful!");
        router.push("/events");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Registration error:", error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Review your info</CardTitle>
              <CardDescription>
                Please verify your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  readOnly
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  readOnly
                  disabled
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>
                How can we reach you?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobileNo" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile Number
                </Label>
                <Input
                  id="mobileNo"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institute" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Institute
                </Label>
                <Select
                  value={formData.institute}
                  onValueChange={handleInstituteChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your institute" />
                  </SelectTrigger>
                  <SelectContent>
                    {institutes.map((institute) => (
                      <SelectItem
                        key={institute.value}
                        value={institute.value}
                      >
                        {institute.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Your Interests</CardTitle>
              <CardDescription>
                Select categories that interest you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label className="flex items-center gap-2">
                <Tags className="w-4 h-4" />
                Categories
              </Label>
              <div className="flex flex-wrap gap-2">
                {clubCategories.map((category) => (
                  <Badge
                    key={category.value}
                    variant={
                      formData.interestedCategories.includes(category.value)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer transition-colors"
                    onClick={() => toggleInterest(category.value)}
                  >
                    {category.label}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Selected: {formData.interestedCategories.length} /{" "}
                {clubCategories.length}
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Festival Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/imgs/festival.jpg"
          alt="Festival celebration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center p-12">
          <div className="text-white text-center z-10">
            <div>
              <span className=" text-9xl font-thin">Atomi</span>
              <span className=" text-9xl font-semibold">City</span>
            </div>
            
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Complete Your Profile
          </h2>

          <StepIndicator currentStep={step} />

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  Previous
                </Button>
              )}
              <Button
                type="submit"
                className={step === 1 ? "w-full" : ""}
                onClick={() => step === 3 && setFinalClick(true)}
              >
                {step === 3 ? "Complete" : "Next"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StepWiseSignUpForm;