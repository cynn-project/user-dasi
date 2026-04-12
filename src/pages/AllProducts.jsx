import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../services/productService";

export default function AllProducts({ onNavigate, searchQuery }) {
  const filtered = searchQuery
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : PRODUCTS;

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-gray-50 px-10 py-10 pb-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => onNavigate("home")}
          className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-500 shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div>
          <h1 className="font-extrabold text-2xl text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
            Semua Produk
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} produk tersedia</p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-sm">
          Produk tidak ditemukan untuk "{searchQuery}"
        </div>
      ) : (
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))" }}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}