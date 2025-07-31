import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/authContext";

const Layout = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />

      <main className="flex-fill container py-4">
        <Outlet />
      </main>

      {/* Optional: Add your footer here if you have one */}
    </div>
  );
};

export default Layout;
