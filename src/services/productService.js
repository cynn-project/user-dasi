export const PRODUCTS = [
  {
    id: 1, name: "iPhone 15 Pro Max", emoji: "📱",
    originalPrice: "Rp 27.498.750", price: "Rp 21.999.000", numericPrice: 21999000, category: "elektronik",
    description: "iPhone 15 Pro Max hadir dengan chip A17 Pro, layar Super Retina XDR 6.7 inci, dan sistem kamera pro 48MP. Desain titanium yang ringan namun kuat.",
    variants: [
      { label: "Warna", options: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"] },
      { label: "Kapasitas", options: ["256GB", "512GB", "1TB"] },
    ],
  },
  {
    id: 2, name: "MacBook Air M3", emoji: "💻",
    originalPrice: "Rp 23.123.750", price: "Rp 18.499.000", numericPrice: 18499000, category: "elektronik",
    description: "MacBook Air dengan chip M3 terbaru. Performa luar biasa, baterai tahan hingga 18 jam, layar Liquid Retina 13 inci yang memukau.",
    variants: [
      { label: "Warna", options: ["Midnight", "Starlight", "Space Gray", "Silver"] },
      { label: "RAM", options: ["8GB", "16GB", "24GB"] },
    ],
  },
  {
    id: 3, name: "Samsung Galaxy Watch 6", emoji: "⌚",
    originalPrice: "Rp 5.373.750", price: "Rp 4.299.000", numericPrice: 4299000, category: "elektronik",
    description: "Smartwatch dengan layar AMOLED 1.4 inci, sensor kesehatan canggih, GPS, dan baterai tahan 40 jam. Cocok untuk aktivitas harian dan olahraga.",
    variants: [
      { label: "Ukuran", options: ["40mm", "44mm"] },
      { label: "Warna", options: ["Graphite", "Gold", "Silver"] },
    ],
  },
  {
    id: 4, name: "Sony WH-1000XM5", emoji: "🎧",
    originalPrice: "Rp 6.873.750", price: "Rp 5.499.000", numericPrice: 5499000, category: "elektronik",
    description: "Headphone over-ear dengan noise cancelling terbaik di kelasnya. Suara jernih, baterai 30 jam, dan desain premium yang nyaman dipakai lama.",
    variants: [
      { label: "Warna", options: ["Black", "Silver"] },
    ],
  },
  {
    id: 5, name: "Jaket Bomber Premium", emoji: "🧥",
    originalPrice: "Rp 573.750", price: "Rp 459.000", numericPrice: 459000, category: "fashion",
    description: "Jaket bomber bahan berkualitas tinggi, hangat dan stylish. Cocok untuk aktivitas sehari-hari maupun casual outing.",
    variants: [
      { label: "Ukuran", options: ["S", "M", "L", "XL", "XXL"] },
      { label: "Warna", options: ["Hitam", "Army Green", "Navy Blue"] },
    ],
  },
  {
    id: 6, name: "Sepatu Sneakers Nike", emoji: "👟",
    originalPrice: "Rp 2.373.750", price: "Rp 1.899.000", numericPrice: 1899000, category: "fashion",
    description: "Sneakers Nike dengan teknologi Air cushioning untuk kenyamanan maksimal. Desain modern dan stylish untuk aktivitas olahraga maupun casual.",
    variants: [
      { label: "Ukuran", options: ["38", "39", "40", "41", "42", "43", "44"] },
      { label: "Warna", options: ["Putih/Hitam", "Hitam/Merah", "Abu-abu"] },
    ],
  },
  {
    id: 7, name: "Tas Ransel Kanvas", emoji: "🎒",
    originalPrice: "Rp 361.250", price: "Rp 289.000", numericPrice: 289000, category: "fashion",
    description: "Tas ransel bahan kanvas premium, kapasitas besar, tahan air. Dilengkapi banyak kompartemen untuk menyimpan laptop hingga 15 inci.",
    variants: [
      { label: "Warna", options: ["Coklat", "Hitam", "Khaki"] },
    ],
  },
  {
    id: 8, name: "Kopi Arabica Premium 500g", emoji: "☕",
    originalPrice: "Rp 231.250", price: "Rp 185.000", numericPrice: 185000, category: "makanan",
    description: "Kopi Arabica single origin pilihan dari pegunungan Gayo. Aroma harum, rasa seimbang antara asam dan manis, cocok untuk espresso maupun pour over.",
    variants: [
      { label: "Jenis Roast", options: ["Light Roast", "Medium Roast", "Dark Roast"] },
      { label: "Bentuk", options: ["Biji", "Bubuk Halus", "Bubuk Kasar"] },
    ],
  },
  {
    id: 9, name: "Madu Hutan Asli 650ml", emoji: "🍯",
    originalPrice: "Rp 218.750", price: "Rp 175.000", numericPrice: 175000, category: "makanan",
    description: "Madu hutan murni 100% tanpa campuran dari hutan Kalimantan. Kaya antioksidan, enzim alami, dan memiliki cita rasa khas yang nikmat.",
    variants: [
      { label: "Ukuran", options: ["350ml", "650ml", "1 Liter"] },
    ],
  },
  {
    id: 10, name: "Vitamin C 1000mg", emoji: "💊",
    originalPrice: "Rp 156.250", price: "Rp 125.000", numericPrice: 125000, category: "kesehatan",
    description: "Suplemen Vitamin C 1000mg dengan Zinc untuk menjaga daya tahan tubuh. Formula effervescent yang mudah larut dan enak dikonsumsi.",
    variants: [
      { label: "Rasa", options: ["Jeruk", "Lemon", "Original"] },
      { label: "Isi", options: ["10 tablet", "20 tablet", "30 tablet"] },
    ],
  },
];

export const getProducts = () => Promise.resolve(PRODUCTS);
export const getProductById = (id) => Promise.resolve(PRODUCTS.find(p => p.id === id));