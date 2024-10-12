import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const Conversations = () => {
  // Mock data - in a real application, this would come from a backend or state management
  const conversations = [
    { id: 1, name: "John Doe", avatar: "/api/placeholder/32/32", lastMessage: "See you at the conference!", time: "5m ago", unread: 2, online: true },
    { id: 2, name: "Alice Smith", avatar: "/api/placeholder/32/32", lastMessage: "Thanks for the information!", time: "1h ago", unread: 0, online: false },
    { id: 3, name: "Event Support", avatar: "/api/placeholder/32/32", lastMessage: "How can we assist you today?", time: "3h ago", unread: 1, online: true },
    { id: 4, name: "Bob Johnson", avatar: "/api/placeholder/32/32", lastMessage: "Looking forward to your presentation!", time: "1d ago", unread: 0, online: false },
    { id: 5, name: "Emma Wilson", avatar: "/api/placeholder/32/32", lastMessage: "Can you share the schedule?", time: "2d ago", unread: 3, online: true },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Conversations</h1>
      
      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] p-4">
            {conversations.map((convo) => (
              <div key={convo.id} className="flex items-center space-x-4 py-4 hover:bg-gray-100 rounded-lg px-2 cursor-pointer">
                <Avatar>
                  <AvatarImage src={convo.avatar} alt={convo.name} />
                  <AvatarFallback>{convo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h2 className="text-sm font-semibold truncate">{convo.name}</h2>
                    <span className="text-xs text-gray-500">{convo.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  {convo.unread > 0 && (
                    <Badge variant="destructive" className="rounded-full px-2 py-0.5">
                      {convo.unread}
                    </Badge>
                  )}
                  {convo.online && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Conversations;