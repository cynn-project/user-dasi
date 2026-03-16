import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Orders from "../pages/Orders";
import Favorites from "../pages/Favorites";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Profile from "../pages/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Pages that use the full layout (navbar + footer)
const LAYOUT_PAGES = ["home", "orders", "favorites", "cart", "checkout", "order-success", "profile"];

export default function AppRoutes() {
  const [page, setPage] = useState("home");
  const [navSearch, setNavSearch] = useState("");
  const [orderData, setOrderData] = useState(null);

  const navigate = (target, data = null) => {
    setPage(target);
    if (target !== "home") setNavSearch("");
    if (data) setOrderData(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "home":         return <Home onNavigate={navigate} searchQuery={navSearch} />;
      case "orders":       return <Orders onNavigate={navigate} />;
      case "favorites":    return <Favorites onNavigate={navigate} />;
      case "cart":         return <Cart onNavigate={navigate} />;
      case "checkout":     return <Checkout onNavigate={navigate} />;
      case "order-success":return <OrderSuccess onNavigate={navigate} orderData={orderData} />;
      case "profile":      return <Profile onNavigate={navigate} />;
      case "login":        return <Login onNavigate={navigate} />;
      case "register":     return <Register onNavigate={navigate} />;
      case "forgot-password": return <ForgotPassword onNavigate={navigate} />;
      default:             return <Home onNavigate={navigate} searchQuery={navSearch} />;
    }
  };

  // Auth pages skip the layout
  if (page === "login" || page === "register" || page === "forgot-password") {
    return renderPage();
  }

  return (
    <MainLayout
      activePage={page}
      onNavigate={navigate}
      navSearch={navSearch}
      setNavSearch={setNavSearch}
    >
      {renderPage()}
    </MainLayout>
  );
}