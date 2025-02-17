import React from 'react';

const Careers = () => {
  const openings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    // Add more job openings
  ];

  return (
    <div className="min-h-screen bg-[#000000] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Careers at TechSetup</h1>
        
        <div className="bg-[#181818] rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Join Our Team</h2>
          <p className="text-[rgba(255,255,255,0.74)] mb-6">
            We're looking for passionate individuals who want to help professionals 
            find their perfect tech setup. Join us in our mission to revolutionize 
            how people work with technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#232323] rounded-lg">
              <h3 className="text-white font-bold mb-2">Innovation First</h3>
              <p className="text-[rgba(255,255,255,0.74)]">
                We encourage creative solutions and embrace new technologies.
              </p>
            </div>
            <div className="p-6 bg-[#232323] rounded-lg">
              <h3 className="text-white font-bold mb-2">Work-Life Balance</h3>
              <p className="text-[rgba(255,255,255,0.74)]">
                Flexible schedules and remote-first environment.
              </p>
            </div>
            <div className="p-6 bg-[#232323] rounded-lg">
              <h3 className="text-white font-bold mb-2">Growth Opportunities</h3>
              <p className="text-[rgba(255,255,255,0.74)]">
                Continuous learning and career development support.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#181818] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-8">Open Positions</h2>
          <div className="space-y-6">
            {openings.map(job => (
              <div 
                key={job.id} 
                className="p-6 border border-[rgba(255,255,255,0.1)] rounded-lg hover:border-[#FFD700] transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{job.title}</h3>
                    <p className="text-[rgba(255,255,255,0.74)]">{job.department}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[#FFD700]">{job.type}</span>
                    <p className="text-[rgba(255,255,255,0.74)]">{job.location}</p>
                  </div>
                </div>
                <button className="text-[#FFD700] hover:text-[#FFE55C] transition-colors">
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers; 