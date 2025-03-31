import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Particles } from "@/components/magicui/particles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { SparklesText } from "@/components/magicui/sparkles-text";




const Landing = () => {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("white");
 
  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "white" : "black");
  }, [resolvedTheme]);
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center">
      
      <motion.nav 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="w-full bg-black/70 shadow-md p-4  space-x-4 fixed top-0 z-50"
      >
        <div className="flex flex-row space-x-2 justify-between">
          <div className="">
            <Button variant="ghost" onClick={() => navigate("/")} className="text-3xl font-bold text-white dark:text-neutral-200">
              Blog
            </Button>
          </div>
          <div className="flex space-x-2 ">
            <Button variant="ghost" onClick={() => navigate("/signup")}>Sign In</Button>
            <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
            <Button variant="ghost" onClick={() => navigate("/home")}>Dashboard</Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex-grow flex flex-col items-center justify-center text-center p-8 mt-16"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-6 pb-4"
        >
         <SparklesText text="Minimalistic" /> Blogging experience
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg max-w-lg mb-6"
        >
          <TypingAnimation>Share your perspective.</TypingAnimation>
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            onClick={() => navigate("/home")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover:scale-105  transition-transform"
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>
      <Particles
        className="absolute inset-0 z-1000"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
};

export default Landing;
