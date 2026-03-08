import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Cari data user yang sudah pernah daftar dari localStorage
    const saved = localStorage.getItem("dasi_user_" + email);
    if (saved) {
      const userData = JSON.parse(saved);
      setUser(userData);
    } else {
      // Belum pernah daftar, pakai email sebagai nama sementara
      setUser({ name: email.split("@")[0], email });
    }
    return true;
  };

  const register = (data) => {
    const userData = { name: data.name, email: data.email, phone: data.phone };
    // Simpan ke localStorage supaya bisa diambil saat login
    localStorage.setItem("dasi_user_" + data.email, JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);