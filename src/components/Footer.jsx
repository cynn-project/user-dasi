import logoDasi from "../assets/logo_dasi.jpeg";

export default function Footer() {
  return (
    <footer style={{ background: "var(--dark-footer)", fontFamily: "var(--font-body)" }}>
      <div style={{ width: "100%", padding: "44px 40px 0" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, paddingBottom: 36 }}>

          {/* Brand */}
          <div style={{ flex: "1 1 200px", maxWidth: 260 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img src={logoDasi} alt="DASI Logo" style={{ width: 38, height: 38, objectFit: "contain" }} />
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "#fff" }}>DASI</span>
            </div>
            <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>
              DAnusan oSIs – Marketplace terpercaya untuk semua kebutuhanmu.
            </p>
          </div>

          {/* Layanan */}
          <div style={{ flex: "1 1 140px" }}>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Layanan</h4>
            {["Cara Belanja", "Cara Pembayaran", "Pengiriman"].map(l => (
              <a key={l} href="#" style={{ display: "block", color: "#64748b", fontSize: 13, marginBottom: 10, transition: "color .15s" }}
                onMouseEnter={e => e.target.style.color = "#e2e8f0"}
                onMouseLeave={e => e.target.style.color = "#64748b"}>
                {l}
              </a>
            ))}
          </div>

          {/* Tentang */}
          <div style={{ flex: "1 1 140px" }}>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Tentang</h4>
            {["Tentang Kami", "Kebijakan Privasi", "Syarat & Ketentuan"].map(l => (
              <a key={l} href="#" style={{ display: "block", color: "#64748b", fontSize: 13, marginBottom: 10, transition: "color .15s" }}
                onMouseEnter={e => e.target.style.color = "#e2e8f0"}
                onMouseLeave={e => e.target.style.color = "#64748b"}>
                {l}
              </a>
            ))}
          </div>

          {/* Hubungi */}
          <div style={{ flex: "1 1 180px" }}>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Hubungi Kami</h4>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span style={{ color: "#94a3b8", fontSize: 13 }}>support@dasi.id</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.46-1.46a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span style={{ color: "#94a3b8", fontSize: 13 }}>(021) 1234–5678</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #1e293b", padding: "18px 0", textAlign: "center" }}>
          <p style={{ color: "#475569", fontSize: 12.5 }}>
            © 2026 OSIS SMKN 7 Semarang. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}