import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart, Truck } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface GroceryItem {
  id: number;
  name: string;
  amount: string;
  category: string;
  price: number;
  quantity: number;
  checked: boolean;
}

const initialGroceryItems: GroceryItem[] = [
  { id: 1, name: "Pasta (Penne)", amount: "400g", category: "Grains", price: 3.99, quantity: 1, checked: false },
  { id: 2, name: "Heavy Cream", amount: "1 cup", category: "Dairy", price: 4.50, quantity: 1, checked: false },
  { id: 3, name: "Parmesan Cheese", amount: "200g", category: "Dairy", price: 7.99, quantity: 1, checked: false },
  { id: 4, name: "Fresh Garlic", amount: "4 cloves", category: "Produce", price: 2.50, quantity: 1, checked: false },
  { id: 5, name: "Olive Oil", amount: "2 tbsp", category: "Oils", price: 12.99, quantity: 1, checked: false },
  { id: 6, name: "Fresh Basil", amount: "1/4 cup", category: "Produce", price: 3.50, quantity: 1, checked: false },
  { id: 7, name: "Cherry Tomatoes", amount: "1 cup", category: "Produce", price: 4.99, quantity: 1, checked: false },
  { id: 8, name: "Salt & Pepper", amount: "to taste", category: "Spices", price: 5.50, quantity: 1, checked: false },
];

const categoryColors: { [key: string]: string } = {
  Grains: "#FF6A3D",
  Dairy: "#2A9D8F",
  Produce: "#FF8C6B",
  Oils: "#FFB4A0",
  Spices: "#3DBAA9",
};

export function GroceryListScreen({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState(initialGroceryItems);

  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const checkedCount = items.filter(item => item.checked).length;

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-white p-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 bg-background rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-[#303841]" />
          </motion.button>
          <h1 className="text-[#303841]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            Grocery List
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="flex items-center justify-between bg-[#FFEDE7] p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6A3D] to-[#FF8C6B] flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[#303841]" style={{ fontSize: "0.85rem" }}>Total Items</p>
              <p className="text-[#303841]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                {items.length}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#707070]" style={{ fontSize: "0.85rem" }}>Checked</p>
            <p className="text-[#2A9D8F]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              {checkedCount}/{items.length}
            </p>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="p-6 space-y-3">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <motion.div
                className="relative"
                drag="x"
                dragConstraints={{ left: -80, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) {
                    removeItem(item.id);
                  }
                }}
              >
                {/* Delete Background */}
                <div className="absolute inset-0 bg-[#d4183d] flex items-center justify-end pr-6">
                  <Trash2 className="w-5 h-5 text-white" />
                </div>

                {/* Item Content */}
                <div className="bg-white p-4 flex items-center gap-4 relative">
                  {/* Checkbox */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleItem(item.id)}
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 border-2 transition-all"
                    style={{
                      backgroundColor: item.checked ? categoryColors[item.category] : "transparent",
                      borderColor: categoryColors[item.category],
                    }}
                  >
                    {item.checked && (
                      <motion.svg
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        className="w-4 h-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </motion.svg>
                    )}
                  </motion.button>

                  {/* Item Info */}
                  <div className="flex-1">
                    <p
                      className="text-[#303841]"
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        textDecoration: item.checked ? "line-through" : "none",
                        opacity: item.checked ? 0.5 : 1,
                      }}
                    >
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        className="border-0 text-white"
                        style={{
                          backgroundColor: categoryColors[item.category],
                          fontSize: "0.7rem",
                        }}
                      >
                        {item.category}
                      </Badge>
                      <span className="text-[#707070]" style={{ fontSize: "0.85rem" }}>
                        {item.amount}
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 bg-background rounded-xl">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-[#707070]"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <span className="text-[#303841] min-w-[20px] text-center" style={{ fontWeight: 600 }}>
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#FF6A3D]"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <p className="text-[#303841]" style={{ fontSize: "1rem", fontWeight: 700 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-2xl">
        <div className="mb-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[#707070]">Subtotal</span>
            <span className="text-[#303841]" style={{ fontWeight: 600 }}>
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#707070]">Delivery Fee</span>
            <span className="text-[#2A9D8F]" style={{ fontWeight: 600 }}>
              FREE
            </span>
          </div>
          <div className="h-px bg-gray-200 my-2" />
          <div className="flex justify-between items-center">
            <span className="text-[#303841]" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              Total
            </span>
            <span className="text-[#303841]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4 p-3 bg-[#FFEDE7] rounded-2xl">
          <Truck className="w-5 h-5 text-[#FF6A3D]" />
          <p className="text-[#303841]" style={{ fontSize: "0.9rem" }}>
            <span style={{ fontWeight: 600 }}>Delivery in 30-45 min</span>
          </p>
        </div>

        <Button
          className="w-full h-14 rounded-2xl shadow-lg"
          style={{
            background: "linear-gradient(135deg, #FF6A3D 0%, #FF8C6B 100%)",
          }}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Order Now - ${totalPrice.toFixed(2)}
        </Button>
      </div>
    </div>
  );
}
