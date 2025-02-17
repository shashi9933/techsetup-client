import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLoginButton';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and redirect
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#181818] p-8 rounded-lg border border-[rgba(255,255,255,0.1)]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-[rgba(255,255,255,0.74)]">
            Or{' '}
            <Link to="/register" className="font-medium text-[#FFD700] hover:text-[#FFE55C]">
              create a new account
            </Link>
          </p>
        </div>
        <GoogleLoginButton />
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[rgba(255,255,255,0.1)]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#181818] text-[rgba(255,255,255,0.74)]">
              Or continue with email
            </span>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="text-white mb-1 block">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 bg-[#232323] 
                  border border-[rgba(255,255,255,0.1)] placeholder-[rgba(255,255,255,0.5)]
                  text-white rounded-lg focus:outline-none focus:ring-[#FFD700] focus:border-[#FFD700]"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-white mb-1 block">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 bg-[#232323] 
                  border border-[rgba(255,255,255,0.1)] placeholder-[rgba(255,255,255,0.5)]
                  text-white rounded-lg focus:outline-none focus:ring-[#FFD700] focus:border-[#FFD700]"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 bg-[#232323] border-[rgba(255,255,255,0.1)] 
                  rounded focus:ring-[#FFD700] text-[#FFD700]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[rgba(255,255,255,0.74)]">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-[#FFD700] hover:text-[#FFE55C]">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                text-sm font-medium rounded-lg text-black bg-[#FFD700] hover:bg-[#FFE55C] 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD700]"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;