import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../store';
import { resetPassword } from '../../store/authSlice';

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await dispatch(resetPassword(email)).unwrap();
      setMessage('Password reset instructions have been sent to your email.');
      setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
    } catch (err: any) {
      setError(err?.message || 'Failed to send reset instructions');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center text-primary">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light shadow-sm">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Enter your registered email address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Send Reset Link
        </button>

        <div className="text-center mt-3">
          <a href="/login" className="text-decoration-none text-primary">
            Back to Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
