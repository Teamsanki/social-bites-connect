import { Card } from "./ui/card";
import { Heart, MessageCircle, Share } from "lucide-react";

const ShortVideos = () => {
  const dummyShorts = [
    {
      id: 1,
      username: "user1",
      videoUrl: "/placeholder.svg",
      caption: "Check out this cool video! #shorts",
      likes: 1200,
      comments: 45,
    },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] overflow-y-auto snap-y snap-mandatory">
      {dummyShorts.map((short) => (
        <Card
          key={short.id}
          className="h-full snap-start relative flex items-center justify-center bg-black mb-4"
        >
          <img
            src={short.videoUrl}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
            <p className="font-semibold">{short.username}</p>
            <p className="text-sm">{short.caption}</p>
            <div className="flex gap-4 mt-4">
              <button className="flex flex-col items-center">
                <Heart className="w-6 h-6" />
                <span className="text-xs">{short.likes}</span>
              </button>
              <button className="flex flex-col items-center">
                <MessageCircle className="w-6 h-6" />
                <span className="text-xs">{short.comments}</span>
              </button>
              <button className="flex flex-col items-center">
                <Share className="w-6 h-6" />
                <span className="text-xs">Share</span>
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ShortVideos;