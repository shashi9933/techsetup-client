import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#000000] py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="bg-[#181818] rounded-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
            <p className="text-[rgba(255,255,255,0.74)]">
              By accessing or using TechSetup, you agree to be bound by these Terms of Service
              and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Use License</h2>
            <p className="text-[rgba(255,255,255,0.74)]">
              Permission is granted to temporarily access and use TechSetup for personal,
              non-commercial purposes. This license does not include:
            </p>
            <ul className="list-disc list-inside text-[rgba(255,255,255,0.74)] mt-4 space-y-2">
              <li>Modifying or copying materials</li>
              <li>Using materials for commercial purposes</li>
              <li>Attempting to reverse engineer any software</li>
              <li>Removing any copyright or proprietary notations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
            <p className="text-[rgba(255,255,255,0.74)]">
              TechSetup materials are provided on an 'as is' basis. We make no warranties,
              expressed or implied, and hereby disclaim all warranties including, without
              limitation, implied warranties of merchantability and fitness for a particular purpose.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms; 