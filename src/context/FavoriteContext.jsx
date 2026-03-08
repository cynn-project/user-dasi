import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext(null);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === product.id);
      if (exists) return prev.filter(f => f.id !== product.id);
      return [...prev, product];
    });
  };

  const isFavorite = (id) => favorites.some(f => f.id === id);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorite = () => useContext(FavoriteContext);
