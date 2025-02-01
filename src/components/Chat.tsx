import { useState } from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PhoneCall } from "lucide-react";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const dummyChats = [
    {
      id: 1,
      username: "user1",
      avatar: "/placeholder.svg",
      lastMessage: "Hey, how are you?",
      time: "2m ago",
    },
    {
      id: 2,
      username: "user2",
      avatar: "/placeholder.svg",
      lastMessage: "Let's catch up soon!",
      time: "1h ago",
    },
  ];

  return (
    <div className="space-y-4">
      {dummyChats.map((chat) => (
        <Card
          key={chat.id}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent"
          onClick={() => setSelectedChat(chat.id)}
        >
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={chat.avatar} />
              <AvatarFallback>{chat.username[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{chat.username}</p>
              <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">{chat.time}</span>
            <button className="p-2 rounded-full hover:bg-primary hover:text-white">
              <PhoneCall className="w-4 h-4" />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Chat;