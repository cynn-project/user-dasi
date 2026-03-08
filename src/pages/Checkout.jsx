import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import ProtectedRoute from "../components/ProtectedRoute";

const formatRp = n => "Rp " + n.toLocaleString("id-ID");

export default function Checkout({ onNavigate }) {
  const { items, total, clearCart } = useCart();
  const { addOrder } = useOrder();
  const [form, setForm] = useState({ name: "", address: "", phone: "", payment: "transfer" });
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!form.name || !form.address || !form.phone) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const orderNumber = "#DASI-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 90000) + 10000);
    const now = new Date();
    const orderDate = now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    const paymentLabel = { transfer: "Transfer Bank", cod: "Bayar di Tempat (COD)", ewallet: "E-Wallet" }[form.payment];

    const orderData = {
      orderNumber,
      orderDate,
      paymentMethod: paymentLabel,
      total: formatRp(total),
      totalNumeric: total,
      items: items.map(i => ({ ...i })),
      status: "Diproses",
      name: form.name,
      address: form.address,
      phone: form.phone,
    };

    addOrder(orderData);
    clearCart();
    setLoading(false);
    onNavigate("order-success", orderData);
  };

  const inputStyle = {
    width: "100%", padding: "12px 14px", border: "1.5px solid var(--gray-200)",
    borderRadius: 10, fontSize: 14, fontFamily: "var(--font-body)",
    color: "var(--gray-900)", outline: "none", background: "#fff",
  };

  return (
    <ProtectedRoute onNavigate={onNavigate}>
      <div style={{ width: "100%", background: "#f8fafc", padding: "40px 40px 60px", fontFamily: "var(--font-body)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, marginBottom: 28 }}>Checkout</h1>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* Form */}
          <div style={{ flex: "1 1 420px", background: "#fff", borderRadius: 16, border: "1px solid var(--gray-200)", padding: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Informasi Pengiriman</h3>
            {[
              { key: "name", label: "Nama Penerima", placeholder: "Nama lengkap" },
              { key: "phone", label: "Nomor Telepon", placeholder: "08xxxxxxxxxx" },
              { key: "address", label: "Alamat Lengkap", placeholder: "Jalan, RT/RW, Kelurahan, Kecamatan, Kota" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>{f.label}</label>
                {f.key === "address" ? (
                  <textarea placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    rows={3} style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={e => e.target.style.borderColor = "var(--blue-primary)"}
                    onBlur={e => e.target.style.borderColor = "var(--gray-200)"} />
                ) : (
                  <input placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "var(--blue-primary)"}
                    onBlur={e => e.target.style.borderColor = "var(--gray-200)"} />
                )}
              </div>
            ))}
            <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 24, marginBottom: 14 }}>Metode Pembayaran</h3>
            {[
              { value: "transfer", label: "Transfer Bank" },
              { value: "cod", label: "Bayar di Tempat (COD)" },
              { value: "ewallet", label: "E-Wallet" },
            ].map(p => (
              <label key={p.value} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px", borderRadius: 10, border: `1.5px solid ${form.payment === p.value ? "var(--blue-primary)" : "var(--gray-200)"}`, marginBottom: 8, cursor: "pointer", background: form.payment === p.value ? "var(--blue-light)" : "#fff" }}>
                <input type="radio" name="payment" value={p.value} checked={form.payment === p.value}
                  onChange={() => setForm(f => ({ ...f, payment: p.value }))}
                  style={{ accentColor: "var(--blue-primary)" }} />
                <span style={{ fontSize: 14, fontWeight: 500 }}>{p.label}</span>
              </label>
            ))}
          </div>

          {/* Summary */}
          <div style={{ flex: "0 0 300px", background: "#fff", borderRadius: 16, border: "1px solid var(--gray-200)", padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Ringkasan ({items.length} produk)</h3>
            {items.map(i => (
              <div key={i.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: "var(--gray-600)" }}>{i.name} x{i.qty}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{formatRp(i.numericPrice * i.qty)}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--gray-100)", margin: "14px 0", paddingTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: "var(--gray-600)" }}>Ongkos Kirim</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--green)" }}>Gratis</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: "var(--blue-primary)" }}>{formatRp(total)}</span>
              </div>
            </div>
            <button onClick={handleOrder} disabled={loading || items.length === 0} style={{
              width: "100%", padding: "14px", background: "var(--blue-primary)", color: "#fff",
              border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
              fontFamily: "var(--font-body)", cursor: "pointer", marginTop: 8, transition: "background .18s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--blue-dark)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--blue-primary)"}
            >{loading ? "Memproses..." : "Buat Pesanan"}</button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}