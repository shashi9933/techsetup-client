import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#000000] py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="bg-[#181818] rounded-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
            <p className="text-[rgba(255,255,255,0.74)]">
              We collect information that you provide directly to us, including when you create an account,
              make a purchase, or contact us for support. This may include:
            </p>
            <ul className="list-disc list-inside text-[rgba(255,255,255,0.74)] mt-4 space-y-2">
              <li>Name and contact information</li>
              <li>Payment information</li>
              <li>Shipping address</li>
              <li>Account credentials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
            <p className="text-[rgba(255,255,255,0.74)]">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-[rgba(255,255,255,0.74)] mt-4 space-y-2">
              <li>Process your orders and payments</li>
              <li>Provide customer support</li>
              <li>Send important updates about your account</li>
              <li>Improve our services and products</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
            <p className="text-[rgba(255,255,255,0.74)]">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc list-inside text-[rgba(255,255,255,0.74)] mt-4 space-y-2">
              <li>Payment processors to complete transactions</li>
              <li>Shipping partners to deliver products</li>
              <li>Service providers who assist our operations</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 