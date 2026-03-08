import { useFavorite } from "../context/FavoriteContext";
import ProductCard from "../components/ProductCard";

export default function Favorites({ onNavigate }) {
  const { favorites } = useFavorite();

  return (
    <div style={{ width: "100%", minHeight: "calc(100vh - var(--navbar-h) - 200px)", background: "#f8fafc", padding: "40px 40px 60px", fontFamily: "var(--font-body)" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, color: "var(--gray-900)", marginBottom: 6 }}>Produk Favorit</h1>
      <p style={{ color: "var(--gray-500)", fontSize: 14, marginBottom: 36 }}>Produk yang kamu suka, tersimpan di sini</p>

      {favorites.length === 0 ? (
        <div style={{
          background: "#fff", borderRadius: 16, border: "1px solid var(--gray-200)",
          padding: "80px 40px", display: "flex", flexDirection: "column",
          alignItems: "center", gap: 16,
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "#fff0f0", border: "1px solid #fecaca",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
              stroke="#f87171" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--gray-800)" }}>Belum Ada Favorit</h3>
          <p style={{ color: "var(--gray-500)", fontSize: 14, textAlign: "center" }}>
            Klik ikon ❤️ pada produk untuk menambahkannya ke sini
          </p>
          <button onClick={() => onNavigate("home")} style={{
            marginTop: 8, padding: "13px 36px",
            background: "var(--blue-primary)", color: "#fff",
            border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
            fontFamily: "var(--font-body)", cursor: "pointer", transition: "background .18s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--blue-dark)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--blue-primary)"}
          >
            Jelajahi Produk
          </button>
        </div>
      ) : (
        <>
          <p style={{ color: "var(--gray-500)", fontSize: 13.5, marginBottom: 20 }}>{favorites.length} produk favorit</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 18 }}>
            {favorites.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}
    </div>
  );
}
