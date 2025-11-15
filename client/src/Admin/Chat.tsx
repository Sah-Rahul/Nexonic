import { useState, useEffect, useRef } from "react";
import Layout from "./Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  Circle,
} from "lucide-react";

// Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isAdmin: boolean;
}

// Sample users data
const usersData: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Hi, I have a question about my order",
    lastMessageTime: "2 min ago",
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Thank you for the help!",
    lastMessageTime: "10 min ago",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "When will my product arrive?",
    lastMessageTime: "1 hour ago",
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "Can I get a refund?",
    lastMessageTime: "2 hours ago",
    unreadCount: 2,
    isOnline: false,
  },
];

// Sample messages data
const messagesData: { [key: string]: Message[] } = {
  "1": [
    {
      id: "m1",
      senderId: "1",
      text: "Hi, I have a question about my order #12345",
      timestamp: "10:30 AM",
      isAdmin: false,
    },
    {
      id: "m2",
      senderId: "admin",
      text: "Hello! I'd be happy to help. What would you like to know?",
      timestamp: "10:31 AM",
      isAdmin: true,
    },
    {
      id: "m3",
      senderId: "1",
      text: "When will it be delivered?",
      timestamp: "10:32 AM",
      isAdmin: false,
    },
    {
      id: "m4",
      senderId: "admin",
      text: "Let me check that for you. Your order is currently in transit and should arrive within 2-3 business days.",
      timestamp: "10:33 AM",
      isAdmin: true,
    },
  ],
  "2": [
    {
      id: "m5",
      senderId: "2",
      text: "Thank you for the help!",
      timestamp: "09:45 AM",
      isAdmin: false,
    },
    {
      id: "m6",
      senderId: "admin",
      text: "You're welcome! Let me know if you need anything else.",
      timestamp: "09:46 AM",
      isAdmin: true,
    },
  ],
};

const Chat = () => {
  const [users] = useState<User[]>(usersData);
  const [selectedUser, setSelectedUser] = useState<User | null>(users[0]);
  const [messages, setMessages] = useState<Message[]>(messagesData["1"] || []);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setMessages(messagesData[user.id] || []);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const message: Message = {
      id: `m${Date.now()}`,
      senderId: "admin",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isAdmin: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = users.reduce((sum, user) => sum + user.unreadCount, 0);

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Customer Support Chat</h1>
            <p className="text-muted-foreground">
              Live chat with customers
            </p>
          </div>
          <Badge variant="secondary" className="text-lg">
            {totalUnread} unread
          </Badge>
        </div>

        {/* Chat Interface */}
        <Card className="h-[calc(100vh-280px)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
            {/* Users List Sidebar */}
            <div className="border-r flex flex-col h-full overflow-hidden">
              <CardHeader className="pb-3 flex-shrink-0">
                <CardTitle className="text-lg">Messages</CardTitle>
                <div className="relative mt-2">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </CardHeader>
              <ScrollArea className="flex-1">
                <div className="space-y-1 p-2">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleUserSelect(user)}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg cursor-pointer
                        transition-colors hover:bg-muted
                        ${selectedUser?.id === user.id ? "bg-muted" : ""}
                      `}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {user.isOnline && (
                          <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium truncate">
                            {user.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {user.lastMessageTime}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground truncate">
                            {user.lastMessage}
                          </div>
                          {user.unreadCount > 0 && (
                            <Badge
                              variant="destructive"
                              className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                            >
                              {user.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2 flex flex-col h-full overflow-hidden">
              {selectedUser ? (
                <>
                  {/* Chat Header */}
                  <CardHeader className="border-b flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage
                              src={selectedUser.avatar}
                              alt={selectedUser.name}
                            />
                            <AvatarFallback>
                              {selectedUser.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {selectedUser.isOnline && (
                            <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold">
                            {selectedUser.name}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            {selectedUser.isOnline ? (
                              <>
                                <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                                Online
                              </>
                            ) : (
                              "Offline"
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Info className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages Area */}
                  <ScrollArea className="flex-1 p-4 min-h-0">
                    <div className="space-y-4 pb-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.isAdmin ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`
                              max-w-[70%] rounded-lg px-4 py-2
                              ${
                                message.isAdmin
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }
                            `}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.isAdmin
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="border-t p-4 bg-background flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground">
                    <p>Select a conversation to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Chat;