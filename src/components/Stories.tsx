import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Stories = () => {
  const dummyStories = [
    { id: 1, username: "user1", avatar: "/placeholder.svg" },
    { id: 2, username: "user2", avatar: "/placeholder.svg" },
    { id: 3, username: "user3", avatar: "/placeholder.svg" },
  ];

  return (
    <div className="mb-6">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {/* Add Story Button */}
        <Card className="flex-shrink-0 w-20 h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-accent">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-2xl">
            +
          </div>
          <span className="text-xs mt-2">Add Story</span>
        </Card>

        {/* Story List */}
        {dummyStories.map((story) => (
          <Card
            key={story.id}
            className="flex-shrink-0 w-20 h-32 flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-accent"
          >
            <Avatar className="w-14 h-14 ring-2 ring-primary">
              <AvatarImage src={story.avatar} />
              <AvatarFallback>{story.username[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs mt-2 truncate w-full text-center">
              {story.username}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Stories;