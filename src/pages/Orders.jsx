import { useState } from "react";
import { useOrder } from "../context/OrderContext";
import OrderTabs from "../components/OrderTabs";
import ProtectedRoute from "../components/ProtectedRoute";

const statusColor = {
  "Diproses":  { bg: "#fff7ed", text: "#ea580c", border: "#fed7aa" },
  "Dikirim":   { bg: "#eff6ff", text: "#2563eb", border: "#bfdbfe" },
  "Selesai":   { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0" },
  "Dibatalkan":{ bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
};

const tabMessages = {
  "Semua": {
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
    title: "Belum Ada Pesanan",
    desc: "Silakan mulai berbelanja untuk melihat pesanan kamu di sini.",
    showBtn: true,
  },
  "Diproses": {
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Belum Ada Pesanan Diproses",
    desc: "Saat ini belum ada pesanan yang sedang diproses.",
    showBtn: false,
  },
  "Dikirim": {
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: "Belum Ada Pesanan Dikirim",
    desc: "Belum ada pesanan yang sedang dalam proses pengiriman.",
    showBtn: false,
  },
  "Selesai": {
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "Belum Ada Pesanan Selesai",
    desc: "Pesanan yang telah kamu terima akan ditampilkan di sini.",
    showBtn: false,
  },
  "Dibatalkan": {
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    ),
    title: "Tidak Ada Pesanan Dibatalkan",
    desc: "Kamu tidak memiliki pesanan yang dibatalkan.",
    showBtn: false,
  },
};

function EmptyState({ tab, onNavigate }) {
  const { icon, title, desc, showBtn } = tabMessages[tab] || tabMessages["Semua"];
  return (
    <div style={{ padding: "56px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--gray-700)", marginTop: 4 }}>{title}</h3>
      <p style={{ color: "var(--gray-400)", fontSize: 14, textAlign: "center", maxWidth: 320, lineHeight: 1.6 }}>{desc}</p>
      {showBtn && (
        <button onClick={() => onNavigate("home")} style={{
          marginTop: 8, padding: "10px 28px", background: "var(--blue-primary)", color: "#fff",
          border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600,
          fontFamily: "var(--font-body)", cursor: "pointer",
        }}>Mulai Belanja</button>
      )}
    </div>
  );
}

export default function Orders({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("Semua");
  const { orders } = useOrder();

  const filtered = activeTab === "Semua"
    ? orders
    : orders.filter(o => o.status === activeTab);

  return (
    <ProtectedRoute onNavigate={onNavigate}>
      <div style={{
        width: "100%", minHeight: "calc(100vh - var(--navbar-h) - 200px)",
        background: "#f8fafc", padding: "40px 40px 60px",
        fontFamily: "var(--font-body)",
      }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, color: "var(--gray-900)", marginBottom: 6 }}>
          Pesanan Saya
        </h1>
        <p style={{ color: "var(--gray-500)", fontSize: 14, marginBottom: 28 }}>
          Pantau status pesananmu di sini
        </p>

        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid var(--gray-200)", padding: "24px" }}>
          <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {filtered.length === 0 ? (
            <EmptyState tab={activeTab} onNavigate={onNavigate} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {filtered.map((order, idx) => {
                const sc = statusColor[order.status] || statusColor["Diproses"];
                return (
                  <div key={idx} style={{
                    border: "1px solid var(--gray-200)", borderRadius: 12,
                    padding: "20px 22px", transition: "box-shadow .2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                  >
                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--gray-900)" }}>{order.orderNumber}</span>
                        <span style={{ fontSize: 12.5, color: "var(--gray-400)", marginLeft: 12 }}>{order.orderDate}</span>
                      </div>
                      <span style={{
                        fontSize: 12.5, fontWeight: 600, padding: "4px 12px", borderRadius: 999,
                        background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`,
                      }}>{order.status}</span>
                    </div>

                    {/* Items */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                      {order.items.map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{
                            width: 44, height: 44, borderRadius: 8, background: "var(--gray-50)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 24, flexShrink: 0, border: "1px solid var(--gray-100)",
                          }}>{item.emoji}</div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 13.5, fontWeight: 600, color: "var(--gray-800)" }}>{item.name}</p>
                            <p style={{ fontSize: 12.5, color: "var(--gray-400)" }}>x{item.qty}</p>
                          </div>
                          <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--gray-700)" }}>
                            {"Rp " + (item.numericPrice * item.qty).toLocaleString("id-ID")}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div style={{
                      borderTop: "1px solid var(--gray-100)", paddingTop: 12,
                      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
                    }}>
                      <span style={{ fontSize: 13, color: "var(--gray-500)" }}>{order.paymentMethod}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <span style={{ fontSize: 13, color: "var(--gray-500)" }}>Total:</span>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "var(--blue-primary)" }}>{order.total}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}