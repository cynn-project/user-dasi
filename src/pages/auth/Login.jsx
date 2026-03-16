import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import logoDasi from "../../assets/logo_dasi.jpeg";

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
);
const EyeIcon = ({ show }) => show ? (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
) : (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
);

export default function Login({ onNavigate }) {
  const { login } = useAuth();

  // Ambil data tersimpan dari localStorage saat komponen pertama kali dibuka
  const saved = JSON.parse(localStorage.getItem("dasi_remember") || "null");
  const [form, setForm] = useState({ email: saved?.email || "", password: saved?.password || "" });
  const [showPw, setShowPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(!!saved);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Kalau ada data tersimpan, langsung auto-login
  useEffect(() => {
    if (saved?.email && saved?.password) {
      login(saved.email, saved.password);
      onNavigate("home");
    }
  }, []);

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) { setError("Lengkapi semua field."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));

    if (rememberMe) {
      localStorage.setItem("dasi_remember", JSON.stringify({ email: form.email, password: form.password }));
    } else {
      localStorage.removeItem("dasi_remember");
    }

    const success = login(form.email, form.password);
    setLoading(false);
    if (!success) {
      setError("Email atau password salah. Coba lagi.");
      return;
    }
    onNavigate("home");
  };

  const inputCls = "w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm outline-none bg-white transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6 relative">
      <button onClick={() => onNavigate("home")}
        className="absolute top-6 left-6 flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-sm font-semibold text-gray-600 cursor-pointer shadow-sm hover:border-blue-400 hover:text-blue-600 transition-colors">
        <BackIcon /> Beranda
      </button>

      <div className="bg-white rounded-2xl px-9 py-10 w-full max-w-sm shadow-xl border border-gray-100">
        <div className="flex flex-col items-center mb-7">
          <img src={logoDasi} alt="DASI" className="w-16 h-16 object-contain mb-4" />
          <h1 className="font-extrabold text-xl text-gray-900 mb-1.5" style={{ fontFamily: "var(--font-display)" }}>Masuk ke DASI</h1>
          <p className="text-gray-500 text-sm">Selamat datang kembali!</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5 mb-4 text-red-600 text-sm">{error}</div>}

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email</label>
          <input type="email" placeholder="nama@email.com" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputCls} />
        </div>

        <div className="mb-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
          <div className="relative">
            <input type={showPw ? "text" : "password"} placeholder="••••••••" value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              className={`${inputCls} pr-11`} />
            <button onClick={() => setShowPw(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-400 cursor-pointer hover:text-gray-600 p-0.5">
              <EyeIcon show={showPw} />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="accent-blue-600 w-3.5 h-3.5" />
            Ingat saya
          </label>
          <button onClick={() => onNavigate("forgot-password")} className="bg-transparent border-none text-sm text-blue-600 font-semibold cursor-pointer">Lupa password?</button>
        </div>

        <button onClick={handleSubmit} disabled={loading}
          className={`w-full py-3 rounded-xl text-sm font-bold border-none mb-5 transition-colors ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 text-white cursor-pointer hover:bg-blue-700"}`}>
          {loading ? "Memproses..." : "Masuk"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <button onClick={() => onNavigate("register")} className="bg-transparent border-none text-blue-600 font-bold cursor-pointer text-sm">Daftar</button>
        </p>
      </div>
    </div>
  );
}