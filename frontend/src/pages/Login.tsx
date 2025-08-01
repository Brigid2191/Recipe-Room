import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const users = JSON.parse(localStorage.getItem("recipe-room-users") || "[]");
    const matchedUser = users.find(
      (user: any) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      alert("Invalid email or password.");
      return;
    }

    // Store logged-in user
    localStorage.setItem("recipe-room-auth", JSON.stringify(matchedUser));

    // Dispatch a custom event so components listening for auth can update
    window.dispatchEvent(new Event("authChange"));

    alert("Login successful!");
    navigate("/");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
