import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

const formatRp = n => "Rp " + n.toLocaleString("id-ID");

export default function Checkout({ onNavigate }) {
  const { items, total, clearCart } = useCart();
  const { addOrder } = useOrder();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "", address: user?.address || "",
    phone: user?.phone || "", payment: "transfer",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOrder = async () => {
    setError("");
    if (!form.name || !form.phone || !form.address) {
      setError("Lengkapi nama, nomor telepon, dan alamat pengiriman."); return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const orderNumber = "#DASI-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 90000) + 10000);
    const orderDate = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    const paymentLabel = { transfer: "Transfer Bank", cod: "Bayar di Tempat (COD)", ewallet: "E-Wallet" }[form.payment];
    const orderData = { orderNumber, orderDate, paymentMethod: paymentLabel, total: formatRp(total), totalNumeric: total, items: items.map(i => ({ ...i })), status: "Diproses", name: form.name, address: form.address, phone: form.phone };
    addOrder(orderData); clearCart(); setLoading(false);
    onNavigate("order-success", orderData);
  };

  const inputCls = "w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm outline-none bg-white transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

  return (
    <ProtectedRoute onNavigate={onNavigate}>
      <div className="w-full bg-gray-50 px-10 py-10 pb-16">
        <h1 className="font-extrabold text-2xl text-gray-900 mb-7" style={{ fontFamily: "var(--font-display)" }}>Checkout</h1>
        <div className="flex gap-6 flex-wrap items-start">

          {/* Form */}
          <div className="flex-[1_1_420px] flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-7">
              <h3 className="text-base font-bold mb-5">Informasi Pengiriman</h3>
              {user?.address && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl px-3.5 py-2.5 mb-4 text-sm text-blue-700 flex items-center gap-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Data diisi otomatis dari profil. Bisa diubah jika perlu.
                </div>
              )}
              {[
                { key: "name", label: "Nama Penerima", placeholder: "Nama lengkap" },
                { key: "phone", label: "Nomor Telepon", placeholder: "08xxxxxxxxxx" },
              ].map(f => (
                <div key={f.key} className="mb-4">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{f.label}</label>
                  <input placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className={inputCls} />
                </div>
              ))}
              <div className="mb-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Alamat Lengkap</label>
                <textarea placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota" rows={3}
                  value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                  className={`${inputCls} resize-y`} />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-7">
              <h3 className="text-base font-bold mb-4">Metode Pembayaran</h3>
              {[
                { value: "transfer", label: "Transfer Bank" },
                { value: "cod", label: "Bayar di Tempat (COD)" },
                { value: "ewallet", label: "E-Wallet" },
              ].map(p => (
                <label key={p.value} className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 cursor-pointer border transition-colors ${form.payment === p.value ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
                  <input type="radio" name="payment" value={p.value} checked={form.payment === p.value}
                    onChange={() => setForm(f => ({ ...f, payment: p.value }))}
                    className="accent-blue-600" />
                  <span className="text-sm font-medium">{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="flex-[0_0_300px] bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-base font-bold mb-4">Ringkasan ({items.length} produk)</h3>
            {items.map(i => (
              <div key={i.id} className="flex justify-between items-center mb-2.5">
                <span className="text-sm text-gray-600">{i.name} x{i.qty}</span>
                <span className="text-sm font-semibold">{formatRp(i.numericPrice * i.qty)}</span>
              </div>
            ))}
            <div className="border-t border-gray-100 my-3.5 pt-3.5">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Ongkos Kirim</span>
                <span className="text-sm font-semibold text-green-600">Gratis</span>
              </div>
              <div className="flex justify-between mt-2.5">
                <span className="text-sm font-bold">Total</span>
                <span className="text-sm font-bold text-blue-600">{formatRp(total)}</span>
              </div>
            </div>
            {error && <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 mb-3 text-xs text-red-600">{error}</div>}
            <button onClick={handleOrder} disabled={loading || items.length === 0}
              className={`w-full py-3.5 rounded-xl text-sm font-bold border-none mt-2 transition-colors ${items.length > 0 ? "bg-blue-600 text-white cursor-pointer hover:bg-blue-700" : "bg-blue-200 text-white cursor-not-allowed"}`}>
              {loading ? "Memproses..." : "Buat Pesanan"}
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}