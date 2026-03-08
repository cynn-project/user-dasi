import { useCart } from "../context/CartContext";

const formatRp = n => "Rp " + n.toLocaleString("id-ID");

export default function Cart({ onNavigate }) {
  const { items, removeFromCart, updateQty, total, count } = useCart();

  return (
    <div style={{ width: "100%", minHeight: "calc(100vh - var(--navbar-h) - 200px)", background: "#f8fafc", padding: "40px 40px 60px", fontFamily: "var(--font-body)" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, color: "var(--gray-900)", marginBottom: 32 }}>Keranjang Belanja</h1>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Cart items */}
        <div style={{ flex: "1 1 500px", background: "#fff", borderRadius: 16, border: "1px solid var(--gray-200)", overflow: "hidden" }}>
          {items.length === 0 ? (
            <div style={{ padding: "80px 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none"
                stroke="var(--gray-300)" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--gray-700)" }}>Keranjang Kosong</h3>
              <p style={{ color: "var(--gray-400)", fontSize: 14 }}>Yuk, mulai belanja dan temukan produk favoritmu!</p>
              <button onClick={() => onNavigate("home")} style={{
                marginTop: 8, padding: "12px 32px", background: "var(--blue-primary)", color: "#fff",
                border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700,
                fontFamily: "var(--font-body)", cursor: "pointer",
              }}>Mulai Belanja</button>
            </div>
          ) : (
            <div>
              {items.map((item, i) => (
                <div key={item.id} style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "18px 24px",
                  borderBottom: i < items.length - 1 ? "1px solid var(--gray-100)" : "none",
                }}>
                  <div style={{
                    width: 70, height: 70, borderRadius: 10, background: "var(--gray-50)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 36, flexShrink: 0,
                  }}>{item.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-900)", marginBottom: 4 }}>{item.name}</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "var(--blue-primary)" }}>{item.price}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{
                      width: 28, height: 28, borderRadius: 6, border: "1px solid var(--gray-200)",
                      background: "#fff", cursor: "pointer", fontSize: 16, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>−</button>
                    <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{
                      width: 28, height: 28, borderRadius: 6, border: "1px solid var(--gray-200)",
                      background: "#fff", cursor: "pointer", fontSize: 16, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--gray-400)", padding: 4, transition: "color .15s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--red)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--gray-400)"}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      <path d="M10 11v6" /><path d="M14 11v6" />
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div style={{ flex: "0 0 300px", background: "#fff", borderRadius: 16, border: "1px solid var(--gray-200)", padding: "24px" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--gray-900)", marginBottom: 20 }}>Ringkasan Pesanan</h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "var(--gray-600)", fontSize: 14 }}>Subtotal ({count} item)</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{formatRp(total)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--gray-100)" }}>
            <span style={{ color: "var(--gray-600)", fontSize: 14 }}>Ongkos Kirim</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--green)" }}>Gratis</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Total</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--blue-primary)" }}>{formatRp(total)}</span>
          </div>
          <button onClick={() => items.length > 0 && onNavigate("checkout")} style={{
            width: "100%", padding: "14px", background: "var(--blue-primary)", color: "#fff",
            border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
            fontFamily: "var(--font-body)", cursor: items.length > 0 ? "pointer" : "not-allowed",
            opacity: items.length > 0 ? 1 : 0.5, transition: "background .18s",
          }}
            onMouseEnter={e => { if (items.length > 0) e.currentTarget.style.background = "var(--blue-dark)"; }}
            onMouseLeave={e => e.currentTarget.style.background = "var(--blue-primary)"}
          >Lanjut ke Checkout</button>
        </div>
      </div>
    </div>
  );
}
