import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import type { RootState } from "../store";

const Login = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // Go to homepage/dashboard after login
    }
  }, [user, navigate]);

  return (
    <div className="container mt-5">
      <LoginForm />
    </div>
  );
};

export default Login;
