"use client"
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox";
import {
  Clock,
  BarChart2,
  Radio,
  ListMusic,
  Music,
  User,
  ChevronsUpDown,
  X,
  GraduationCap,
  Tags
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
  return (
    <div
      className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg p-4 overflow-y-auto transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-60`}
    >
      <div className="flex items-center justify-between mb-6">
        {/* <Link href="/" className="flex items-center space-x-2">
          <div className="bg-purple-500/10 px-3 py-1.5 rounded-md">
            <span className="font-light text-purple-700">Atomi</span>
            <span className="font-bold text-purple-700">City</span>
          </div>
        </Link> */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden hover:bg-purple-500/10" 
          onClick={toggleSidebar}
        >
          <X className="h-4 w-4 text-purple-700" />
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-purple-700 px-2">DISCOVER</div>
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start h-9 px-2 hover:bg-purple-500/10 hover:text-purple-700">
              <Clock className="mr-2 h-4 w-4" /> 
              <span className="text-sm">Upcoming</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-9 px-2 hover:bg-purple-500/10 hover:text-purple-700">
              <BarChart2 className="mr-2 h-4 w-4" /> 
              <span className="text-sm">Browse</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-9 px-2 hover:bg-purple-500/10 hover:text-purple-700">
              <Radio className="mr-2 h-4 w-4" /> 
              <span className="text-sm">Live</span>
            </Button>
          </nav>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-purple-700 px-2">MY EVENTS</div>
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start h-9 px-2 hover:bg-purple-500/10 hover:text-purple-700">
              <ListMusic className="mr-2 h-4 w-4" /> 
              <span className="text-sm">Registered</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-9 px-2 hover:bg-purple-500/10 hover:text-purple-700">
              <Music className="mr-2 h-4 w-4" /> 
              <span className="text-sm">Favorites</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-9 px-2 hover:bg-purple-500/10 hover:text-purple-700">
              <User className="mr-2 h-4 w-4" /> 
              <span className="text-sm">My Club</span>
            </Button>
          </nav>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-purple-700 px-2">FILTERS</div>
          <div className="space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-9 px-2 hover:bg-purple-500/10 hover:text-purple-700"
                >
                  <div className="flex items-center">
                    <Tags className="mr-2 h-4 w-4" />
                    <span className="text-sm">Categories</span>
                  </div>
                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
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
                    <label htmlFor={`category-${category.value}`} className="text-sm">{category.label}</label>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-9 px-2 hover:bg-purple-500/10 hover:text-purple-700"
                >
                  <div className="flex items-center">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    <span className="text-sm">Institutes</span>
                  </div>
                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
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
                    <label htmlFor={`institute-${institute.value}`} className="text-sm">{institute.label}</label>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;