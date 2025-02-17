import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import Settings from './Settings';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Bundles', href: '/products?type=bundle' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="bg-[#000000] sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-[#FFD700] text-xl font-bold">
            TechSetup
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white hover:text-[#FFD700] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Settings />
            <Link to="/cart" className="text-white hover:text-[#FFD700]">
              <ShoppingCartIcon className="w-6 h-6" />
            </Link>
            <Link
              to="/login"
              className="hidden md:block px-4 py-2 text-black bg-[#FFD700] rounded-lg 
                hover:bg-[#FFE55C] transition-colors font-medium"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-[#232323] transition-colors"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-[#181818] border-t border-[rgba(255,255,255,0.1)]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 rounded-lg text-white hover:bg-[#232323] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="block px-3 py-2 text-black bg-[#FFD700] rounded-lg 
                hover:bg-[#FFE55C] transition-colors font-medium text-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;