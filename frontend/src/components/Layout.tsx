// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../contexts/authContext"; // make sure this path is correct

const Layout = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
