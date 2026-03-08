import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../services/productService";

const HeroBag = () => (
  <svg viewBox="0 0 100 110" fill="none" stroke="rgba(255,255,255,0.75)"
    strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ width: "42%", height: "42%" }}>
    <path d="M18 38 L12 92 Q12 96 17 96 L83 96 Q88 96 88 92 L82 38 Z" />
    <path d="M33 38 Q33 18 50 18 Q67 18 67 38" />
    <line x1="12" y1="38" x2="88" y2="38" />
  </svg>
);

export default function Home({ onNavigate, searchQuery }) {
  const [heroSearch, setHeroSearch] = useState("");

  const filtered = searchQuery
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : PRODUCTS;

  const css = `
    @keyframes heroUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
    .home-hero { width:100%; background:linear-gradient(118deg,#1a3fbd 0%,#2356e8 38%,#2d6ef5 68%,#4b8af7 100%); display:flex; align-items:center; padding:64px 40px; position:relative; overflow:hidden; min-height:380px; }
    .home-hero::before { content:''; position:absolute; top:-140px; right:-60px; width:540px; height:540px; border-radius:50%; background:radial-gradient(circle,rgba(255,255,255,0.07) 0%,transparent 70%); pointer-events:none; }
    .home-hero-content { flex:1; max-width:560px; animation:heroUp .7s ease both; }
    .home-hero-title { font-family:var(--font-display); font-weight:800; font-size:clamp(30px,3.6vw,52px); color:#fff; line-height:1.15; margin-bottom:18px; letter-spacing:-0.4px; }
    .home-hero-sub { font-size:clamp(13px,1.3vw,16px); color:rgba(255,255,255,0.78); line-height:1.7; margin-bottom:36px; max-width:400px; }
    .home-hero-search { display:flex; background:#fff; border-radius:12px; overflow:hidden; max-width:440px; box-shadow:0 8px 32px rgba(0,0,0,0.18); animation:heroUp .7s .12s ease both; }
    .home-hero-input { flex:1; border:none; outline:none; padding:14px 18px; font-size:14.5px; font-family:var(--font-body); color:var(--gray-700); }
    .home-hero-input::placeholder { color:var(--gray-400); }
    .home-hero-btn { padding:14px 26px; background:var(--blue-primary); color:#fff; border:none; font-family:var(--font-body); font-size:14.5px; font-weight:700; cursor:pointer; transition:background .18s; flex-shrink:0; }
    .home-hero-btn:hover { background:var(--blue-dark); }
    .home-hero-visual { flex-shrink:0; margin-left:auto; padding-left:48px; animation:heroUp .7s .22s ease both; }
    .home-hero-circle { border-radius:50%; background:rgba(255,255,255,0.1); border:2px solid rgba(255,255,255,0.15); display:flex; align-items:center; justify-content:center; width:clamp(200px,20vw,300px); height:clamp(200px,20vw,300px); position:relative; }
    .home-hero-circle::before { content:''; position:absolute; inset:20px; border-radius:50%; border:1.5px solid rgba(255,255,255,0.1); }
    .products-section { width:100%; padding:44px 40px 60px; background:#f8fafc; }
    .products-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }
    .products-title { font-family:var(--font-display); font-weight:700; font-size:22px; color:var(--gray-900); }
    .lihat-semua { display:flex; align-items:center; gap:4px; color:var(--blue-primary); font-size:13.5px; font-weight:600; border:none; background:none; cursor:pointer; transition:gap .18s; }
    .lihat-semua:hover { gap:8px; }
    .products-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:18px; }
    @media(max-width:1100px) { .products-grid { grid-template-columns:repeat(4,1fr); } }
    @media(max-width:860px) { .products-grid { grid-template-columns:repeat(3,1fr); } .home-hero-visual { display:none; } .home-hero { padding:48px 28px; } .products-section { padding:36px 28px 48px; } }
    @media(max-width:580px) { .products-grid { grid-template-columns:repeat(2,1fr); gap:12px; } }
  `;

  return (
    <>
      <style>{css}</style>

      {/* Hero */}
      {!searchQuery && (
        <section className="home-hero">
          <div className="home-hero-content">
            <h1 className="home-hero-title">Temukan Produk Terbaik<br />untuk Kebutuhanmu</h1>
            <p className="home-hero-sub">Marketplace terpercaya dengan ribuan produk berkualitas dan harga terjangkau</p>
            <div className="home-hero-search">
              <input className="home-hero-input" type="text"
                placeholder="Mau cari apa hari ini?"
                value={heroSearch} onChange={e => setHeroSearch(e.target.value)}
                onKeyDown={e => e.key === "Enter" && heroSearch && onNavigate("home", heroSearch)} />
              <button className="home-hero-btn">Cari</button>
            </div>
          </div>
          <div className="home-hero-visual">
            <div className="home-hero-circle"><HeroBag /></div>
          </div>
        </section>
      )}

      {/* Products */}
      <section className="products-section">
        <div className="products-header">
          <h2 className="products-title">
            {searchQuery ? `Hasil pencarian "${searchQuery}"` : "Produk Pilihan"}
          </h2>
          {!searchQuery && (
            <button className="lihat-semua">
              Lihat Semua
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue-primary)" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray-400)", fontSize: 15 }}>
            Produk tidak ditemukan untuk "{searchQuery}"
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  );
}
