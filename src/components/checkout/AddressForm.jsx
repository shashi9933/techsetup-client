import React, { useState } from 'react';

const AddressForm = ({ onSubmit, onBack }) => {
  const [address, setAddress] = useState({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    addressType: 'home'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <div className="bg-[#181818] rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Shipping Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-2">Full Name</label>
            <input
              type="text"
              required
              value={address.fullName}
              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              className="w-full px-4 py-2 bg-[#232323] border border-[rgba(255,255,255,0.1)] 
                rounded-lg text-white focus:outline-none focus:border-[#FFD700]"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Phone Number</label>
            <input
              type="tel"
              required
              value={address.phoneNumber}
              onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
              className="w-full px-4 py-2 bg-[#232323] border border-[rgba(255,255,255,0.1)] 
                rounded-lg text-white focus:outline-none focus:border-[#FFD700]"
            />
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">Address Line 1</label>
          <input
            type="text"
            required
            value={address.addressLine1}
            onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
            className="w-full px-4 py-2 bg-[#232323] border border-[rgba(255,255,255,0.1)] 
              rounded-lg text-white focus:outline-none focus:border-[#FFD700]"
          />
        </div>

        <div>
          <label className="block text-white mb-2">Address Line 2 (Optional)</label>
          <input
            type="text"
            value={address.addressLine2}
            onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
            className="w-full px-4 py-2 bg-[#232323] border border-[rgba(255,255,255,0.1)] 
              rounded-lg text-white focus:outline-none focus:border-[#FFD700]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white mb-2">City</label>
            <input
              type="text"
              required
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="w-full px-4 py-2 bg-[#232323] border border-[rgba(255,255,255,0.1)] 
                rounded-lg text-white focus:outline-none focus:border-[#FFD700]"
            />
          </div>
          <div>
            <label className="block text-white mb-2">State</label>
            <input
              type="text"
              required
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              className="w-full px-4 py-2 bg-[#232323] border border-[rgba(255,255,255,0.1)] 
                rounded-lg text-white focus:outline-none focus:border-[#FFD700]"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Pincode</label>
            <input
              type="text"
              required
              value={address.pincode}
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
              className="w-full px-4 py-2 bg-[#232323] border border-[rgba(255,255,255,0.1)] 
                rounded-lg text-white focus:outline-none focus:border-[#FFD700]"
            />
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">Address Type</label>
          <div className="flex space-x-4">
            {['home', 'work', 'other'].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="addressType"
                  value={type}
                  checked={address.addressType === type}
                  onChange={(e) => setAddress({ ...address, addressType: e.target.value })}
                  className="text-[#FFD700] focus:ring-[#FFD700]"
                />
                <span className="text-white capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-[#FFD700] text-[#FFD700] rounded-lg 
              hover:bg-[#FFD700] hover:text-black transition-colors"
          >
            Back to Cart
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#FFD700] text-black rounded-lg 
              hover:bg-[#FFE55C] transition-colors"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm; 