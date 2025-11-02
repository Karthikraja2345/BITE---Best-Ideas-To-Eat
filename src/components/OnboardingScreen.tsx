import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Camera, Users, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const slides = [
  {
    icon: Camera,
    title: "Snap & Cook",
    description: "Take a photo of ingredients and get instant recipe suggestions",
    image: "https://images.unsplash.com/photo-1665088127661-83aeff6104c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwaW5ncmVkaWVudHMlMjBmcmVzaHxlbnwxfHx8fDE3NjIwNjM0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#FF6A3D",
  },
  {
    icon: Users,
    title: "Cook Together",
    description: "Join live cooking sessions with friends and family anywhere",
    image: "https://images.unsplash.com/photo-1629360636524-ac84e22911a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGZvb2QlMjByZWNpcGV8ZW58MXx8fHwxNzYyMDYzNDU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#2A9D8F",
  },
  {
    icon: ShoppingBag,
    title: "Smart Grocery",
    description: "Auto-generate shopping lists and get ingredients delivered",
    image: "https://images.unsplash.com/photo-1627279001674-4c7dbd9edb88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBib3dsfGVufDF8fHx8MTc2MTk3NTI2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#FF6A3D",
  },
];

export function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col"
          >
            <div className="relative h-1/2 overflow-hidden">
              <ImageWithFallback
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 0%, ${slides[currentSlide].color}20 100%)`,
                }}
              />
            </div>

            <div className="flex-1 px-8 py-12 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="rounded-full p-6 mb-6"
                style={{ backgroundColor: `${slides[currentSlide].color}15` }}
              >
                {(() => {
                  const IconComponent = slides[currentSlide].icon;
                  return IconComponent ? (
                    <IconComponent
                      className="w-12 h-12"
                      style={{ color: slides[currentSlide].color }}
                      strokeWidth={2}
                    />
                  ) : null;
                })()}
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#303841] mb-4"
                style={{ fontSize: "2rem", fontWeight: 700 }}
              >
                {slides[currentSlide].title}
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[#707070] max-w-sm"
                style={{ fontSize: "1.1rem" }}
              >
                {slides[currentSlide].description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 space-y-6">
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: currentSlide === index ? "32px" : "8px",
                backgroundColor: currentSlide === index ? "#FF6A3D" : "#E0E0E0",
              }}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={skipOnboarding}
            className="flex-1 h-14 rounded-2xl border-2 text-[#707070]"
          >
            Skip
          </Button>
          <Button
            onClick={nextSlide}
            className="flex-1 h-14 rounded-2xl shadow-lg"
            style={{
              background: "linear-gradient(135deg, #FF6A3D 0%, #FF8C6B 100%)",
            }}
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
