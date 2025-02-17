import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }

      setStatus('Reset instructions sent to your email');
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#181818] p-8 rounded-lg border border-[rgba(255,255,255,0.1)]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-[rgba(255,255,255,0.74)]">
            Enter your email address and we'll send you a reset link
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {status && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {status}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-white mb-1 block">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none relative block w-full px-3 py-2 bg-[#232323] 
                border border-[rgba(255,255,255,0.1)] placeholder-[rgba(255,255,255,0.5)]
                text-white rounded-lg focus:outline-none focus:ring-[#FFD700] focus:border-[#FFD700]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent 
                text-sm font-medium rounded-lg text-black bg-[#FFD700] hover:bg-[#FFE55C] 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD700]
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>

          <div className="text-center">
            <Link to="/login" className="text-[#FFD700] hover:text-[#FFE55C]">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
