import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#000000] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Contact Us
        </h1>

        <div className="bg-[#181818] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-[#232323] border border-[rgba(255,255,255,0.1)] 
                  rounded-lg text-white focus:outline-none focus:border-[#FFD700]"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-[#232323] border border-[rgba(255,255,255,0.1)] 
                  rounded-lg text-white focus:outline-none focus:border-[#FFD700]"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 bg-[#232323] border border-[rgba(255,255,255,0.1)] 
                  rounded-lg text-white focus:outline-none focus:border-[#FFD700]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#FFD700] text-black font-medium rounded-lg 
                hover:bg-[#FFE55C] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-[#181818] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Developer</h2>
          <div className="text-[rgba(255,255,255,0.74)]">
            <p className="text-xl font-medium text-white">Shashi Shekhar</p>
            <p className="mt-2">Full Stack Developer</p>
            <div className="mt-4 space-y-2">
              <p>Email: contact@shashishekhar.com</p>
              <p>GitHub: github.com/shashishekhar</p>
              <p>LinkedIn: linkedin.com/in/shashishekhar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 