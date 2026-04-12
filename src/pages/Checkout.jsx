import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

const formatRp = n => "Rp " + n.toLocaleString("id-ID");
const jurusanList = ["TME", "TEK", "TITL", "TMO", "TPFL", "SIJA", "KGS", "KJIJ"];

export default function Checkout({ onNavigate, checkoutItems }) {
  const { items: cartItems, removeFromCart } = useCart();
  const { addOrder } = useOrder();
  const { user } = useAuth();

  const items = checkoutItems || cartItems;
  const total = items.reduce((sum, i) => sum + i.numericPrice * i.qty, 0);

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    kelas: user?.kelas || "",
    jurusan: user?.jurusan || "",
    payment: "transfer",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOrder = async () => {
    setError("");
    if (!form.name || !form.phone || !form.kelas || !form.jurusan) {
      setError("Lengkapi semua informasi pengiriman."); return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const orderNumber = "#DASI-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 90000) + 10000);
    const orderDate = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    const paymentLabel = { transfer: "Transfer Bank", cod: "Bayar di Tempat (COD)", ewallet: "E-Wallet" }[form.payment];

    const orderData = {
      orderNumber, orderDate,
      paymentMethod: paymentLabel,
      total: formatRp(total), totalNumeric: total,
      items: items.map(i => ({ ...i })),
      status: "Diproses",
      name: form.name, phone: form.phone,
      kelas: form.kelas, jurusan: form.jurusan,
    };

    addOrder(orderData);
    items.forEach(i => removeFromCart(i.id));
    setLoading(false);
    onNavigate("order-success", orderData);
  };

  const inputCls = "w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm outline-none bg-white transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

  return (
    <ProtectedRoute onNavigate={onNavigate}>
      <div className="w-full bg-gray-50 px-10 py-10 pb-16">
        <div className="flex items-center gap-3 mb-7">
          <button onClick={() => onNavigate("cart")}
            className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-500 shrink-0 shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <h1 className="font-extrabold text-2xl text-gray-900" style={{ fontFamily: "var(--font-display)" }}>Checkout</h1>
        </div>

        <div className="flex gap-6 flex-wrap items-start">

          <div className="flex-[1_1_420px] flex flex-col gap-5">

            {/* Info pengiriman */}
            <div className="bg-white rounded-2xl border border-gray-200 p-7">
              <h3 className="text-base font-bold mb-5">Informasi Penerima</h3>

              {(user?.kelas || user?.jurusan) && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl px-3.5 py-2.5 mb-4 text-sm text-blue-700 flex items-center gap-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Data diisi otomatis dari profil. Bisa diubah jika perlu.
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Lengkap</label>
                  <input placeholder="Nama lengkap" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nomor Telepon</label>
                  <input placeholder="08xxxxxxxxxx" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Kelas</label>
                  <input placeholder="Contoh: XI, XII" value={form.kelas}
                    onChange={e => setForm(f => ({ ...f, kelas: e.target.value }))}
                    className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Jurusan</label>
                  <div className="relative">
                    <select value={form.jurusan} onChange={e => setForm(f => ({ ...f, jurusan: e.target.value }))}
                      className={`${inputCls} appearance-none pr-8 cursor-pointer`}>
                      <option value="">Pilih jurusan</option>
                      {jurusanList.map(j => <option key={j} value={j}>{j}</option>)}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metode pembayaran */}
            <div className="bg-white rounded-2xl border border-gray-200 p-7">
              <h3 className="text-base font-bold mb-4">Metode Pembayaran</h3>
              {[
                { value: "transfer", label: "Transfer Bank" },
                { value: "cod", label: "Bayar di Tempat (COD)" },
                { value: "ewallet", label: "E-Wallet" },
              ].map(p => (
                <label key={p.value} className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 cursor-pointer border transition-colors
                  ${form.payment === p.value ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
                  <input type="radio" name="payment" value={p.value}
                    checked={form.payment === p.value}
                    onChange={() => setForm(f => ({ ...f, payment: p.value }))}
                    className="accent-blue-600" />
                  <span className="text-sm font-medium">{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ringkasan */}
          <div className="flex-[0_0_300px] bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-base font-bold mb-4">Ringkasan ({items.length} produk)</h3>
            <div className="max-h-48 overflow-y-auto mb-3 space-y-2">
              {items.map(i => (
                <div key={i.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xl shrink-0">{i.emoji}</span>
                    <span className="text-xs text-gray-600 truncate">{i.name} x{i.qty}</span>
                  </div>
                  <span className="text-xs font-semibold shrink-0 ml-2">{formatRp(i.numericPrice * i.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 mb-2">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Ongkos Kirim</span>
                <span className="text-sm font-semibold text-green-600">Gratis</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm font-bold">Total</span>
                <span className="text-sm font-bold text-blue-600">{formatRp(total)}</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 mb-3 text-xs text-red-600">{error}</div>
            )}

            <button onClick={handleOrder} disabled={loading || items.length === 0}
              className={`w-full py-3.5 rounded-xl text-sm font-bold border-none mt-3 transition-colors
                ${items.length > 0 ? "bg-blue-600 text-white cursor-pointer hover:bg-blue-700" : "bg-blue-200 text-white cursor-not-allowed"}`}>
              {loading ? "Memproses..." : "Buat Pesanan"}
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}