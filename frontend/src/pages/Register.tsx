// src/pages/Register.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const userData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("recipe-room-users") || "[]");
    const isDuplicate = existingUsers.some((u: any) => u.email === userData.email);
    if (isDuplicate) {
      alert("Email already registered.");
      return;
    }

    // Save new user
    localStorage.setItem(
      "recipe-room-users",
      JSON.stringify([...existingUsers, userData])
    );

    alert("Registration successful! You can now log in.");
    navigate("/login");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" name="username" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
