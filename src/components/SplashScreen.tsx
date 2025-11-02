import { motion } from "motion/react";
import { Utensils } from "lucide-react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FF6A3D 0%, #FF8C6B 50%, #FFB4A0 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onAnimationComplete={() => setTimeout(onComplete, 1500)}
      >
        <motion.div
          className="relative"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="bg-white rounded-full p-8 shadow-2xl">
            <Utensils className="w-20 h-20 text-[#FF6A3D]" strokeWidth={2.5} />
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <h1 className="text-white text-5xl tracking-wider" style={{ fontWeight: 700 }}>BITE</h1>
          <p className="text-white/90 mt-2 tracking-wide">Best Ideas To Eat</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
