import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Mic, MicOff, Video, VideoOff, Users, MessageCircle, X, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const participants = [
  { id: 1, name: "You", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You", isHost: true },
  { id: 2, name: "Sarah", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", isHost: false },
  { id: 3, name: "Mike", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", isHost: false },
  { id: 4, name: "Emma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", isHost: false },
];

const chatMessages = [
  { id: 1, user: "Sarah", message: "This looks amazing!", time: "2m ago" },
  { id: 2, user: "Mike", message: "What temperature should the oven be?", time: "1m ago" },
  { id: 3, user: "Emma", message: "Can't wait to try this! 🍳", time: "30s ago" },
];

export function LiveCookingScreen({ onBack }: { onBack: () => void }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [timer, setTimer] = useState(1245); // seconds
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen w-full bg-[#1a1a1a] relative overflow-hidden">
      {/* Main Video Grid */}
      <div className="h-full grid grid-rows-2 gap-2 p-2">
        {/* Host Video (You) - Larger */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF6A3D] to-[#FF8C6B] flex items-center justify-center">
                <span className="text-white" style={{ fontSize: "2rem", fontWeight: 700 }}>Y</span>
              </div>
              <p className="text-white" style={{ fontWeight: 600 }}>You (Host)</p>
              {isVideoOff && (
                <p className="text-white/60 mt-1" style={{ fontSize: "0.85rem" }}>Camera Off</p>
              )}
            </div>
          </div>
          
          {/* Host Badge */}
          <div className="absolute top-4 left-4 bg-[#FF6A3D] px-3 py-1 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white" style={{ fontSize: "0.8rem", fontWeight: 600 }}>LIVE</span>
          </div>

          {/* Timer */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-4 py-2 rounded-full">
            <p className="text-white" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
              {formatTime(timer)}
            </p>
          </div>
        </div>

        {/* Other Participants - Grid */}
        <div className="grid grid-cols-3 gap-2">
          {participants.slice(1).map((participant, index) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-2 border-2 border-[#2A9D8F]">
                    <ImageWithFallback
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  <p className="text-white" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                    {participant.name}
                  </p>
                </div>
              </div>

              {/* Active Speaker Border */}
              {index === 0 && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 border-4 border-[#2A9D8F] rounded-2xl pointer-events-none"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top Header */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </motion.button>

        <div className="bg-black/50 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2">
          <Users className="w-4 h-4 text-white" />
          <span className="text-white" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
            {participants.length} Cooking
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowChat(!showChat)}
          className="relative w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6A3D] rounded-full flex items-center justify-center">
            <span className="text-white" style={{ fontSize: "0.7rem", fontWeight: 600 }}>3</span>
          </div>
        </motion.button>
      </div>

      {/* Chat Overlay */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute top-0 right-0 bottom-0 w-80 bg-black/90 backdrop-blur-xl z-30 flex flex-col"
          >
            {/* Chat Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-white" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                Chat
              </h3>
              <button onClick={() => setShowChat(false)}>
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <ImageWithFallback
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`}
                        alt={msg.user}
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                    <span className="text-white" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      {msg.user}
                    </span>
                    <span className="text-white/50" style={{ fontSize: "0.7rem" }}>
                      {msg.time}
                    </span>
                  </div>
                  <p className="text-white/90 ml-8" style={{ fontSize: "0.9rem" }}>
                    {msg.message}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl"
                />
                <Button
                  className="w-12 h-12 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, #FF6A3D 0%, #FF8C6B 100%)",
                  }}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-6 right-6 z-20">
        <div className="bg-black/70 backdrop-blur-xl rounded-3xl p-4 flex justify-center items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMuted(!isMuted)}
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors"
            style={{
              backgroundColor: isMuted ? "#d4183d" : "rgba(255, 255, 255, 0.1)",
            }}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsVideoOff(!isVideoOff)}
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors"
            style={{
              backgroundColor: isVideoOff ? "#d4183d" : "rgba(255, 255, 255, 0.1)",
            }}
          >
            {isVideoOff ? (
              <VideoOff className="w-6 h-6 text-white" />
            ) : (
              <Video className="w-6 h-6 text-white" />
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#d4183d]"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
