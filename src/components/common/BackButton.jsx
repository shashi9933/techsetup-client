import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/outline';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-white hover:text-[#FFD700] transition-colors mb-6"
    >
      <ArrowLeftIcon className="h-5 w-5 mr-2" />
      Back
    </button>
  );
};

export default BackButton; 