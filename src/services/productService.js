export const PRODUCTS = [
  { id: 1,  name: "iPhone 15 Pro Max",       emoji: "📱", price: "Rp 21.999.000", numericPrice: 21999000, category: "elektronik" },
  { id: 2,  name: "MacBook Air M3",           emoji: "💻", price: "Rp 18.499.000", numericPrice: 18499000, category: "elektronik" },
  { id: 3,  name: "Samsung Galaxy Watch 6",   emoji: "⌚",  price: "Rp 4.299.000",  numericPrice: 4299000,  category: "elektronik" },
  { id: 4,  name: "Sony WH-1000XM5",          emoji: "🎧",  price: "Rp 5.499.000",  numericPrice: 5499000,  category: "elektronik" },
  { id: 5,  name: "Jaket Bomber Premium",     emoji: "🧥",    price: "Rp 459.000",    numericPrice: 459000,   category: "fashion" },
  { id: 6,  name: "Sepatu Sneakers Nike",     emoji: "👟",  price: "Rp 1.899.000",  numericPrice: 1899000,  category: "fashion" },
  { id: 7,  name: "Tas Ransel Kanvas",        emoji: "🎒",    price: "Rp 289.000",    numericPrice: 289000,   category: "fashion" },
  { id: 8,  name: "Kopi Arabica Premium 500g",emoji: "☕",    price: "Rp 185.000",    numericPrice: 185000,   category: "makanan" },
  { id: 9,  name: "Madu Hutan Asli 650ml",    emoji: "🍯",    price: "Rp 175.000",    numericPrice: 175000,   category: "makanan" },
  { id: 10, name: "Vitamin C 1000mg",         emoji: "💊",    price: "Rp 125.000",    numericPrice: 125000,   category: "kesehatan" },
];

export const getProducts = () => Promise.resolve(PRODUCTS);
export const getProductById = (id) => Promise.resolve(PRODUCTS.find(p => p.id === id));
