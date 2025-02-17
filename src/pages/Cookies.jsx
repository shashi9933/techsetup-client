import React from 'react';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-[#000000] py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Cookie Policy</h1>
        
        <div className="bg-[#181818] rounded-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies</h2>
            <p className="text-[rgba(255,255,255,0.74)]">
              Cookies are small text files that are placed on your device when you visit our website.
              They help us provide you with a better experience by:
            </p>
            <ul className="list-disc list-inside text-[rgba(255,255,255,0.74)] mt-4 space-y-2">
              <li>Remembering your preferences</li>
              <li>Keeping you signed in</li>
              <li>Understanding how you use our site</li>
              <li>Improving our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold">Essential Cookies</h3>
                <p className="text-[rgba(255,255,255,0.74)]">
                  Required for the website to function properly. Cannot be disabled.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold">Analytics Cookies</h3>
                <p className="text-[rgba(255,255,255,0.74)]">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold">Preference Cookies</h3>
                <p className="text-[rgba(255,255,255,0.74)]">
                  Remember your settings and preferences for future visits.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cookies; 