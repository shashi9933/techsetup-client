import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const success = await login(credentials);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#181818] p-8 rounded-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-white">
            Admin Login
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center">{error}</div>
          )}
          
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="text-white">Email</label>
              <input
                id="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 bg-[#232323] 
                  border border-[rgba(255,255,255,0.1)] placeholder-[rgba(255,255,255,0.5)]
                  text-white rounded-lg focus:outline-none focus:ring-[#FFD700] focus:border-[#FFD700]"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="text-white">Password</label>
              <input
                id="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 bg-[#232323] 
                  border border-[rgba(255,255,255,0.1)] placeholder-[rgba(255,255,255,0.5)]
                  text-white rounded-lg focus:outline-none focus:ring-[#FFD700] focus:border-[#FFD700]"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg
              text-black bg-[#FFD700] hover:bg-[#FFE55C] focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-[#FFD700]"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 