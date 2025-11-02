import { motion } from "motion/react";
import { Home, Video, ShoppingBag, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "home", icon: Home, label: "Home" },
  { id: "live", icon: Video, label: "Live" },
  { id: "grocery", icon: ShoppingBag, label: "Grocery" },
  { id: "profile", icon: User, label: "Profile" },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50">
      <div className="flex items-center justify-around px-6 py-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, #FF6A3D 0%, #FF8C6B 100%)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className="relative z-10">
                <tab.icon
                  className="w-6 h-6"
                  style={{
                    color: isActive ? "white" : "#707070",
                    strokeWidth: isActive ? 2.5 : 2,
                  }}
                />
              </div>
              
              <span
                className="text-xs relative z-10"
                style={{
                  color: isActive ? "#FF6A3D" : "#707070",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
