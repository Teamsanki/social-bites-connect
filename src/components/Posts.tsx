import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, MessageCircle, Share } from "lucide-react";

const Posts = () => {
  const dummyPosts = [
    {
      id: 1,
      username: "user1",
      avatar: "/placeholder.svg",
      image: "/placeholder.svg",
      caption: "Beautiful day! #socialbites",
      likes: 120,
      comments: 15,
    },
    {
      id: 2,
      username: "user2",
      avatar: "/placeholder.svg",
      image: "/placeholder.svg",
      caption: "Amazing food at this place",
      likes: 89,
      comments: 8,
    },
  ];

  return (
    <div className="space-y-6">
      {dummyPosts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src={post.avatar} />
              <AvatarFallback>{post.username[0]}</AvatarFallback>
            </Avatar>
            <span className="font-semibold">{post.username}</span>
          </CardHeader>
          <CardContent className="p-0">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-[400px] object-cover"
            />
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <div className="flex gap-4">
              <button className="hover:text-primary">
                <Heart className="w-6 h-6" />
              </button>
              <button className="hover:text-primary">
                <MessageCircle className="w-6 h-6" />
              </button>
              <button className="hover:text-primary">
                <Share className="w-6 h-6" />
              </button>
            </div>
            <div>
              <p className="font-semibold">{post.likes} likes</p>
              <p>
                <span className="font-semibold">{post.username}</span>{" "}
                {post.caption}
              </p>
              <p className="text-muted-foreground text-sm">
                View all {post.comments} comments
              </p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Posts;