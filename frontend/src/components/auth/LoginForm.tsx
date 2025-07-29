import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import type { AppDispatch } from "../../store";
import { loginUser } from "../../store/authSlice";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center text-primary">Login</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-white shadow">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-decoration-none d-block">
            Forgot Password?
          </Link>
          <span className="d-block mt-2">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-decoration-none text-primary">
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
