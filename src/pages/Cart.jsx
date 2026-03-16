import { useCart } from "../context/CartContext";

const formatRp = n => "Rp " + n.toLocaleString("id-ID");

export default function Cart({ onNavigate }) {
  const { items, removeFromCart, updateQty, total, count } = useCart();

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-gray-50 px-10 py-10 pb-16">
      <h1 className="font-extrabold text-2xl text-gray-900 mb-8" style={{ fontFamily: "var(--font-display)" }}>Keranjang Belanja</h1>

      <div className="flex gap-6 items-start flex-wrap">
        {/* Items */}
        <div className="flex-[1_1_500px] bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {items.length === 0 ? (
            <div className="py-20 px-10 flex flex-col items-center gap-4">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <h3 className="text-lg font-bold text-gray-700">Keranjang Kosong</h3>
              <p className="text-gray-400 text-sm">Yuk, mulai belanja dan temukan produk favoritmu!</p>
              <button onClick={() => onNavigate("home")}
                className="mt-2 px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold border-none cursor-pointer hover:bg-blue-700 transition-colors">
                Mulai Belanja
              </button>
            </div>
          ) : (
            items.map((item, i) => (
              <div key={item.id} className={`flex items-center gap-4 px-6 py-4 ${i < items.length - 1 ? "border-b border-gray-100" : ""}`}>
                <div className="w-[70px] h-[70px] rounded-xl bg-gray-50 flex items-center justify-center text-4xl shrink-0">{item.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 mb-1">{item.name}</p>
                  <p className="text-sm font-bold text-blue-600">{item.price}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button onClick={() => updateQty(item.id, item.qty - 1)}
                    className="w-7 h-7 rounded-md border border-gray-200 bg-white cursor-pointer text-base font-bold flex items-center justify-center hover:bg-gray-50">−</button>
                  <span className="text-sm font-semibold min-w-[20px] text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}
                    className="w-7 h-7 rounded-md border border-gray-200 bg-white cursor-pointer text-base font-bold flex items-center justify-center hover:bg-gray-50">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)}
                  className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                    <path d="M10 11v6"/><path d="M14 11v6"/>
                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="flex-[0_0_300px] bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-5">Ringkasan Pesanan</h3>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-600">Subtotal ({count} item)</span>
            <span className="text-sm font-semibold">{formatRp(total)}</span>
          </div>
          <div className="flex justify-between pb-5 border-b border-gray-100">
            <span className="text-sm text-gray-600">Ongkos Kirim</span>
            <span className="text-sm font-semibold text-green-600">Gratis</span>
          </div>
          <div className="flex justify-between mt-4 mb-5">
            <span className="text-sm font-bold">Total</span>
            <span className="text-sm font-bold text-blue-600">{formatRp(total)}</span>
          </div>
          <button onClick={() => items.length > 0 && onNavigate("checkout")}
            className={`w-full py-3.5 rounded-xl text-sm font-bold border-none transition-colors ${items.length > 0 ? "bg-blue-600 text-white cursor-pointer hover:bg-blue-700" : "bg-blue-200 text-white cursor-not-allowed"}`}>
            Lanjut ke Checkout
          </button>
        </div>
      </div>
    </div>
  );
}