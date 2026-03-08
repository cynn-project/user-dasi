import { useState, useRef, useEffect } from "react";
import logoDasi from "../assets/logo_dasi.jpeg";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import SearchBar from "./SearchBar";

/* ── Icons ── */
const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const LoginIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);
const RegisterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
);
const ChevronDown = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="var(--gray-500)" strokeWidth="2.5" strokeLinecap="round"
    style={{ transition: "transform 0.22s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gray-700)" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gray-700)" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ── DASI Logo ── */
const DASILogo = () => (
  <img
    src={logoDasi}
    alt="DASI Logo"
    style={{ width: 38, height: 38, objectFit: "contain" }}
  />
);

/* ── Dropdown ── */
function UserDropdown({ user, onLogout, onNavigate, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const guestItems = [
    { label: "Masuk", icon: <LoginIcon />, action: () => onNavigate("login") },
    { label: "Daftar", icon: <RegisterIcon />, action: () => onNavigate("register") },
  ];
  const userItems = [
    { label: "Profil Saya", action: () => onNavigate("profile") },
    { label: "Pesanan Saya", action: () => onNavigate("orders") },
    { label: "Keluar", action: onLogout, danger: true },
  ];
  const items = user ? userItems : guestItems;

  return (
    <div ref={ref} style={{
      position: "absolute", top: "calc(100% + 10px)", right: 0,
      background: "#fff", border: "1px solid var(--gray-200)",
      borderRadius: 12, boxShadow: "var(--shadow-lg)", minWidth: 170,
      zIndex: 500, overflow: "hidden", animation: "ddFade 0.18s ease",
    }}>
      {items.map((item, i) => (
        <button key={item.label} onClick={() => { item.action(); onClose(); }} style={{
          display: "flex", alignItems: "center", gap: 10,
          width: "100%", padding: "11px 16px",
          background: "none", border: "none", textAlign: "left",
          fontSize: 13.5, fontFamily: "var(--font-body)",
          color: item.danger ? "var(--red)" : "var(--gray-700)",
          borderBottom: i < items.length - 1 ? "1px solid var(--gray-100)" : "none",
          cursor: "pointer", transition: "background 0.13s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--gray-50)"}
          onMouseLeave={e => e.currentTarget.style.background = "none"}
        >
          {item.icon && <span style={{ color: item.danger ? "var(--red)" : "var(--gray-500)" }}>{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
export default function Navbar({ activePage, onNavigate, navSearch, setNavSearch }) {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Beranda", page: "home" },
    { label: "Pesanan", page: "orders" },
    { label: "Favorit", page: "favorites" },
  ];

  const css = `
    @keyframes ddFade { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }
    @keyframes slideDown { from { opacity:0; transform:translateY(-8px) } to { opacity:1; transform:translateY(0) } }
    .nb-link { padding:7px 16px; border-radius:8px; border:none; background:none; font-family:var(--font-body); font-size:14.5px; font-weight:500; color:var(--gray-500); cursor:pointer; transition:color .15s,background .15s; position:relative; white-space:nowrap; }
    .nb-link:hover { color:var(--gray-900); background:var(--gray-50); }
    .nb-link.active { color:var(--blue-primary); font-weight:600; }
    .nb-link.active::after { content:''; position:absolute; bottom:-20px; left:16px; right:16px; height:2.5px; background:var(--blue-primary); border-radius:2px 2px 0 0; }
    .nb-icon-btn { position:relative; width:40px; height:40px; border-radius:10px; border:none; background:none; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .15s; color:var(--gray-700); }
    .nb-icon-btn:hover { background:var(--gray-100); }
    .nb-user-btn { display:flex; align-items:center; gap:6px; padding:5px 10px 5px 6px; border-radius:10px; border:1.5px solid var(--gray-200); background:none; cursor:pointer; transition:background .15s,border-color .15s; }
    .nb-user-btn:hover { background:var(--gray-50); border-color:var(--gray-300); }
    .nb-hamburger { display:none; width:40px; height:40px; border-radius:10px; border:none; background:none; align-items:center; justify-content:center; cursor:pointer; margin-left:4px; }
    .nb-hamburger:hover { background:var(--gray-100); }
    .nb-mobile-drawer { display:none; }
    .nb-mobile-drawer.open { display:block; animation:slideDown .2s ease; }
    @media(max-width:900px) { .nb-navlinks { display:none!important; } .nb-hamburger { display:flex!important; } .nb-search-wrap { margin:0 12px!important; } }
    @media(max-width:600px) { .nb-navbar-inner { padding:0 16px!important; } .nb-search-wrap { display:none!important; } }
  `;

  return (
    <>
      <style>{css}</style>
      <header style={{
        width: "100%", position: "sticky", top: 0, zIndex: 100,
        background: "#fff", borderBottom: "1.5px solid #ebebeb",
        boxShadow: "0 1px 12px rgba(0,0,0,0.05)", fontFamily: "var(--font-body)",
      }}>
        <div className="nb-navbar-inner" style={{
          width: "100%", padding: "0 40px", height: "var(--navbar-h)",
          display: "flex", alignItems: "center",
        }}>
          {/* Logo */}
          <button onClick={() => onNavigate("home")} style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "none", border: "none", cursor: "pointer",
            flexShrink: 0, marginRight: 36,
          }}>
            <DASILogo />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--gray-900)", letterSpacing: "-0.3px" }}>DASI</span>
          </button>

          {/* Nav links */}
          <nav className="nb-navlinks" style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
            {navLinks.map(l => (
              <button key={l.page} className={`nb-link${activePage === l.page ? " active" : ""}`}
                onClick={() => onNavigate(l.page)}>
                {l.label}
              </button>
            ))}
          </nav>

          {/* Search */}
          <div className="nb-search-wrap" style={{ flex: 1, minWidth: 0, margin: "0 32px" }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text" placeholder="Cari produk di DASI..."
                value={navSearch} onChange={e => setNavSearch(e.target.value)}
                style={{
                  width: "100%", padding: "10px 18px 10px 42px",
                  background: "var(--gray-100)", border: "1.5px solid transparent",
                  borderRadius: 10, fontSize: 14, fontFamily: "var(--font-body)", color: "var(--gray-900)", outline: "none",
                }}
                onFocus={e => { e.target.style.background = "#fff"; e.target.style.borderColor = "var(--blue-muted)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)"; }}
                onBlur={e => { e.target.style.background = "var(--gray-100)"; e.target.style.borderColor = "transparent"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Cart */}
            <button className="nb-icon-btn" onClick={() => onNavigate("cart")} aria-label="Keranjang">
              <CartIcon />
              <span style={{
                position: "absolute", top: 2, right: 2,
                minWidth: 17, height: 17, background: "var(--red)", color: "#fff",
                fontSize: 10, fontWeight: 700, borderRadius: 999,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "0 4px", border: "1.5px solid #fff",
              }}>{count}</span>
            </button>

            {/* User */}
            <div style={{ position: "relative" }}>
              <button className="nb-user-btn" onClick={() => setDropdownOpen(o => !o)}>
                <span style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <UserIcon />
                </span>
                <ChevronDown open={dropdownOpen} />
              </button>
              {dropdownOpen && (
                <UserDropdown user={user} onLogout={() => { logout(); setDropdownOpen(false); }}
                  onNavigate={onNavigate} onClose={() => setDropdownOpen(false)} />
              )}
            </div>

            {/* Hamburger */}
            <button className="nb-hamburger" onClick={() => setMobileOpen(o => !o)}>
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`nb-mobile-drawer${mobileOpen ? " open" : ""}`}>
          <div style={{ background: "#fff", borderTop: "1px solid var(--gray-100)", padding: "12px 20px 16px" }}>
            <div style={{ position: "relative", marginBottom: 10 }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input type="text" placeholder="Cari produk di DASI..." value={navSearch}
                onChange={e => setNavSearch(e.target.value)}
                style={{ width: "100%", padding: "10px 18px 10px 42px", background: "var(--gray-100)", border: "1.5px solid transparent", borderRadius: 10, fontSize: 14, fontFamily: "var(--font-body)", outline: "none" }} />
            </div>
            {navLinks.map(l => (
              <button key={l.page} onClick={() => { onNavigate(l.page); setMobileOpen(false); }}
                style={{
                  display: "block", width: "100%", padding: "11px 12px",
                  background: activePage === l.page ? "var(--blue-light)" : "none",
                  border: "none", textAlign: "left", fontSize: 15,
                  fontFamily: "var(--font-body)", fontWeight: activePage === l.page ? 600 : 500,
                  color: activePage === l.page ? "var(--blue-primary)" : "var(--gray-700)",
                  borderRadius: 8, cursor: "pointer",
                }}>{l.label}</button>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}