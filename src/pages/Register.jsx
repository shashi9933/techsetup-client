import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profession: 'student' // Add default profession
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
        setError("Passwords don't match");
        setLoading(false);
        return;
    }

    try {
        console.log('Sending registration data...'); // Debug log
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                profession: formData.profession
            })
        });

        const data = await response.json();
        console.log('Registration response:', data); // Debug log

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        // Store the token
        localStorage.setItem('token', data.token);
        
        // Redirect to home page or dashboard
        navigate('/');
    } catch (err) {
        console.error('Registration error:', err);
        setError(err.message || 'Registration failed');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#181818] p-8 rounded-lg border border-[rgba(255,255,255,0.1)]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-[rgba(255,255,255,0.74)]">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#FFD700] hover:text-[#FFE55C]">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 bg-[#232323] 
                  border border-[rgba(255,255,255,0.1)] placeholder-[rgba(255,255,255,0.5)]
                  text-white rounded-lg focus:outline-none focus:ring-[#FFD700] focus:border-[#FFD700]"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
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
              <label htmlFor="profession" className="sr-only">Profession</label>
              <select
                id="profession"
                name="profession"
                required
                className="appearance-none relative block w-full px-3 py-2 bg-[#232323] 
                  border border-[rgba(255,255,255,0.1)] text-white rounded-lg 
                  focus:outline-none focus:ring-[#FFD700] focus:border-[#FFD700]"
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
              >
                <option value="student">Student</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="gamer">Gamer</option>
                <option value="content-creator">Content Creator</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
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

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 bg-[#232323] 
                  border border-[rgba(255,255,255,0.1)] placeholder-[rgba(255,255,255,0.5)]
                  text-white rounded-lg focus:outline-none focus:ring-[#FFD700] focus:border-[#FFD700]"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 