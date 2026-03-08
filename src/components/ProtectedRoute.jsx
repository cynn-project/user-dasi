import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, onNavigate }) {
  const { user } = useAuth();
  if (!user) {
    return (
      <div style={{
        minHeight: "60vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 16,
        fontFamily: "var(--font-body)",
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "var(--blue-light)", display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="var(--blue-primary)" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--gray-900)" }}>Akses Dibatasi</h2>
        <p style={{ color: "var(--gray-500)", fontSize: 14 }}>Kamu perlu masuk untuk mengakses halaman ini.</p>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <button onClick={() => onNavigate("login")} style={{
            padding: "10px 28px", background: "var(--blue-primary)", color: "#fff",
            border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600,
            fontFamily: "var(--font-body)", cursor: "pointer",
          }}>Masuk</button>
          <button onClick={() => onNavigate("register")} style={{
            padding: "10px 28px", background: "var(--blue-light)", color: "var(--blue-primary)",
            border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600,
            fontFamily: "var(--font-body)", cursor: "pointer",
          }}>Daftar</button>
        </div>
      </div>
    );
  }
  return children;
}
