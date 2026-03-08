import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import logoDasi from "../../assets/logo_dasi.jpeg";
const EyeIcon = ({ show }) => show ? (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
) : (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function Login({ onNavigate }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) { setError("Lengkapi semua field."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    login(form.email, form.password);
    setLoading(false);
    onNavigate("home");
  };

  const inputStyle = {
    width: "100%", padding: "12px 14px", border: "1.5px solid var(--gray-200)",
    borderRadius: 10, fontSize: 14, fontFamily: "var(--font-body)",
    color: "var(--gray-900)", outline: "none", transition: "border-color .18s",
    background: "#fff",
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg,#eff6ff 0%,#f0fdf4 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, fontFamily: "var(--font-body)",
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "40px 36px",
        width: "100%", maxWidth: 380,
        boxShadow: "0 20px 60px rgba(37,99,235,0.1)",
        border: "1px solid var(--gray-100)",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
          <img src={logoDasi} alt="DASI Logo" style={{ width: 72, height: 72, objectFit: "contain", marginBottom: 16 }} />
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--gray-900)", marginBottom: 6 }}>
            Masuk ke DASI
          </h1>
          <p style={{ color: "var(--gray-500)", fontSize: 14 }}>Selamat datang kembali!</p>
        </div>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "var(--red)", fontSize: 13 }}>
            {error}
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>Email</label>
          <input type="email" placeholder="nama@email.com" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = "var(--blue-primary)"}
            onBlur={e => e.target.style.borderColor = "var(--gray-200)"}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>Password</label>
          <div style={{ position: "relative" }}>
            <input type={showPw ? "text" : "password"} placeholder="••••••••" value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              style={{ ...inputStyle, paddingRight: 44 }}
              onFocus={e => e.target.style.borderColor = "var(--blue-primary)"}
              onBlur={e => e.target.style.borderColor = "var(--gray-200)"}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
            <button onClick={() => setShowPw(s => !s)} style={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", color: "var(--gray-400)", cursor: "pointer",
            }}><EyeIcon show={showPw} /></button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--gray-600)", cursor: "pointer" }}>
            <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
              style={{ width: 14, height: 14, accentColor: "var(--blue-primary)" }} />
            Ingat saya
          </label>
          <button style={{ background: "none", border: "none", fontSize: 13, color: "var(--blue-primary)", fontWeight: 600, cursor: "pointer" }}>
            Lupa password?
          </button>
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={loading} style={{
          width: "100%", padding: "13px", background: loading ? "var(--blue-muted)" : "var(--blue-primary)",
          color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
          fontFamily: "var(--font-body)", cursor: loading ? "not-allowed" : "pointer",
          transition: "background .18s", marginBottom: 20,
        }}>
          {loading ? "Memproses..." : "Masuk"}
        </button>

        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--gray-500)" }}>
          Belum punya akun?{" "}
          <button onClick={() => onNavigate("register")} style={{ background: "none", border: "none", color: "var(--blue-primary)", fontWeight: 700, cursor: "pointer", fontSize: 13.5 }}>
            Daftar
          </button>
        </p>
      </div>
    </div>
  );
}