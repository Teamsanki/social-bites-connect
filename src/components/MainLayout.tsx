import { useState } from "react";
import { MessageCircle, Image, Video, User, PhoneCall } from "lucide-react";
import Stories from "./Stories";
import Posts from "./Posts";
import ShortVideos from "./ShortVideos";
import Chat from "./Chat";
import Profile from "./Profile";

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState<string>("posts");

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-card border-b p-4">
        <h1 className="text-2xl font-bold text-center text-primary">Social Bites</h1>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === "stories" && <Stories />}
        {activeTab === "posts" && <Posts />}
        {activeTab === "shorts" && <ShortVideos />}
        {activeTab === "chat" && <Chat />}
        {activeTab === "profile" && <Profile />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            <button
              onClick={() => setActiveTab("posts")}
              className={`p-2 rounded-full ${
                activeTab === "posts" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Image className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveTab("shorts")}
              className={`p-2 rounded-full ${
                activeTab === "shorts" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Video className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`p-2 rounded-full ${
                activeTab === "chat" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`p-2 rounded-full ${
                activeTab === "profile" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;