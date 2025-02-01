import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-primary to-accent flex items-center justify-center"
      animate={{ opacity: isAnimating ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center"
      >
        <motion.div
          className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </motion.svg>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-white mb-2"
          animate={{ y: [50, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Social Bites
        </motion.h1>
        <motion.p
          className="text-white/80"
          animate={{ y: [20, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Connect & Share
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;