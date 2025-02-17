import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaDiscord 
} from 'react-icons/fa';

const Footer = () => {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Gaming Setups', path: '/category/gaming' },
        { name: 'Streaming Gear', path: '/category/streaming' },
        { name: 'Developer Tools', path: '/category/developer' },
        { name: 'Student Essentials', path: '/category/student' },
        { name: 'Security Setup', path: '/category/security' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog', path: '/blog' },
        { name: 'Partners', path: '/partners' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com/techsetup' },
    { icon: <FaTwitter />, url: 'https://twitter.com/techsetup' },
    { icon: <FaInstagram />, url: 'https://instagram.com/techsetup' },
    { icon: <FaYoutube />, url: 'https://youtube.com/techsetup' },
    { icon: <FaDiscord />, url: 'https://discord.gg/techsetup' }
  ];

  return (
    <footer className="bg-[#181818] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">TechSetup</h2>
            <p className="text-[rgba(255,255,255,0.74)] mb-6">
              Find the perfect tech setup for your profession. Expert recommendations 
              tailored to your needs.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgba(255,255,255,0.74)] hover:text-[#FFD700] 
                    transition-colors text-xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-[rgba(255,255,255,0.74)] hover:text-[#FFD700] 
                        transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.1)] text-center">
          <p className="text-[rgba(255,255,255,0.74)]">
            © {new Date().getFullYear()} TechSetup. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 