import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/outline';

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-[#000000] py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-[rgba(255,255,255,0.74)] mb-8">
          Thank you for your order. We'll send you a confirmation email with your order details.
        </p>
        <div className="space-x-4">
          <Link
            to="/profile/orders"
            className="inline-block px-6 py-3 bg-[#FFD700] text-black font-medium rounded-lg 
              hover:bg-[#FFE55C] transition-colors"
          >
            View Orders
          </Link>
          <Link
            to="/products"
            className="inline-block px-6 py-3 border border-[#FFD700] text-[#FFD700] 
              font-medium rounded-lg hover:bg-[#FFD700] hover:text-black transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 