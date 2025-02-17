import React from 'react';

const Partners = () => {
  return (
    <div className="min-h-screen bg-[#000000] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Our Partners</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#181818] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Become a Partner</h2>
            <p className="text-[rgba(255,255,255,0.74)] mb-6">
              Join our partner program and reach tech enthusiasts looking for quality products.
              We work with brands that share our commitment to excellence.
            </p>
            <button className="px-6 py-3 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFE55C] transition-colors">
              Apply Now
            </button>
          </div>
          
          <div className="bg-[#181818] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Partner Benefits</h2>
            <ul className="text-[rgba(255,255,255,0.74)] space-y-4">
              <li>• Access to our professional audience</li>
              <li>• Featured product placement</li>
              <li>• Marketing collaboration opportunities</li>
              <li>• Performance analytics and insights</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#181818] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-8">Featured Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Partner logos would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners; 