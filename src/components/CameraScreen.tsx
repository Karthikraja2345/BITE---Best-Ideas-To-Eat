import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Camera, RotateCw, X, Check, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const detectedIngredients = [
  { name: "Tomatoes", confidence: 98, color: "#FF6A3D" },
  { name: "Basil", confidence: 95, color: "#2A9D8F" },
  { name: "Garlic", confidence: 92, color: "#FF8C6B" },
  { name: "Onion", confidence: 88, color: "#FFB4A0" },
  { name: "Olive Oil", confidence: 85, color: "#3DBAA9" },
];

export function CameraScreen({ onBack, onConfirm }: { onBack: () => void; onConfirm: () => void }) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setShowResults(true);
    }, 1500);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden">
      {/* Camera View Simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        {/* Grid Overlay */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border border-white/20" />
          ))}
        </div>

        {/* Scanning Effect */}
        {isCapturing && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "100vh" }}
            transition={{ duration: 1.5, ease: "linear" }}
            className="absolute inset-x-0 h-1"
            style={{
              background: "linear-gradient(to bottom, transparent, #FF6A3D, transparent)",
              boxShadow: "0 0 20px #FF6A3D",
            }}
          />
        )}
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </motion.button>
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur px-4 py-2 rounded-full">
          <Sparkles className="w-4 h-4 text-[#FF6A3D]" />
          <span className="text-white" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
            AI Scanner
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center"
        >
          <RotateCw className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Instructions */}
      {!showResults && !isCapturing && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-24 left-6 right-6 bg-black/50 backdrop-blur p-4 rounded-2xl z-10"
        >
          <p className="text-white text-center" style={{ fontSize: "0.9rem" }}>
            Place ingredients in the frame and tap capture
          </p>
        </motion.div>
      )}

      {/* Ingredient Detection Bubbles */}
      <AnimatePresence>
        {showResults && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {detectedIngredients.map((ingredient, index) => (
              <motion.div
                key={ingredient.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: [0, Math.random() * 20 - 10],
                  y: [0, Math.random() * 20 - 10],
                }}
                transition={{
                  delay: index * 0.1,
                  scale: { type: "spring", stiffness: 200 },
                  x: { repeat: Infinity, duration: 3, repeatType: "reverse" },
                  y: { repeat: Infinity, duration: 2, repeatType: "reverse" },
                }}
                className="absolute backdrop-blur rounded-full px-4 py-2 flex items-center gap-2 shadow-lg"
                style={{
                  backgroundColor: `${ingredient.color}20`,
                  border: `2px solid ${ingredient.color}`,
                  left: `${15 + index * 15}%`,
                  top: `${20 + (index % 3) * 20}%`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: ingredient.color }}
                />
                <span className="text-white" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                  {ingredient.name}
                </span>
                <span className="text-white/70" style={{ fontSize: "0.75rem" }}>
                  {ingredient.confidence}%
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Processing Message */}
      {isCapturing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="bg-black/70 backdrop-blur px-8 py-4 rounded-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 mx-auto mb-3"
            >
              <Sparkles className="w-12 h-12 text-[#FF6A3D]" />
            </motion.div>
            <p className="text-white text-center" style={{ fontWeight: 600 }}>
              Analyzing ingredients...
            </p>
          </div>
        </motion.div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        {!showResults ? (
          <div className="flex justify-center items-center gap-8">
            <div className="w-16" /> {/* Spacer */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCapture}
              disabled={isCapturing}
              className="relative"
            >
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl">
                <motion.div
                  animate={isCapturing ? { scale: [1, 0.8, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isCapturing ? Infinity : 0 }}
                  className="w-16 h-16 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #FF6A3D 0%, #FF8C6B 100%)",
                  }}
                />
              </div>
              {!isCapturing && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-4 border-white/30"
                />
              )}
            </motion.button>
            <div className="w-16" /> {/* Spacer */}
          </div>
        ) : (
          <div className="flex gap-4">
            <Button
              onClick={() => setShowResults(false)}
              variant="outline"
              className="flex-1 h-14 rounded-2xl bg-black/50 backdrop-blur border-2 border-white/50 text-white hover:bg-black/70"
            >
              <X className="w-5 h-5 mr-2" />
              Retake
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 h-14 rounded-2xl shadow-lg"
              style={{
                background: "linear-gradient(135deg, #2A9D8F 0%, #3DBAA9 100%)",
              }}
            >
              <Check className="w-5 h-5 mr-2" />
              Confirm
            </Button>
          </div>
        )}
      </div>

      {/* Detected Count Badge */}
      {showResults && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute top-32 right-6 bg-[#2A9D8F] text-white px-4 py-2 rounded-full shadow-lg z-20"
        >
          <p style={{ fontSize: "0.9rem", fontWeight: 600 }}>
            {detectedIngredients.length} ingredients detected
          </p>
        </motion.div>
      )}
    </div>
  );
}
