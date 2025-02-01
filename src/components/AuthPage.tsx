import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";

interface AuthPageProps {
  onAuth: (username: string, name: string) => void;
}

const AuthPage = ({ onAuth }: AuthPageProps) => {
  // Signup state
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  
  // Login state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupUsername || !signupEmail || !signupPassword || !signupName) {
      setError("Please fill in all fields");
      return;
    }
    // Will integrate Firebase auth later
    onAuth(signupUsername, signupName);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      setError("Please fill in all fields");
      return;
    }
    // Will integrate Firebase auth later
    onAuth(loginUsername, loginUsername);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4"
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Social Bites
        </h2>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Create Account</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Username"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default AuthPage;