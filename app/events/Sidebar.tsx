"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Compass,
  CalendarClock,
  Radio,
  ChevronsUpDown,
  X,
  GraduationCap,
  Tags,
  HeartPulse,
  CheckCircle2,
  BookOpenCheck,
  CheckCheck,
  Heart
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedCategories: string[];
  handleCategoryChange: (value: string) => void;
  selectedInstitutes: string[];
  handleInstituteChange: (value: string) => void;
  onViewChange: (view: string) => void;
  currentView: string;
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
  onViewChange,
  currentView,
}) => {
  const NavButton = ({ view, icon: Icon, label }: { view: string; icon: any; label: string }) => (
    <Button 
      variant="ghost" 
      className={`w-full justify-start h-9 px-2 hover:bg-purple-500/10 hover:text-purple-700 transition-all duration-300
        ${currentView === view ? 'bg-purple-500/10 text-purple-700 font-medium' : ''}`}
      onClick={() => onViewChange(view)}
    >
      <div className="flex items-center">
        <div className={`mr-2 transition-transform duration-300 ${currentView === view ? 'scale-110' : ''}`}>
          <Icon className={`h-4 w-4 ${currentView === view ? 'animate-pulse' : ''}`} />
        </div>
        <span className="text-sm">{label}</span>
      </div>
    </Button>
  );

  return (
    <div
      className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 
      shadow-lg p-4 overflow-y-auto transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64`}
    >
      <div className="flex items-center justify-between mb-6">
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
          <div className="text-xs font-semibold text-purple-700 px-2 mb-3">DISCOVER</div>
          <nav className="space-y-1">
            <NavButton 
              view="browse" 
              icon={Compass}
              label="Browse All" 
            />
            <NavButton 
              view="upcoming" 
              icon={CalendarClock}
              label="Upcoming" 
            />
            <NavButton 
              view="live" 
              icon={Radio}
              label="Live Now" 
            />
          </nav>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-purple-700 px-2 mb-3">MY EVENTS</div>
          <nav className="space-y-1">
            <NavButton 
              view="registered" 
              icon={CheckCheck}
              label="Registered" 
            />
            <NavButton 
              view="interested" 
              icon={Heart}
              label="Interested" 
            />
          </nav>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-purple-700 px-2 mb-3">FILTERS</div>
          <div className="space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-9 px-2 hover:bg-purple-500/10 hover:text-purple-700 group"
                >
                  <div className="flex items-center">
                    <Tags className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                    <span className="text-sm">Categories</span>
                  </div>
                  <ChevronsUpDown className="h-4 w-4 opacity-50 group-hover:translate-y-[1px] transition-transform duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
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
                  className="w-full justify-between h-9 px-2 hover:bg-purple-500/10 hover:text-purple-700 group"
                >
                  <div className="flex items-center">
                    <GraduationCap className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                    <span className="text-sm">Institutes</span>
                  </div>
                  <ChevronsUpDown className="h-4 w-4 opacity-50 group-hover:translate-y-[1px] transition-transform duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
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