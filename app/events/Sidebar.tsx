"use client"
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import {
  Clock,
  BarChart2,
  Radio,
  ListMusic,
  Music,
  User,
  Settings,
  LogOut,
  LogIn,
  ChevronsUpDown,
  X,
  LayoutDashboard,
  HomeIcon,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedCategories: string[];
  handleCategoryChange: (value: string) => void;
  selectedInstitutes: string[];
  handleInstituteChange: (value: string) => void;
}

const clubCategories = [
  { value: "popular", label: "Popular" },
  { value: "technical", label: "Technical" },
  { value: "cultural", label: "Cultural" },
  { value: "sports", label: "Sports" },
  { value: "academic", label: "Academic" },
  { value: "social", label: "Social" },
  { value: "professional", label: "Professional" },
];

const institutes = [
  { value: "itnu", label: "ITNU" },
  { value: "imnu", label: "IMNU" },
  { value: "ipnu", label: "IPNU" },
  { value: "ips", label: "IPS" },
  { value: "ild", label: "ILD" },
];

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  toggleSidebar,
  selectedCategories,
  handleCategoryChange,
  selectedInstitutes,
  handleInstituteChange,
}) => {
  const { isSignedIn, user } = useUser();

  const UserMenu = () => {
    if (!isSignedIn) {
      return (
        <SignInButton mode="modal" fallbackRedirectUrl={"/events"}>
          <Button variant="ghost" className="text-purple-500">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        </SignInButton>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />
              <AvatarFallback>{user?.firstName?.charAt(0) || ''}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.fullName}</p>
              <p className="text-xs leading-none text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <Link href={'/dashboard/user'}>
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <SignOutButton redirectUrl="/events">Sign out</SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div
      className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 bg-background border-r p-4 overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64`}
    >
      <div className='flex items-center justify-center mb-4'>
      <div className="flex items-center space-x-2">
        <Link href="/">
          <span className="border-[1px] rounded-md border-purple-500 p-1 bg-purple-200 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-300 hover:border-purple-600">
            <span className="font-light text-sm transition-all duration-300 ease-in-out hover:text-purple-800">Atomi</span>
            <span className="font-bold text-sm transition-all duration-300 ease-in-out hover:text-purple-900">City</span>
          </span>
        </Link>
      </div>

        <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className=" flex items-center justify-center gap-2">
        <UserMenu />
        <span className="flex items-center justify-center text-sm text-muted-foreground">@{user?.username}</span>
      </div>
      <hr className="my-2"/>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Discover</h3>
          <ul className="space-y-2">
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" /> Upcoming Events
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart2 className="mr-2 h-4 w-4" /> Browse
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Radio className="mr-2 h-4 w-4" /> Live Events
              </Button>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-2">My Events</h3>
          <ul className="space-y-2">
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <ListMusic className="mr-2 h-4 w-4" /> Registered
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Music className="mr-2 h-4 w-4" /> Favorites
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" /> My Club Events
              </Button>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-2">Categories</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                Categories
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {clubCategories.map((category) => (
                <DropdownMenuItem key={category.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.value}`}
                    checked={selectedCategories.includes(category.value)}
                    onCheckedChange={() => handleCategoryChange(category.value)}
                  />
                  <label htmlFor={`category-${category.value}`}>{category.label}</label>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <h3 className="font-medium mb-2">Institute</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                Institutes
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {institutes.map((institute) => (
                <DropdownMenuItem key={institute.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`institute-${institute.value}`}
                    checked={selectedInstitutes.includes(institute.value)}
                    onCheckedChange={() => handleInstituteChange(institute.value)}
                  />
                  <label htmlFor={`institute-${institute.value}`}>{institute.label}</label>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;