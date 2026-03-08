export const PRODUCTS = [
  { id: 1,  name: "iPhone 15 Pro Max",       emoji: "📱", originalPrice: "Rp 27.498.750", price: "Rp 21.999.000", numericPrice: 21999000, category: "elektronik" },
  { id: 2,  name: "MacBook Air M3",           emoji: "💻", originalPrice: "Rp 23.123.750", price: "Rp 18.499.000", numericPrice: 18499000, category: "elektronik" },
  { id: 3,  name: "Samsung Galaxy Watch 6",   emoji: "⌚", originalPrice: "Rp 5.373.750",  price: "Rp 4.299.000",  numericPrice: 4299000,  category: "elektronik" },
  { id: 4,  name: "Sony WH-1000XM5",          emoji: "🎧", originalPrice: "Rp 6.873.750",  price: "Rp 5.499.000",  numericPrice: 5499000,  category: "elektronik" },
  { id: 5,  name: "Jaket Bomber Premium",     emoji: "🧥", originalPrice: "Rp 573.750",    price: "Rp 459.000",    numericPrice: 459000,   category: "fashion" },
  { id: 6,  name: "Sepatu Sneakers Nike",     emoji: "👟", originalPrice: "Rp 2.373.750",  price: "Rp 1.899.000",  numericPrice: 1899000,  category: "fashion" },
  { id: 7,  name: "Tas Ransel Kanvas",        emoji: "🎒", originalPrice: "Rp 361.250",    price: "Rp 289.000",    numericPrice: 289000,   category: "fashion" },
  { id: 8,  name: "Kopi Arabica Premium 500g",emoji: "☕", originalPrice: "Rp 231.250",    price: "Rp 185.000",    numericPrice: 185000,   category: "makanan" },
  { id: 9,  name: "Madu Hutan Asli 650ml",    emoji: "🍯", originalPrice: "Rp 218.750",    price: "Rp 175.000",    numericPrice: 175000,   category: "makanan" },
  { id: 10, name: "Vitamin C 1000mg",         emoji: "💊", originalPrice: "Rp 156.250",    price: "Rp 125.000",    numericPrice: 125000,   category: "kesehatan" },
];

export const getProducts = () => Promise.resolve(PRODUCTS);
export const getProductById = (id) => Promise.resolve(PRODUCTS.find(p => p.id === id));
