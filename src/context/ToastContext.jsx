import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ message, type = "success", duration = 2500 }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container */}
      <div style={{
        position: "fixed", bottom: 28, right: 28,
        display: "flex", flexDirection: "column", gap: 10,
        zIndex: 9999, pointerEvents: "none",
      }}>
        {toasts.map(toast => (
          <div key={toast.id} style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "#fff", borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
            padding: "14px 18px",
            border: `1.5px solid ${toast.type === "success" ? "#bbf7d0" : toast.type === "error" ? "#fecaca" : "#bfdbfe"}`,
            fontFamily: "var(--font-body)",
            fontSize: 14, fontWeight: 500,
            color: "var(--gray-800)",
            minWidth: 260, maxWidth: 340,
            pointerEvents: "auto",
            animation: "toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
          }}>
            {/* Icon */}
            <div style={{
              width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: toast.type === "success" ? "#f0fdf4" : toast.type === "error" ? "#fef2f2" : "#eff6ff",
            }}>
              {toast.type === "success" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {toast.type === "error" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              )}
              {toast.type === "info" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
            </div>

            {/* Message */}
            <span style={{ flex: 1, lineHeight: 1.45 }}>{toast.message}</span>

            {/* Close button */}
            <button onClick={() => removeToast(toast.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--gray-400)", padding: 2, flexShrink: 0,
              display: "flex", alignItems: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(40px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);