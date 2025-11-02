import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Edit2, Settings, Bell, Heart, BookOpen, Award, LogOut, ChevronRight } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const menuItems = [
  { icon: Settings, label: "Account Settings", color: "#FF6A3D" },
  { icon: Bell, label: "Notifications", color: "#2A9D8F", hasToggle: true },
  { icon: Heart, label: "Saved Recipes", color: "#FF8C6B", badge: "24" },
  { icon: BookOpen, label: "My Recipes", color: "#FFB4A0", badge: "12" },
  { icon: Award, label: "Achievements", color: "#3DBAA9" },
];

const stats = [
  { label: "Recipes", value: "42", color: "#FF6A3D" },
  { label: "Followers", value: "1.2K", color: "#2A9D8F" },
  { label: "Following", value: "856", color: "#FF8C6B" },
];

export function ProfileScreen({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-[#FF6A3D] to-[#FF8C6B] pt-12 pb-24 px-6 rounded-b-[3rem]">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="mb-6 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </motion.button>

        {/* Profile Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
              <ImageWithFallback
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </Avatar>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <Edit2 className="w-4 h-4 text-[#FF6A3D]" />
            </motion.button>
            {/* Gradient ring effect */}
            <div
              className="absolute inset-0 rounded-full -z-10"
              style={{
                padding: "3px",
                background: "linear-gradient(135deg, #FFB4A0, #FFEDE7)",
                transform: "scale(1.1)",
              }}
            />
          </div>

          <div className="flex-1">
            <h1 className="text-white mb-1" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
              John Doe
            </h1>
            <p className="text-white/90 mb-2" style={{ fontSize: "0.95rem" }}>
              @johndoe_chef
            </p>
            {isSubscribed && (
              <Badge className="bg-white/20 text-white border-0 backdrop-blur">
                ⭐ Premium Member
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center"
            >
              <p className="text-white mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {stat.value}
              </p>
              <p className="text-white/90" style={{ fontSize: "0.85rem" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 -mt-8 space-y-3">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full p-5 flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>

              <div className="flex-1 text-left">
                <p className="text-[#303841]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  {item.label}
                </p>
              </div>

              {item.badge && (
                <Badge
                  className="border-0"
                  style={{ backgroundColor: item.color, color: "white" }}
                >
                  {item.badge}
                </Badge>
              )}

              {item.hasToggle ? (
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              ) : (
                <ChevronRight className="w-5 h-5 text-[#707070]" />
              )}
            </motion.button>
          </motion.div>
        ))}

        {/* Subscription Card */}
        {isSubscribed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl p-6 shadow-sm"
            style={{
              background: "linear-gradient(135deg, #2A9D8F 0%, #3DBAA9 100%)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white mb-1" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  Premium Plan
                </h3>
                <p className="text-white/90" style={{ fontSize: "0.9rem" }}>
                  Active until Dec 2025
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 bg-white/20 backdrop-blur rounded-xl px-3 py-2 text-center">
                <p className="text-white" style={{ fontSize: "0.75rem" }}>Unlimited Recipes</p>
              </div>
              <div className="flex-1 bg-white/20 backdrop-blur rounded-xl px-3 py-2 text-center">
                <p className="text-white" style={{ fontSize: "0.75rem" }}>Live Sessions</p>
              </div>
              <div className="flex-1 bg-white/20 backdrop-blur rounded-xl px-3 py-2 text-center">
                <p className="text-white" style={{ fontSize: "0.75rem" }}>AI Features</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Preferences Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-sm p-6 space-y-4"
        >
          <h3 className="text-[#303841]" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
            Preferences
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#303841]" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                  Voice Commands
                </p>
                <p className="text-[#707070]" style={{ fontSize: "0.85rem" }}>
                  Control app with voice
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#303841]" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                  Dark Mode
                </p>
                <p className="text-[#707070]" style={{ fontSize: "0.85rem" }}>
                  Switch to dark theme
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#303841]" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                  Auto-play Videos
                </p>
                <p className="text-[#707070]" style={{ fontSize: "0.85rem" }}>
                  Start videos automatically
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full bg-white rounded-2xl shadow-sm p-5 flex items-center justify-center gap-3"
        >
          <LogOut className="w-5 h-5 text-[#d4183d]" />
          <span className="text-[#d4183d]" style={{ fontSize: "1rem", fontWeight: 600 }}>
            Logout
          </span>
        </motion.button>
      </div>
    </div>
  );
}
