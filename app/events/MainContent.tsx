import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Home, Menu } from "lucide-react";
import Link from "next/link";

interface MainContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  toggleSidebar: () => void;
  renderTabContent: () => React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  toggleSidebar,
  renderTabContent
}) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 lg:hidden" onClick={toggleSidebar}>
              <Menu className="h-6 w-6" />
            </Button>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="clubs">Clubs</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 lg:flex-none">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                className="pl-8 w-full"
                type="text"
                placeholder="Search events"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link href={'/'}>
              <Button>
                <Home className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MainContent;