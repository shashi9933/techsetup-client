import React from 'react';
import { Link } from 'react-router-dom';

const professions = [
  {
    id: 'gamer',
    name: 'Gamer',
    icon: '🎮',
    description: 'High-performance gaming setups',
    bgColor: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'content-creator',
    name: 'Content Creator',
    icon: '🎥',
    description: 'Professional streaming & recording gear',
    bgColor: 'from-pink-500 to-rose-600'
  },
  {
    id: 'developer',
    name: 'Developer',
    icon: '💻',
    description: 'Productive development environments',
    bgColor: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'security-expert',
    name: 'Security Expert',
    icon: '🔒',
    description: 'Advanced security workstations',
    bgColor: 'from-green-500 to-emerald-600'
  }
];

const ProfessionSelector = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {professions.map((profession) => (
        <Link
          key={profession.id}
          to={`/profession/${profession.id}`}
          className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${profession.bgColor} 
            p-6 text-white hover:scale-105 transform transition-all duration-300`}
        >
          <div className="text-4xl mb-4">{profession.icon}</div>
          <h3 className="text-xl font-bold mb-2">{profession.name}</h3>
          <p className="text-sm opacity-90">{profession.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProfessionSelector; 