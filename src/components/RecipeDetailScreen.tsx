import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Users, Heart, Share2, ShoppingBag, Play, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const recipeDetails = {
  title: "Creamy Pasta Delight",
  image: "https://images.unsplash.com/photo-1711539137930-3fa2ae6cec60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzYyMDYzNDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  author: "Chef Maria",
  authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  time: "30 min",
  servings: 4,
  difficulty: "Easy",
  likes: 456,
  isLiked: false,
  description: "A creamy and delicious pasta dish that's perfect for any occasion. Rich flavors combined with fresh ingredients make this a family favorite.",
  ingredients: [
    { name: "Pasta (penne or fusilli)", amount: "400g", checked: false },
    { name: "Heavy cream", amount: "1 cup", checked: false },
    { name: "Parmesan cheese", amount: "1 cup grated", checked: false },
    { name: "Garlic cloves", amount: "4 cloves minced", checked: false },
    { name: "Olive oil", amount: "2 tbsp", checked: false },
    { name: "Fresh basil", amount: "1/4 cup chopped", checked: false },
    { name: "Salt and pepper", amount: "to taste", checked: false },
    { name: "Cherry tomatoes", amount: "1 cup halved", checked: false },
  ],
  steps: [
    { step: 1, instruction: "Bring a large pot of salted water to boil and cook pasta according to package directions.", completed: false },
    { step: 2, instruction: "While pasta cooks, heat olive oil in a large skillet over medium heat. Add minced garlic and sauté until fragrant.", completed: false },
    { step: 3, instruction: "Add cherry tomatoes to the skillet and cook for 3-4 minutes until they start to soften.", completed: false },
    { step: 4, instruction: "Pour in the heavy cream and bring to a gentle simmer. Cook for 2-3 minutes.", completed: false },
    { step: 5, instruction: "Add the grated Parmesan cheese and stir until melted and smooth. Season with salt and pepper.", completed: false },
    { step: 6, instruction: "Drain the cooked pasta and add it to the sauce. Toss well to coat.", completed: false },
    { step: 7, instruction: "Garnish with fresh basil and extra Parmesan. Serve immediately and enjoy!", completed: false },
  ],
};

export function RecipeDetailScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"ingredients" | "steps">("ingredients");
  const [ingredients, setIngredients] = useState(recipeDetails.ingredients);
  const [steps, setSteps] = useState(recipeDetails.steps);
  const [isLiked, setIsLiked] = useState(recipeDetails.isLiked);

  const toggleIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index].checked = !newIngredients[index].checked;
    setIngredients(newIngredients);
  };

  const toggleStep = (index: number) => {
    const newSteps = [...steps];
    newSteps[index].completed = !newSteps[index].completed;
    setSteps(newSteps);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-80">
        <ImageWithFallback
          src={recipeDetails.image}
          alt={recipeDetails.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Header Buttons */}
        <div className="absolute top-6 left-6 right-6 flex justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-[#303841]" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center"
          >
            <Share2 className="w-5 h-5 text-[#303841]" />
          </motion.button>
        </div>

        {/* Video Play Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
          style={{
            background: "linear-gradient(135deg, #FF6A3D 0%, #FF8C6B 100%)",
          }}
        >
          <Play className="w-7 h-7 text-white ml-1" fill="white" />
        </motion.button>

        {/* Title & Author */}
        <div className="absolute bottom-6 left-6 right-24">
          <h1 className="text-white mb-3" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
            {recipeDetails.title}
          </h1>
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-white">
              <ImageWithFallback
                src={recipeDetails.authorImage}
                alt={recipeDetails.author}
                className="w-full h-full object-cover"
              />
            </Avatar>
            <div>
              <p className="text-white" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                {recipeDetails.author}
              </p>
              <p className="text-white/80" style={{ fontSize: "0.75rem" }}>
                Professional Chef
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white mx-4 -mt-6 rounded-3xl shadow-lg p-4 relative z-10">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          <div className="text-center">
            <Clock className="w-5 h-5 mx-auto mb-1 text-[#FF6A3D]" />
            <p className="text-[#303841]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
              {recipeDetails.time}
            </p>
            <p className="text-[#707070]" style={{ fontSize: "0.75rem" }}>Time</p>
          </div>
          <div className="text-center">
            <Users className="w-5 h-5 mx-auto mb-1 text-[#2A9D8F]" />
            <p className="text-[#303841]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
              {recipeDetails.servings} servings
            </p>
            <p className="text-[#707070]" style={{ fontSize: "0.75rem" }}>Servings</p>
          </div>
          <div className="text-center">
            <Badge className="mx-auto mb-1 bg-[#FFEDE7] text-[#FF6A3D] border-0">
              {recipeDetails.difficulty}
            </Badge>
            <p className="text-[#707070]" style={{ fontSize: "0.75rem" }}>Difficulty</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-4">
        <p className="text-[#707070]" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
          {recipeDetails.description}
        </p>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-4">
        <div className="flex gap-2 bg-white p-2 rounded-2xl">
          <button
            onClick={() => setActiveTab("ingredients")}
            className="flex-1 py-3 rounded-xl transition-all duration-300"
            style={{
              background: activeTab === "ingredients"
                ? "linear-gradient(135deg, #FF6A3D 0%, #FF8C6B 100%)"
                : "transparent",
              color: activeTab === "ingredients" ? "white" : "#707070",
              fontWeight: activeTab === "ingredients" ? 600 : 400,
            }}
          >
            Ingredients
          </button>
          <button
            onClick={() => setActiveTab("steps")}
            className="flex-1 py-3 rounded-xl transition-all duration-300"
            style={{
              background: activeTab === "steps"
                ? "linear-gradient(135deg, #FF6A3D 0%, #FF8C6B 100%)"
                : "transparent",
              color: activeTab === "steps" ? "white" : "#707070",
              fontWeight: activeTab === "steps" ? 600 : 400,
            }}
          >
            Instructions
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6">
        {activeTab === "ingredients" ? (
          <div className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleIngredient(index)}
                className="bg-white p-4 rounded-2xl flex items-center gap-4 cursor-pointer shadow-sm"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: ingredient.checked
                      ? "linear-gradient(135deg, #2A9D8F 0%, #3DBAA9 100%)"
                      : "#F2F4F3",
                  }}
                >
                  {ingredient.checked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </motion.div>
                <div className="flex-1">
                  <p
                    className="text-[#303841]"
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      textDecoration: ingredient.checked ? "line-through" : "none",
                      opacity: ingredient.checked ? 0.5 : 1,
                    }}
                  >
                    {ingredient.name}
                  </p>
                </div>
                <p className="text-[#707070]" style={{ fontSize: "0.85rem" }}>
                  {ingredient.amount}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleStep(index)}
                className="bg-white p-5 rounded-2xl shadow-sm cursor-pointer"
              >
                <div className="flex gap-4">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: step.completed
                        ? "linear-gradient(135deg, #2A9D8F 0%, #3DBAA9 100%)"
                        : "linear-gradient(135deg, #FF6A3D 0%, #FF8C6B 100%)",
                    }}
                  >
                    {step.completed ? (
                      <Check className="w-5 h-5 text-white" strokeWidth={3} />
                    ) : (
                      <span className="text-white" style={{ fontWeight: 600 }}>
                        {step.step}
                      </span>
                    )}
                  </motion.div>
                  <p
                    className="text-[#303841] flex-1"
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                      textDecoration: step.completed ? "line-through" : "none",
                      opacity: step.completed ? 0.5 : 1,
                    }}
                  >
                    {step.instruction}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-2xl">
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: isLiked ? "linear-gradient(135deg, #FF6A3D 0%, #FF8C6B 100%)" : "#F2F4F3",
            }}
          >
            <Heart
              className="w-6 h-6"
              fill={isLiked ? "white" : "none"}
              stroke={isLiked ? "white" : "#707070"}
            />
          </motion.button>
          <Button
            className="flex-1 h-14 rounded-2xl shadow-lg"
            style={{
              background: "linear-gradient(135deg, #2A9D8F 0%, #3DBAA9 100%)",
            }}
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Add to Grocery
          </Button>
        </div>
      </div>
    </div>
  );
}
