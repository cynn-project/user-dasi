import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Profile({ onNavigate }) {
  const { user, logout, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", dob: user?.dob || "", gender: user?.gender || "", address: user?.address || "" });
  const [saved, setSaved] = useState(false);

  const handleSave = () => { updateProfile(form); setEditing(false); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const handleCancel = () => { setForm({ name: user?.name || "", phone: user?.phone || "", dob: user?.dob || "", gender: user?.gender || "", address: user?.address || "" }); setEditing(false); };

  const initials = user?.name?.charAt(0)?.toUpperCase() || "U";

  const fieldCls = (disabled) => `flex items-center border rounded-xl overflow-hidden transition-colors ${disabled ? "border-gray-100 bg-gray-50" : "border-gray-200 bg-white focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"}`;
  const inputCls = (editing) => `flex-1 border-none outline-none py-3 text-sm bg-transparent ${editing ? "text-gray-900" : "text-gray-400"}`;

  return (
    <ProtectedRoute onNavigate={onNavigate}>
      <div className="w-full min-h-[calc(100vh-64px)] bg-gray-50 px-10 py-11 pb-16">
        <div className="flex gap-6 items-start max-w-[1100px] mx-auto flex-wrap">

          {/* Kiri */}
          <div className="flex-[0_0_260px] bg-white rounded-2xl border border-gray-200 px-6 py-7 flex flex-col items-center text-center">
            <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-2xl font-extrabold mb-3.5" style={{ fontFamily: "var(--font-display)" }}>
              {initials}
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-1.5">{user?.name}</h2>
            <p className="text-sm text-gray-500 mb-6 break-all">{user?.email}</p>
            <div className="w-full border-t border-gray-100 mb-5" />
            <button onClick={() => { logout(); onNavigate("home"); }}
              className="w-full py-2.5 bg-red-50 text-red-500 border border-red-200 rounded-xl text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Keluar
            </button>
          </div>

          {/* Kanan */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 px-8 py-7">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Informasi Pribadi</h3>
                <p className="text-sm text-gray-500">Kelola data profil Anda untuk keamanan akun</p>
              </div>
              {!editing && (
                <button onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-xl text-sm font-semibold cursor-pointer hover:bg-blue-100 transition-colors shrink-0">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit
                </button>
              )}
            </div>

            {saved && (
              <div className="bg-green-50 border border-green-200 rounded-xl px-3.5 py-2.5 mb-5 text-sm text-green-700 font-semibold flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                Perubahan berhasil disimpan!
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Nama */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Lengkap</label>
                <div className={fieldCls(!editing)}>
                  <span className="px-3 text-gray-400 flex items-center shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} readOnly={!editing} placeholder="Nama lengkap" className={inputCls(editing)} style={{ cursor: editing ? "text" : "default" }} />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
                <div className="flex items-center border border-gray-100 rounded-xl bg-gray-50 overflow-hidden">
                  <span className="px-3 text-gray-400 flex items-center shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                  <input value={user?.email || ""} readOnly className="flex-1 border-none outline-none py-3 text-sm text-gray-400 bg-transparent" />
                </div>
              </div>
              {/* Telepon */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nomor Telepon</label>
                <div className={fieldCls(!editing)}>
                  <span className="px-3 text-gray-400 flex items-center shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.62 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 3.12 4.18 2 2 0 0 1 5.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.91 9.09a16 16 0 0 0 6 6l.46-.46a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} readOnly={!editing} placeholder="+62 8xx-xxxx-xxxx" className={inputCls(editing)} style={{ cursor: editing ? "text" : "default" }} />
                </div>
              </div>
              {/* Tanggal Lahir */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tanggal Lahir</label>
                <div className={fieldCls(!editing)}>
                  <span className="px-3 text-gray-400 flex items-center shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>
                  <input type={editing ? "date" : "text"} value={form.dob} onChange={e => setForm(f => ({ ...f, dob: e.target.value }))} readOnly={!editing} placeholder="Belum diisi" className={inputCls(editing)} style={{ cursor: editing ? "text" : "default" }} />
                </div>
              </div>
            </div>

            {/* Jenis Kelamin */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Jenis Kelamin</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
                <select value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))} disabled={!editing}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm appearance-none outline-none transition-colors ${!editing ? "border-gray-100 bg-gray-50 text-gray-400" : "border-gray-200 bg-white text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"}`}
                  style={{ cursor: editing ? "pointer" : "default" }}>
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {editing && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg></span>}
              </div>
            </div>

            {/* Alamat */}
            <div className={editing ? "mb-7" : ""}>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Alamat Lengkap</label>
              <div className={`flex items-start border rounded-xl overflow-hidden transition-colors ${!editing ? "border-gray-100 bg-gray-50" : "border-gray-200 bg-white focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"}`}>
                <span className="pt-3 px-3 text-gray-400 shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
                <textarea value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} readOnly={!editing}
                  placeholder={editing ? "Jl. Contoh No. 123, Kelurahan, Kecamatan, Kota" : "Belum diisi"} rows={3}
                  className={`flex-1 border-none outline-none py-3 pr-3 text-sm bg-transparent resize-none ${editing ? "text-gray-900" : "text-gray-400"}`}
                  style={{ cursor: editing ? "text" : "default" }} />
              </div>
            </div>

            {editing && (
              <div className="flex justify-end gap-3 mt-1">
                <button onClick={handleCancel} className="px-6 py-2.5 bg-transparent border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors">Batal</button>
                <button onClick={handleSave} className="px-7 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold border-none cursor-pointer hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Simpan Perubahan
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}