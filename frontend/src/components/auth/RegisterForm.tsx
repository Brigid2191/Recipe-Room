import React, { useState } from "react";
import { Link } from "react-router-dom";

type RegisterFormProps = {
  onSubmit: (formData: { username: string; email: string; password: string }) => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, email, password });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center text-primary">Register</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-white shadow">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>

        <div className="text-center mt-3">
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none text-primary">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
