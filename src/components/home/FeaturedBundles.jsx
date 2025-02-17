import React, { useEffect, useState } from 'react';
import axios from 'axios';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const FeaturedBundles = () => {
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const response = await axios.get('/api/products/featured'); // Adjust the URL as needed
        setBundles(response.data);
      } catch (error) {
        console.error('Error fetching featured bundles:', error);
      }
    };

    fetchBundles();
  }, []);

  return (
    <section className="py-20 bg-[#000000] overflow-hidden">
      <div className="container mx-auto px-[3em]">
        <div className="text-center mb-16">
          <span className="text-[#FFD700] text-sm uppercase tracking-wider mb-4 block">
            Top Picks
          </span>
          <h2 className="text-4xl md:text-5xl font-['Open_Sans'] font-bold text-white mb-4">
            Featured Bundles
          </h2>
          <p className="text-[rgba(255,255,255,0.74)] max-w-2xl mx-auto">
            Explore our hand-picked bundles with exclusive discounts for professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bundles.map((bundle) => (
            <div key={bundle._id} className="px-4 transition-all duration-500">
              <div className="bg-[#000000] border border-[rgba(255,255,255,0.2)] rounded-lg overflow-hidden group">
                <img src={bundle.image} alt={bundle.name} className="object-cover w-full h-full" />
                <div className="p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">{bundle.name}</h3>
                  <p className="text-[rgba(255,255,255,0.74)] mb-4">{bundle.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[rgba(255,255,255,0.74)] line-through text-sm">
                        {formatPrice(bundle.price)}
                      </span>
                      <div className="text-white text-2xl font-bold">
                        {formatPrice(bundle.discountedPrice)}
                      </div>
                    </div>
                    <span className="bg-[#FFD700] text-black px-3 py-1 rounded-lg">
                      {bundle.discount}% OFF
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBundles; 