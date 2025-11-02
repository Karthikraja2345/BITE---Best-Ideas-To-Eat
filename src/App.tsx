import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SplashScreen } from "./components/SplashScreen";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { LoginScreen, SignUpScreen } from "./components/AuthScreens";
import { HomeScreen } from "./components/HomeScreen";
import { RecipeDetailScreen } from "./components/RecipeDetailScreen";
import { CameraScreen } from "./components/CameraScreen";
import { LiveCookingScreen } from "./components/LiveCookingScreen";
import { GroceryListScreen } from "./components/GroceryListScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { BottomNavigation } from "./components/BottomNavigation";

type Screen =
  | "splash"
  | "onboarding"
  | "login"
  | "signup"
  | "home"
  | "recipe"
  | "camera"
  | "live"
  | "grocery"
  | "profile";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [activeTab, setActiveTab] = useState("home");
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  const handleSplashComplete = () => {
    setCurrentScreen("onboarding");
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen("login");
  };

  const handleLogin = () => {
    setCurrentScreen("home");
    setActiveTab("home");
  };

  const handleSignUp = () => {
    setCurrentScreen("home");
    setActiveTab("home");
  };

  const handleRecipeClick = (id: number) => {
    setSelectedRecipeId(id);
    setCurrentScreen("recipe");
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") setCurrentScreen("home");
    else if (tab === "live") setCurrentScreen("live");
    else if (tab === "grocery") setCurrentScreen("grocery");
    else if (tab === "profile") setCurrentScreen("profile");
  };

  const handleBackToHome = () => {
    setCurrentScreen("home");
    setActiveTab("home");
  };

  const handleCameraConfirm = () => {
    // After confirming ingredients, navigate back to home
    setCurrentScreen("home");
    setActiveTab("home");
  };

  const handleLogout = () => {
    setCurrentScreen("login");
    setActiveTab("home");
  };

  const showBottomNav = ["home", "live", "grocery", "profile"].includes(currentScreen);

  return (
    <div className="relative max-w-md mx-auto bg-white min-h-screen">
      <AnimatePresence mode="wait">
        {currentScreen === "splash" && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SplashScreen onComplete={handleSplashComplete} />
          </motion.div>
        )}

        {currentScreen === "onboarding" && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <OnboardingScreen onComplete={handleOnboardingComplete} />
          </motion.div>
        )}

        {currentScreen === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <LoginScreen
              onLogin={handleLogin}
              onSwitchToSignup={() => setCurrentScreen("signup")}
              onBack={() => setCurrentScreen("onboarding")}
            />
          </motion.div>
        )}

        {currentScreen === "signup" && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <SignUpScreen
              onSignUp={handleSignUp}
              onSwitchToLogin={() => setCurrentScreen("login")}
              onBack={() => setCurrentScreen("login")}
            />
          </motion.div>
        )}

        {currentScreen === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HomeScreen onRecipeClick={handleRecipeClick} onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentScreen === "recipe" && (
          <motion.div
            key="recipe"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <RecipeDetailScreen onBack={handleBackToHome} />
          </motion.div>
        )}

        {currentScreen === "camera" && (
          <motion.div
            key="camera"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <CameraScreen onBack={handleBackToHome} onConfirm={handleCameraConfirm} />
          </motion.div>
        )}

        {currentScreen === "live" && (
          <motion.div
            key="live"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LiveCookingScreen onBack={handleBackToHome} />
          </motion.div>
        )}

        {currentScreen === "grocery" && (
          <motion.div
            key="grocery"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <GroceryListScreen onBack={handleBackToHome} />
          </motion.div>
        )}

        {currentScreen === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <ProfileScreen onBack={handleBackToHome} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <AnimatePresence>
        {showBottomNav && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
