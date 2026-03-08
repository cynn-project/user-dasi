export default function OrderSuccess({ onNavigate, orderData }) {
  const { orderNumber, orderDate, paymentMethod, total } = orderData || {
    orderNumber: "-", orderDate: "-", paymentMethod: "-", total: "-",
  };

  return (
    <div style={{
      minHeight: "calc(100vh - var(--navbar-h))",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "60px 24px", fontFamily: "var(--font-body)", background: "#f8fafc",
    }}>
      <div style={{ textAlign: "center", width: "100%", maxWidth: 480 }}>

        {/* Checkmark */}
        <div style={{
          width: 88, height: 88, borderRadius: "50%",
          background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
            stroke="#059669" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: 26, color: "var(--gray-900)", marginBottom: 10,
        }}>
          Pembayaran Berhasil!
        </h1>
        <p style={{ color: "var(--gray-500)", fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
          Terima kasih telah berbelanja di DASI. Pesanan Anda sedang diproses..
        </p>

        {/* Order summary card */}
        <div style={{
          background: "#fff", borderRadius: 14,
          border: "1px solid var(--gray-200)", padding: "24px 28px",
          marginBottom: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          textAlign: "left",
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--gray-900)", marginBottom: 18 }}>
            Ringkasan Pesanan
          </h3>

          {[
            { label: "No. Pesanan", value: orderNumber },
            { label: "Tanggal", value: orderDate },
            { label: "Metode Pembayaran", value: paymentMethod },
          ].map((row, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: 14,
            }}>
              <span style={{ fontSize: 13.5, color: "var(--gray-500)" }}>{row.label}</span>
              <span style={{ fontSize: 13.5, color: "var(--gray-700)", fontWeight: 500 }}>{row.value}</span>
            </div>
          ))}

          <div style={{ borderTop: "1px solid var(--gray-100)", margin: "16px 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--gray-900)" }}>Total Pembayaran</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--blue-primary)" }}>{total}</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => onNavigate("home")}
          style={{
            padding: "14px 48px", background: "var(--blue-primary)", color: "#fff",
            border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
            fontFamily: "var(--font-body)", cursor: "pointer", transition: "background 0.18s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--blue-dark)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--blue-primary)"}
        >
          Kembali ke Beranda
        </button>

      </div>
    </div>
  );
}