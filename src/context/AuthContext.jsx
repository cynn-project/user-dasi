import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const saved = localStorage.getItem("dasi_user_" + email);
    if (saved) {
      const userData = JSON.parse(saved);
      // Cek password — kalau tidak cocok, tolak login
      if (userData.password && userData.password !== password) {
        return false;
      }
      setUser(userData);
      return true;
    }
    // Email belum terdaftar
    return false;
  };

  const register = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      dob: "", gender: "", address: "",
    };
    localStorage.setItem("dasi_user_" + data.email, JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  const updateProfile = (data) => {
    const updated = { ...user, ...data };
    localStorage.setItem("dasi_user_" + user.email, JSON.stringify(updated));
    setUser(updated);
  };

  const logout = () => {
    localStorage.removeItem("dasi_remember");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);