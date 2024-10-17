import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Menu, Calendar, Users2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50/50">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-4 py-3 lg:px-6 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden hover:bg-purple-500/10" 
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5 text-purple-700" />
              </Button>
              
              <div className="flex items-center gap-3">
                <Tabs 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  className="relative"
                >
                  <TabsList className="bg-purple-500/5 p-1">
                    <div className="flex items-center">
                      <TabsTrigger 
                        value="events" 
                        className="data-[state=active]:bg-purple-500 data-[state=active]:text-white flex items-center gap-2 relative z-10"
                      >
                        <Sparkles className="h-4 w-4" />
                        Events
                      </TabsTrigger>
                      
                      <AnimatePresence>
                        {activeTab === "events" && (
                          <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="ml-2 overflow-hidden"
                          >
                            <div className="relative w-[200px] lg:w-[300px] border-none">
                              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                                <Search className="h-3.5 w-3.5 text-purple-500" />
                              </div>
                              <Input
                                className="w-full h-8 pl-8 pr-4 text-sm rounded-lg border-none focus:border-none"
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <TabsTrigger 
                      value="calendar"
                      className="data-[state=active]:bg-purple-500 data-[state=active]:text-white flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      Calendar
                    </TabsTrigger>
                    <TabsTrigger 
                      value="clubs"
                      className="data-[state=active]:bg-purple-500 data-[state=active]:text-white flex items-center gap-2"
                    >
                      <Users2 className="h-4 w-4" />
                      Clubs
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 lg:px-6 py-4">
        <div className="h-full rounded-lg bg-white/80 backdrop-blur-sm border border-purple-500/10">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default MainContent;