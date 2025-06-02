"use client"
import {motion, AnimatePresence} from "motion/react"
import { Wallet, Plus, Users, ArrowRight, Sparkles, X } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Index = () => {

  const router = useRouter();
  const [joinProp,setJoinProp] = useState<boolean>(false);
  const [roomId,setRoomId] = useState<string>("");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 400
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      router.push(`/room/${roomId}`);
    }
  };

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Token-Gated Rooms",
      description: "Create exclusive meeting rooms that require specific tokens or NFTs for access. Control who can join your conversations."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI-Powered Creation",
      description: "Generate meeting rooms and distribute tokens using simple prompts. Let AI handle the complex blockchain interactions."
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Decentralized & Secure",
      description: "Built on blockchain technology ensuring privacy, security, and true ownership of your digital meetings."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 bg-blue-400/10 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-40 h-40 bg-slate-500/10 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header 
          className="flex justify-between items-center mb-16"
          variants={itemVariants}
        >
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            MeetAI Token Rooms
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ConnectButton/>
          </motion.div>
        </motion.header>
        
        <motion.section 
          className="text-center mb-20"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            The Future of
            <br />
            Decentralized Meetings
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Create token-gated video rooms, distribute rewards with AI, and build exclusive communities. 
            Experience the next generation of decentralized communication.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex justify-center items-center px-6 rounded-md" onClick={() => router.push("/create-room")}>
                <Plus className="w-5 h-5 mr-2" />
                Create Room
              </button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button 
                className="border-1 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white py-3 text-lg transition-all duration-300 shadow-lg hover:shadow-xl group bg-transparent flex items-center justify-center px-6 rounded-md"
                onClick={() => setJoinProp(true)}
              >
                <Users className="w-5 h-5 mr-2" />
                Join Room
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Powered by Web3 & AI
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <div className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 h-full">
                  <div className="p-6 text-center flex flex-col h-full">
                    <motion.div 
                      className="text-blue-400 mb-4 flex justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed flex-grow">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="text-center mb-20"
          variants={itemVariants}
        >
          <motion.div 
            className="bg-gradient-to-r from-slate-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Create with AI Prompts
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              &quot Create a room for NFT holders with 100 token rewards &ldquo - and watch AI do the magic
            </p>
            <motion.div 
              className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm text-blue-400 border border-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div>&gt; Creating room with token gate: BAYC holders only</div>
              <div>&gt; Setting reward pool: 100 MEET tokens</div>
              <div>&gt; Room generated: meet.ai/room/bayc-exclusive</div>
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>

      <motion.footer 
        className="relative z-10 border-t border-slate-800 mt-20 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2025 MeetAI Token Rooms. Decentralized. Secure. Intelligent.</p>
        </div>
      </motion.footer>

      {/* Join Room Modal */}
      <AnimatePresence>
        {joinProp && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setJoinProp(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Modal Content */}
            <motion.div
              className="relative bg-gradient-to-br from-slate-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full mx-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                onClick={() => setJoinProp(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Modal Header */}
              <div className="p-6 pb-4">
                <motion.div
                  className="flex items-center justify-center mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                </motion.div>
                
                <motion.h3
                  className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Join Meeting Room
                </motion.h3>
                
                <motion.p
                  className="text-gray-300 text-center mt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Enter the room ID to join an exclusive meeting
                </motion.p>
              </div>

              {/* Modal Body */}
              <div className="px-6 pb-6">
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div>
                    <label htmlFor="roomId" className="block text-sm font-medium text-gray-300 mb-2">
                      Room ID
                    </label>
                    <input
                      id="roomId"
                      type="text"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      placeholder="Enter room ID (e.g., bayc-exclusive)"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <motion.button
                      className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 font-medium"
                      onClick={() => setJoinProp(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    
                    <motion.button
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      onClick={handleJoinRoom}
                      disabled={!roomId.trim()}
                      whileHover={{ scale: roomId.trim() ? 1.02 : 1 }}
                      whileTap={{ scale: roomId.trim() ? 0.98 : 1 }}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Join Room
                    </motion.button>
                  </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-1 -right-1 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;