import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Profile({ onNavigate }) {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute onNavigate={onNavigate}>
      <div style={{ width: "100%", background: "#f8fafc", padding: "40px 40px 60px", fontFamily: "var(--font-body)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, marginBottom: 28 }}>Profil Saya</h1>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid var(--gray-200)", padding: "32px", maxWidth: 480 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>

            {/* Avatar dengan SVG icon */}
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
                stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            {/* Nama & email dari data registrasi */}
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--gray-900)", marginBottom: 4 }}>
                {user?.name}
              </h2>
              <p style={{ fontSize: 14, color: "var(--gray-500)" }}>
                {user?.email}
              </p>
            </div>
          </div>

          {/* Tombol keluar */}
          <button
            onClick={() => { logout(); onNavigate("home"); }}
            style={{
              padding: "12px 28px", background: "#fef2f2", color: "var(--red)",
              border: "1px solid #fecaca", borderRadius: 10, fontSize: 14, fontWeight: 600,
              fontFamily: "var(--font-body)", cursor: "pointer", transition: "background .15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#fee2e2"}
            onMouseLeave={e => e.currentTarget.style.background = "#fef2f2"}
          >
            Keluar
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}