import { useState } from "react";
import { useOrder } from "../context/OrderContext";
import OrderTabs from "../components/OrderTabs";
import ProtectedRoute from "../components/ProtectedRoute";

const statusStyle = {
  "Diproses":   "bg-orange-50 text-orange-600 border-orange-200",
  "Dikirim":    "bg-blue-50 text-blue-600 border-blue-200",
  "Selesai":    "bg-green-50 text-green-600 border-green-200",
  "Dibatalkan": "bg-red-50 text-red-600 border-red-200",
};

const tabMessages = {
  "Semua": {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
    title: "Belum Ada Pesanan", desc: "Kamu belum pernah melakukan pembelian. Yuk mulai belanja!", showBtn: true,
  },
  "Diproses": {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: "Tidak Ada Pesanan Diproses", desc: "Saat ini tidak ada pesanan yang sedang diproses.", showBtn: false,
  },
  "Dikirim": {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    title: "Tidak Ada Pesanan Dikirim", desc: "Belum ada pesanan yang sedang dalam perjalanan ke kamu.", showBtn: false,
  },
  "Selesai": {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: "Belum Ada Pesanan Selesai", desc: "Pesanan yang sudah kamu terima akan muncul di sini.", showBtn: false,
  },
  "Dibatalkan": {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
    title: "Tidak Ada Pesanan Dibatalkan", desc: "Bagus! Kamu tidak memiliki pesanan yang dibatalkan.", showBtn: false,
  },
};

function EmptyState({ tab, onNavigate }) {
  const { icon, title, desc, showBtn } = tabMessages[tab] || tabMessages["Semua"];
  return (
    <div className="py-14 flex flex-col items-center gap-3">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">{icon}</div>
      <h3 className="text-base font-bold text-gray-700 mt-1">{title}</h3>
      <p className="text-gray-400 text-sm text-center max-w-xs leading-relaxed">{desc}</p>
      {showBtn && (
        <button onClick={() => onNavigate("home")}
          className="mt-2 px-7 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold border-none cursor-pointer hover:bg-blue-700 transition-colors">
          Mulai Belanja
        </button>
      )}
    </div>
  );
}

export default function Orders({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("Semua");
  const { orders } = useOrder();
  const filtered = activeTab === "Semua" ? orders : orders.filter(o => o.status === activeTab);

  return (
    <ProtectedRoute onNavigate={onNavigate}>
      <div className="w-full min-h-[calc(100vh-64px)] bg-gray-50 px-10 py-10 pb-16">
        <h1 className="font-extrabold text-2xl text-gray-900 mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
          Pesanan Saya
        </h1>
        <p className="text-gray-500 text-sm mb-7">Pantau status pesananmu di sini</p>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {filtered.length === 0 ? (
            <EmptyState tab={activeTab} onNavigate={onNavigate} />
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map((order, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                    <div>
                      <span className="text-sm font-bold text-gray-900">{order.orderNumber}</span>
                      <span className="text-xs text-gray-400 ml-3">{order.orderDate}</span>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusStyle[order.status] || statusStyle["Diproses"]}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="flex flex-col gap-2 mb-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl shrink-0">
                          {item.emoji}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-400">x{item.qty}</p>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {"Rp " + (item.numericPrice * item.qty).toLocaleString("id-ID")}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-100 pt-3 flex justify-between items-center flex-wrap gap-2">
                    <span className="text-sm text-gray-500">{order.paymentMethod}</span>
                    <span className="text-sm font-bold text-blue-600">{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}