import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../contexts/authContext"; // assuming you have this

const Login = () => {
  const { user } = useAuth(); // this assumes you're storing the user after login
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // go to Home after login
    }
  }, [user, navigate]);

  return (
    <div className="container mt-5">
      <LoginForm />
    </div>
  );
};

export default Login;
