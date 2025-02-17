import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/outline';
import AddressForm from '../components/checkout/AddressForm';
import PaymentForm from '../components/checkout/PaymentForm';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const [step, setStep] = useState('cart'); // cart, address, payment
  const [shippingAddress, setShippingAddress] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddressSubmit = (address) => {
    setShippingAddress(address);
    setStep('payment');
  };

  const handlePaymentComplete = async (paymentDetails) => {
    try {
      // First check if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login?redirect=cart');
        return;
      }

      const orderData = {
        items: cart.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
          name: item.name // Add this for reference
        })),
        shippingAddress,
        paymentMethod: paymentDetails.paymentMethod,
        total: total,
        status: 'pending'
      };

      console.log('Sending order data:', orderData); // Debug log

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const order = await response.json();
      console.log('Order created:', order); // Debug log

      // Clear cart and redirect
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#000000] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-8">Your Cart is Empty</h1>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-[#FFD700] text-black font-medium rounded-lg 
              hover:bg-[#FFE55C] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {['Cart', 'Address', 'Payment'].map((s, index) => (
              <React.Fragment key={s}>
                <div className={`flex items-center ${step === s.toLowerCase() ? 'text-[#FFD700]' : 'text-white'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2
                    ${step === s.toLowerCase() ? 'border-[#FFD700]' : 'border-white'}`}>
                    {index + 1}
                  </div>
                  <span className="ml-2">{s}</span>
                </div>
                {index < 2 && (
                  <div className="w-16 h-0.5 bg-white" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {step === 'cart' && (
          <>
            <div className="bg-[#181818] rounded-lg p-6 mb-8">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center py-6 border-b border-[rgba(255,255,255,0.1)]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-6 flex-grow">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-[rgba(255,255,255,0.74)] text-sm">{item.profession}</p>
                    <div className="mt-2 flex items-center">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="p-1 text-white hover:text-[#FFD700]"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="mx-4 text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="p-1 text-white hover:text-[#FFD700]"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#FFD700] font-bold">
                      {formatPrice((item.discountedPrice || item.price) * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="mt-2 text-red-500 hover:text-red-400"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#181818] rounded-lg p-6">
              <div className="flex justify-between mb-4">
                <span className="text-white">Subtotal</span>
                <span className="text-white">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-white">Shipping</span>
                <span className="text-white">Free</span>
              </div>
              <div className="flex justify-between mb-6 pt-4 border-t border-[rgba(255,255,255,0.1)]">
                <span className="text-white font-bold">Total</span>
                <span className="text-[#FFD700] font-bold">{formatPrice(total)}</span>
              </div>
              <button
                onClick={() => setStep('address')}
                className="w-full py-3 bg-[#FFD700] text-black font-medium rounded-lg 
                  hover:bg-[#FFE55C] transition-colors"
              >
                Proceed to Address
              </button>
            </div>
          </>
        )}

        {step === 'address' && (
          <AddressForm 
            onSubmit={handleAddressSubmit}
            onBack={() => setStep('cart')}
          />
        )}

        {step === 'payment' && (
          <PaymentForm
            onBack={() => setStep('address')}
            onComplete={handlePaymentComplete}
            shippingAddress={shippingAddress}
          />
        )}
      </div>
    </div>
  );
};

export default Cart; 