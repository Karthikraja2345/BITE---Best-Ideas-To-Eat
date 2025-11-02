import { useState } from "react";
import { motion } from "motion/react";
import { Search, Plus, Filter, Clock, Heart } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const recipes = [
  {
    id: 1,
    title: "Colorful Buddha Bowl",
    image: "https://images.unsplash.com/photo-1627279001674-4c7dbd9edb88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBib3dsfGVufDF8fHx8MTc2MTk3NTI2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    time: "25 min",
    category: "Healthy",
    likes: 234,
  },
  {
    id: 2,
    title: "Creamy Pasta Delight",
    image: "https://images.unsplash.com/photo-1711539137930-3fa2ae6cec60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzYyMDYzNDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    time: "30 min",
    category: "Italian",
    likes: 456,
  },
  {
    id: 3,
    title: "Breakfast Bliss",
    image: "https://images.unsplash.com/photo-1683260041390-e13c859f4b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBmb29kJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzYyMDYzNDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    time: "15 min",
    category: "Breakfast",
    likes: 189,
  },
  {
    id: 4,
    title: "Sweet Dessert Dreams",
    image: "https://images.unsplash.com/photo-1637944220604-c5f28faac604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwZm9vZCUyMHN0eWxpbmd8ZW58MXx8fHwxNzYyMDYzNDYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    time: "45 min",
    category: "Dessert",
    likes: 567,
  },
  {
    id: 5,
    title: "Asian Fusion Bowl",
    image: "https://images.unsplash.com/photo-1757715377671-01c20cfa1880?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGN1aXNpbmUlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjIwNjM0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    time: "35 min",
    category: "Asian",
    likes: 321,
  },
  {
    id: 6,
    title: "Fresh Ingredients Mix",
    image: "https://images.unsplash.com/photo-1665088127661-83aeff6104c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwaW5ncmVkaWVudHMlMjBmcmVzaHxlbnwxfHx8fDE3NjIwNjM0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    time: "20 min",
    category: "Quick",
    likes: 198,
  },
];

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Quick", "Healthy"];

export function HomeScreen({ onRecipeClick, onNavigate }: { onRecipeClick: (id: number) => void; onNavigate: (screen: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-white p-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[#303841]" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
              Discover
            </h1>
            <p className="text-[#707070]">Find your next favorite recipe</p>
          </div>
          <button className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6A3D] to-[#FF8C6B] flex items-center justify-center">
              <span className="text-white" style={{ fontWeight: 600 }}>JD</span>
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#2A9D8F] rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white" style={{ fontSize: "0.7rem" }}>3</span>
            </div>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#707070]" />
          <Input
            placeholder="Search recipes..."
            className="pl-12 pr-12 h-14 rounded-2xl bg-background border-0"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <Filter className="w-5 h-5 text-[#FF6A3D]" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className="px-5 py-2 rounded-full whitespace-nowrap transition-all duration-300"
              style={{
                background: selectedCategory === category
                  ? "linear-gradient(135deg, #FF6A3D 0%, #FF8C6B 100%)"
                  : "#F2F4F3",
                color: selectedCategory === category ? "white" : "#707070",
                fontWeight: selectedCategory === category ? 600 : 400,
              }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="p-4 grid grid-cols-2 gap-4 mt-4">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRecipeClick(recipe.id)}
            className="bg-white rounded-3xl overflow-hidden shadow-md cursor-pointer"
          >
            <div className="relative h-48">
              <ImageWithFallback
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <Badge
                className="absolute top-3 right-3 bg-white/90 text-[#303841] border-0"
              >
                <Clock className="w-3 h-3 mr-1" />
                {recipe.time}
              </Badge>

              <button className="absolute top-3 left-3">
                <motion.div
                  whileTap={{ scale: 1.2 }}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center"
                >
                  <Heart className="w-4 h-4 text-[#FF6A3D]" fill="none" />
                </motion.div>
              </button>

              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white mb-1" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  {recipe.title}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge
                    className="text-white border-white/50"
                    variant="outline"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {recipe.category}
                  </Badge>
                  <span className="text-white/80 flex items-center gap-1" style={{ fontSize: "0.75rem" }}>
                    <Heart className="w-3 h-3" fill="white" />
                    {recipe.likes}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Add Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate("camera")}
        className="fixed bottom-28 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #FF6A3D 0%, #FF8C6B 100%)",
        }}
      >
        <Plus className="w-7 h-7 text-white" strokeWidth={3} />
      </motion.button>
    </div>
  );
}
