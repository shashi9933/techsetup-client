import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#000000] py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">About TechSetup</h1>
        
        <div className="bg-[#181818] rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-[rgba(255,255,255,0.74)] mb-6">
            At TechSetup, we believe that having the right tools is crucial for success 
            in any profession. Our mission is to help professionals find and build the 
            perfect tech setup that matches their specific needs and enhances their 
            productivity.
          </p>
          <p className="text-[rgba(255,255,255,0.74)]">
            We combine expert knowledge, real user experiences, and detailed product 
            research to provide personalized recommendations for professionals across 
            various fields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#181818] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">What We Do</h2>
            <ul className="text-[rgba(255,255,255,0.74)] space-y-4">
              <li>• Curate professional-grade tech setups</li>
              <li>• Provide expert recommendations</li>
              <li>• Share setup guides and tutorials</li>
              <li>• Build community around tech setups</li>
            </ul>
          </div>
          
          <div className="bg-[#181818] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
            <ul className="text-[rgba(255,255,255,0.74)] space-y-4">
              <li>• Quality over quantity</li>
              <li>• User-focused recommendations</li>
              <li>• Transparent reviews</li>
              <li>• Community-driven growth</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#181818] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Our Team</h2>
          <p className="text-[rgba(255,255,255,0.74)] mb-6">
            We're a team of tech enthusiasts, professional reviewers, and industry 
            experts dedicated to helping you find the perfect tech setup. Our diverse 
            backgrounds across gaming, development, content creation, and cybersecurity 
            allow us to provide comprehensive and accurate recommendations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Team member cards can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 