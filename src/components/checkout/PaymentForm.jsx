import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

const PaymentForm = ({ onBack, onComplete, shippingAddress }) => {
  const { total } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (paymentMethod === 'cod') {
        await onComplete({
          paymentMethod: 'cod',
          paymentStatus: 'pending',
          status: 'pending'
        });
      }
    } catch (err) {
      setError('Failed to process payment. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#181818] rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="cod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="h-4 w-4 text-[#FFD700]"
            />
            <label htmlFor="cod" className="text-white">Cash on Delivery</label>
          </div>
          
          {/* Add other payment methods here */}
        </div>

        <div className="border-t border-[rgba(255,255,255,0.1)] pt-6">
          <div className="flex justify-between text-white mb-4">
            <span>Total Amount:</span>
            <span className="font-bold">₹{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-[#FFD700] text-[#FFD700] rounded-lg 
              hover:bg-[#FFD700] hover:text-black transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-[#FFD700] text-black rounded-lg transition-colors
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FFE55C]'}`}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm; 