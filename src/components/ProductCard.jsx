import { useState } from "react";
import { useFavorite } from "../context/FavoriteContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const HeartIcon = ({ filled }) => (
  <svg width="17" height="17" viewBox="0 0 24 24"
    fill={filled ? "#ef4444" : "none"}
    stroke={filled ? "#ef4444" : "#9ca3af"} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorite();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const liked = isFavorite(product.id);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 14,
        border: "1px solid var(--gray-200)",
        overflow: "hidden",
        boxShadow: hovered ? "0 8px 28px rgba(37,99,235,0.12)" : "var(--shadow-sm)",
        transition: "box-shadow 0.22s, transform 0.22s",
        transform: hovered ? "translateY(-3px)" : "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image area */}
      <div style={{
        background: "var(--gray-50)",
        height: 160,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}>
        <span style={{ fontSize: 64, lineHeight: 1 }}>{product.emoji}</span>
        <button
          onClick={e => { e.stopPropagation(); toggleFavorite(product); }}
          style={{
            position: "absolute", top: 10, right: 10,
            width: 32, height: 32, borderRadius: "50%",
            background: "#fff", border: "1px solid var(--gray-200)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            transition: "transform 0.15s",
            transform: liked ? "scale(1.18)" : "scale(1)",
          }}
        >
          <HeartIcon filled={liked} />
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-900)", lineHeight: 1.35 }}>
          {product.name}
        </p>
        <p style={{ fontSize: 12, color: "var(--gray-400)", textDecoration: "line-through" }}>
          {product.originalPrice}
        </p>
        <p style={{ fontSize: 15, fontWeight: 700, color: "var(--blue-primary)", marginTop: 2 }}>
          {product.price}
        </p>

        {/* Add to cart button on hover */}
        <button
          onClick={e => {
            e.stopPropagation();
            addToCart(product);
            showToast({ message: `${product.name} ditambahkan ke keranjang!`, type: "success" });
          }}
          style={{
            marginTop: 10,
            padding: "8px 0",
            background: hovered ? "var(--blue-primary)" : "var(--blue-light)",
            color: hovered ? "#fff" : "var(--blue-primary)",
            border: "none",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          + Keranjang
        </button>
      </div>
    </div>
  );
}