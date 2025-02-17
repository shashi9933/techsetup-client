import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/common/Carousel';
import ProfessionSelector from '../components/home/ProfessionSelector';

const Home = () => {
  const [featuredBundles, setFeaturedBundles] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Define carousel slides
  const carouselSlides = [
    <div key="1" className="w-full h-[600px] bg-[#000000] flex items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="text-white max-w-2xl">
          <span className="text-[#FFD700] text-sm uppercase tracking-wider mb-4 block">
            Professional Tech Setups
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Setup
          </h1>
          <p className="text-lg md:text-xl mb-8 text-[rgba(255,255,255,0.74)]">
            Discover curated tech setups tailored for your profession
          </p>
          <Link 
            to="/products" 
            className="inline-block px-8 py-4 bg-[#FFD700] text-black font-medium rounded-lg hover:bg-[#FFE55C] transition-colors"
          >
            Explore Now
          </Link>
        </div>
        <div className="hidden md:block w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&q=80"
            alt="Professional Setup"
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>,
    <div key="2" className="w-full h-[600px] bg-[#000000] flex items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="text-white max-w-2xl">
          <span className="text-[#FFD700] text-sm uppercase tracking-wider mb-4 block">
            Featured Bundles
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Complete Professional Setups
          </h1>
          <p className="text-lg md:text-xl mb-8 text-[rgba(255,255,255,0.74)]">
            Get everything you need in one package with our curated bundles
          </p>
          <Link 
            to="/products?type=bundle" 
            className="inline-block px-8 py-4 bg-[#FFD700] text-black font-medium rounded-lg hover:bg-[#FFE55C] transition-colors"
          >
            View Bundles
          </Link>
        </div>
        <div className="hidden md:block w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80"
            alt="Professional Bundle"
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  ];

  // Pre-fetch data on component mount
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        // Fetch bundles
        const bundlesResponse = await fetch('/api/products/search?type=bundle', {
          signal: controller.signal,
          headers: {
            'Cache-Control': 'max-age=3600',
            'Accept': 'application/json'
          }
        });
        const bundlesData = await bundlesResponse.json();
        
        // Process bundles
        const sortedBundles = bundlesData
          .sort((a, b) => b.discount - a.discount || b.rating - a.rating)
          .slice(0, 4);
        setFeaturedBundles(sortedBundles);

        // Fetch individual products
        const productsResponse = await fetch('/api/products/search?type=individual', {
          signal: controller.signal,
          headers: {
            'Cache-Control': 'max-age=3600',
            'Accept': 'application/json'
          }
        });
        const productsData = await productsResponse.json();

        // Process products
        const sortedProducts = productsData
          .sort((a, b) => b.rating - a.rating || b.discount - a.discount)
          .slice(0, 4);
        setFeaturedProducts(sortedProducts);

      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Add guarantees data
  const guarantees = [
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "100% secure payment processing with multiple payment options"
    },
    {
      icon: "⚡",
      title: "Fast Delivery",
      description: "Express delivery within 3-5 business days nationwide"
    },
    {
      icon: "↩️",
      title: "Easy Returns",
      description: "Hassle-free returns within 7 days of delivery"
    },
    {
      icon: "✅",
      title: "Quality Guarantee",
      description: "All products are verified and quality tested"
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Hero Section */}
      <section className="pt-16 pb-12">
        <Carousel slides={carouselSlides} />
      </section>

      {/* Profession Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Choose Your Profession
          </h2>
          <p className="text-[rgba(255,255,255,0.74)] text-center mb-12 max-w-2xl mx-auto">
            Select your profession to discover tailored setup recommendations
          </p>
          <ProfessionSelector />
        </div>
      </section>

      {/* Featured Bundles */}
      <section className="py-16 px-4 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Featured Bundles
          </h2>
          <p className="text-[rgba(255,255,255,0.74)] text-center mb-12 max-w-2xl mx-auto">
            Our most popular professional setups with the best discounts
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBundles.map((bundle) => (
              <Link
                key={bundle._id}
                to={`/product/${bundle._id}`}
                className="bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="relative">
                  <img 
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-full h-48 object-cover"
                  />
                  {bundle.discount > 0 && (
                    <span className="absolute top-4 right-4 bg-[#FFD700] text-black text-xs font-medium px-2 py-1 rounded-md">
                      -{bundle.discount}%
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">
                    {bundle.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      {bundle.discount > 0 && (
                        <span className="text-[rgba(255,255,255,0.74)] line-through text-sm">
                          {formatPrice(bundle.price)}
                        </span>
                      )}
                      <span className="text-[#FFD700] font-bold">
                        {formatPrice(bundle.discountedPrice)}
                      </span>
                    </div>
                    <div className="flex items-center text-[#FFD700]">
                      <span className="mr-1">{bundle.rating}</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Top Rated Products
          </h2>
          <p className="text-[rgba(255,255,255,0.74)] text-center mb-12 max-w-2xl mx-auto">
            Discover our highest-rated products chosen by professionals
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="bg-[#181818] rounded-lg overflow-hidden group hover:scale-105 transition-all duration-300"
              >
                <div className="relative">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.discount > 0 && (
                    <span className="absolute top-4 right-4 bg-[#FFD700] text-black text-xs font-medium px-2 py-1 rounded-md">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.discount > 0 && (
                        <span className="text-[rgba(255,255,255,0.74)] line-through text-sm">
                          {formatPrice(product.price)}
                        </span>
                      )}
                      <span className="text-[#FFD700] font-bold">
                        {formatPrice(product.discountedPrice)}
                      </span>
                    </div>
                    <div className="flex items-center text-[#FFD700]">
                      <span className="mr-1">{product.rating}</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Guarantees Section */}
      <section className="py-16 px-4 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Our Commitment to You
          </h2>
          <p className="text-[rgba(255,255,255,0.74)] text-center mb-12 max-w-2xl mx-auto">
            We ensure the best shopping experience with our guarantees
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee, index) => (
              <div 
                key={index}
                className="bg-[#181818] rounded-lg p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-4">{guarantee.icon}</div>
                <h3 className="text-white text-xl font-semibold mb-2">
                  {guarantee.title}
                </h3>
                <p className="text-[rgba(255,255,255,0.74)]">
                  {guarantee.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 