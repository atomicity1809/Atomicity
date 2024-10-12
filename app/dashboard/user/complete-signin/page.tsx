"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveRight, MoveLeft } from "lucide-react";
import Event from "@/models/eventSchema";
import Admin from "@/models/adminSchema";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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

const StepWiseSignUpForm = () => {
  const { user } = useUser();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [finalClick,setFinalClick]=useState(false);
  const handleFinalClick = () =>{
    setFinalClick(true);
  }
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

  const [isStepValid, setIsStepValid] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        email: user?.emailAddresses[0]?.emailAddress || "",
        username: user?.username || "",
        clerkId: user?.id || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    validateStep();
  }, [formData, step]);

  const validateStep = () => {
    switch (step) {
      case 1:
        setIsStepValid(!!formData.name);
        break;
      case 2:
        setIsStepValid(!!formData.mobileNo && !!formData.institute);
        break;
      case 3:
        setIsStepValid(formData.interestedCategories.length > 0);
        break;
      default:
        setIsStepValid(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only submit the form if we are on the final step (step === 3)
    if (step == 3 && formData.interestedCategories.length<=0 && finalClick==false) return;
    console.log("line 118: ",step,formData.interestedCategories.length,finalClick);
    console.log("User Data:", formData);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Registration successful");
        toast.success("Registration Successful !!");
        router.push("/events");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  const toggleInterest = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      interestedCategories: prevData.interestedCategories.includes(value)
        ? prevData.interestedCategories.filter((category) => category !== value)
        : [...prevData.interestedCategories, value],
    }));
  };

  const nextStep = () => {
    if (isStepValid && step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly
                  disabled
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  readOnly
                  disabled
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="mobileNo">Mobile Number</Label>
                <Input
                  id="mobileNo"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="institute">Institute</Label>
                <select
                  id="institute"
                  name="institute"
                  value={formData.institute}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select Institute</option>
                  <option value="itnu">ITNU</option>
                  <option value="imnu">IMNU</option>
                  <option value="ipnu">IPNU</option>
                  <option value="ianu">IANU</option>
                </select>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Your Interests</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap -m-1">
                {clubCategories.map((category) => (
                  <Badge
                    key={category.value}
                    variant={formData.interestedCategories.includes(category.value) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ease-in-out ${
                      formData.interestedCategories.includes(category.value)
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-background text-foreground hover:bg-primary/10"
                    } m-1 px-3 py-1 text-sm font-medium`}
                    onClick={() => toggleInterest(category.value)}
                  >
                    {category.label}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {formData.interestedCategories.length} / {clubCategories.length}
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full ml-auto mr-auto">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto w-[350px]">
          <div className="grid gap-2">
            <p className="text-xl font-light flex items-center justify-center bg-purple-200 ml-auto mr-auto p-1 border-[1px] border-purple-500 rounded-xl">
              Atomi<span className=" font-bold">City</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-5">
            {renderStep()}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button variant="secondary" type="button" onClick={prevStep}>
                  <MoveLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
              )}
              {step < 3 ? (
                <Button variant="secondary" type="button" onClick={nextStep} disabled={!isStepValid}>
                  Next <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button variant="secondary" type="submit" disabled={!isStepValid} onClick={handleFinalClick}>
                  Complete
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StepWiseSignUpForm;
