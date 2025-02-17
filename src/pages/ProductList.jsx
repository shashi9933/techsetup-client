import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';
import { MicrophoneIcon, SearchIcon, XIcon, PlusIcon, MinusIcon, FilterIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [filter, setFilter] = useState('all');
  const [transcript, setTranscript] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    professions: [],
    categories: [],
    rating: 0,
    discount: 0
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    priceRange: { min: 0, max: 0 },
    categories: [],
    professions: [],
    maxDiscount: 0
  });

  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  // Speech Recognition Setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  // Fetch products on mount and filter change
  useEffect(() => {
    console.log('Component mounted, fetching products...');
    fetchProducts();
  }, [filter]);

  const calculateFilterOptions = useCallback((products) => {
    const options = {
      priceRange: {
        min: Math.min(...products.map(p => p.discountedPrice || p.price)),
        max: Math.max(...products.map(p => p.discountedPrice || p.price))
      },
      categories: [...new Set(products.map(p => p.category))],
      professions: [...new Set(products.map(p => p.profession))],
      maxDiscount: Math.max(...products.map(p => p.discount || 0))
    };
    setFilterOptions(options);
    
    // Reset filters to match new ranges
    setFilters(prev => ({
      ...prev,
      priceRange: [options.priceRange.min, options.priceRange.max],
      categories: [],
      professions: [],
      rating: 0,
      discount: 0
    }));
  }, []);

  const fetchProducts = async () => {
    try {
      let url = '/api/products/search';
      const params = new URLSearchParams();
      
      if (searchQuery) {
        params.append('query', searchQuery);
      }
      if (filter !== 'all') {
        params.append('type', filter);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const data = await api.get(url);
      if (Array.isArray(data)) {
        setProducts(data);
        calculateFilterOptions(data);
      } else {
        console.error('Invalid response format:', data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleSearch = async (query) => {
    try {
      console.log('Searching for:', query);
      
      let url = 'http://localhost:5000/api/products/search';
      const params = new URLSearchParams();
      
      if (query) {
        params.append('query', query);
      }
      if (filter !== 'all') {
        params.append('type', filter);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      console.log('Search URL:', url);
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Search results:', response.data);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
        calculateFilterOptions(response.data);
      } else {
        console.error('Invalid response format:', response.data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error searching products:', error.response || error);
      setProducts([]);
    }
  };

  // Voice search handler
  const handleVoiceSearch = (transcript) => {
    setSearchQuery(transcript);
    handleSearch(transcript);
  };

  // Voice recognition handlers
  useEffect(() => {
    if (recognition) {
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setTranscript(transcript);
        handleVoiceSearch(transcript);
        stopListening();
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, [recognition]);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const Pagination = () => (
    <div className="flex justify-center mt-8 gap-2">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg transition-colors ${
          currentPage === 1
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-[#181818] text-white hover:bg-[#FFD700] hover:text-black'
        }`}
      >
        Previous
      </button>
      
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => paginate(index + 1)}
          className={`w-10 h-10 rounded-lg transition-colors ${
            currentPage === index + 1
              ? 'bg-[#FFD700] text-black'
              : 'bg-[#181818] text-white hover:bg-[#FFD700] hover:text-black'
          }`}
        >
          {index + 1}
        </button>
      ))}
      
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg transition-colors ${
          currentPage === totalPages
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-[#181818] text-white hover:bg-[#FFD700] hover:text-black'
        }`}
      >
        Next
      </button>
    </div>
  );

  const getSortedProducts = (products) => {
    const sortedProducts = [...products];
    switch (sortBy) {
      case 'price-low':
        return sortedProducts.sort((a, b) => 
          (a.discountedPrice || a.price) - (b.discountedPrice || b.price)
        );
      case 'price-high':
        return sortedProducts.sort((a, b) => 
          (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
        );
      case 'rating':
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      case 'discount':
        return sortedProducts.sort((a, b) => 
          (b.discount || 0) - (a.discount || 0)
        );
      default:
        return sortedProducts;
    }
  };

  const getFilteredProducts = (products) => {
    return products.filter(product => {
      const price = product.discountedPrice || product.price;
      const meetsPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
      const meetsProfession = filters.professions.length === 0 || 
        filters.professions.includes(product.profession);
      const meetsCategory = filters.categories.length === 0 || 
        filters.categories.includes(product.category);
      const meetsRating = product.rating >= filters.rating;
      const meetsDiscount = (product.discount || 0) >= filters.discount;
      
      return meetsPrice && meetsProfession && meetsCategory && 
             meetsRating && meetsDiscount;
    });
  };

  const displayProducts = getSortedProducts(getFilteredProducts(products));

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Add dependency

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [handleVoiceSearch, stopListening]); // Add dependencies

  const renderFilterOptions = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="text-white font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => setFilters({
                ...filters,
                priceRange: [
                  Math.max(filterOptions.priceRange.min, parseInt(e.target.value) || 0),
                  filters.priceRange[1]
                ]
              })}
              className="w-24 px-2 py-1 bg-[#232323] text-white rounded"
              min={filterOptions.priceRange.min}
              max={filterOptions.priceRange.max}
            />
            <span className="text-white">to</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({
                ...filters,
                priceRange: [
                  filters.priceRange[0],
                  Math.min(filterOptions.priceRange.max, parseInt(e.target.value) || filterOptions.priceRange.max)
                ]
              })}
              className="w-24 px-2 py-1 bg-[#232323] text-white rounded"
              min={filterOptions.priceRange.min}
              max={filterOptions.priceRange.max}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      {filterOptions.categories.length > 0 && (
        <div>
          <h3 className="text-white font-medium mb-4">Categories</h3>
          <div className="space-y-2">
            {filterOptions.categories.map(category => (
              <label key={category} className="flex items-center space-x-2 text-white">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...filters.categories, category]
                      : filters.categories.filter(c => c !== category);
                    setFilters({ ...filters, categories: newCategories });
                  }}
                  className="text-[#FFD700] focus:ring-[#FFD700] rounded"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Professions */}
      {filterOptions.professions.length > 0 && (
        <div>
          <h3 className="text-white font-medium mb-4">Professions</h3>
          <div className="space-y-2">
            {filterOptions.professions.map(profession => (
              <label key={profession} className="flex items-center space-x-2 text-white">
                <input
                  type="checkbox"
                  checked={filters.professions.includes(profession)}
                  onChange={(e) => {
                    const newProfessions = e.target.checked
                      ? [...filters.professions, profession]
                      : filters.professions.filter(p => p !== profession);
                    setFilters({ ...filters, professions: newProfessions });
                  }}
                  className="text-[#FFD700] focus:ring-[#FFD700] rounded"
                />
                <span>{profession}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Discount Options */}
      {filterOptions.maxDiscount > 0 && (
        <div>
          <h3 className="text-white font-medium mb-4">Discount</h3>
          <div className="space-y-2">
            {[...Array(Math.floor(filterOptions.maxDiscount / 10) + 1)].map((_, i) => {
              const discountValue = (i + 1) * 10;
              return (
                <button
                  key={discountValue}
                  onClick={() => setFilters({ ...filters, discount: discountValue })}
                  className={`w-full text-left py-1 ${
                    filters.discount === discountValue ? 'text-[#FFD700]' : 'text-white'
                  }`}
                >
                  {discountValue}% or more
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Reset Filters Button */}
      <button
        onClick={() => {
          setFilters({
            priceRange: [filterOptions.priceRange.min, filterOptions.priceRange.max],
            professions: [],
            categories: [],
            rating: 0,
            discount: 0
          });
        }}
        className="text-[#FFD700] hover:text-[#FFE55C] text-sm"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#000000] py-4">
      <div className="container mx-auto px-4">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar Section */}
          <div className="w-full md:w-1/2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-20 py-4 bg-[#181818] border border-[rgba(255,255,255,0.2)] rounded-lg 
                  text-white focus:border-[#FFD700] focus:outline-none transition-colors"
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[rgba(255,255,255,0.5)]" />
              
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {recognition && (
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`p-2 rounded-full transition-colors ${
                      isListening 
                        ? 'text-[#FFD700] bg-[rgba(255,215,0,0.1)]' 
                        : 'text-[rgba(255,255,255,0.5)]'
                    }`}
                  >
                    <MicrophoneIcon className="h-5 w-5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFE55C] transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
            {isListening && (
              <div className="mt-2 flex items-center justify-between text-[rgba(255,255,255,0.74)]">
                <p>Listening... "{transcript}"</p>
                <button 
                  onClick={() => {
                    setTranscript('');
                    setSearchQuery('');
                  }}
                  className="text-[#FFD700]"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="w-full md:w-1/2 flex justify-between md:justify-end items-center gap-4">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden px-4 py-2 bg-[#232323] text-white rounded-lg 
                border border-[rgba(255,255,255,0.1)] flex items-center gap-2"
            >
              <FilterIcon className="w-5 h-5" />
              Filters
            </button>

            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg border transition-colors ${
                filter === 'all' 
                  ? 'bg-[#FFD700] text-black border-[#FFD700]' 
                  : 'text-white border-[rgba(255,255,255,0.2)] hover:border-[#FFD700]'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setFilter('bundle')}
              className={`px-6 py-2 rounded-lg border transition-colors ${
                filter === 'bundle' 
                  ? 'bg-[#FFD700] text-black border-[#FFD700]' 
                  : 'text-white border-[rgba(255,255,255,0.2)] hover:border-[#FFD700]'
              }`}
            >
              Bundles
            </button>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity md:hidden
          ${showMobileFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`fixed inset-y-0 right-0 max-w-xs w-full bg-[#181818] transition-transform
            ${showMobileFilters ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Filter Header */}
            <div className="p-4 border-b border-[rgba(255,255,255,0.1)]">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 text-white hover:text-[#FFD700]"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Filter Content */}
            <div className="p-4 overflow-y-auto h-full pb-32">
              {renderFilterOptions()}

              {/* Filter Actions */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#181818] border-t border-[rgba(255,255,255,0.1)]">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setFilters({
                        priceRange: [0, 100000],
                        professions: [],
                        categories: [],
                        rating: 0,
                        discount: 0
                      });
                    }}
                    className="flex-1 px-4 py-2 bg-[#232323] text-white rounded-lg hover:bg-[#2a2a2a]"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFE55C]"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-[#181818] p-6 rounded-lg space-y-6 sticky top-24">
              {renderFilterOptions()}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <span className="text-white">
                Found {displayProducts.length} products
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-[#232323] text-white rounded-lg border border-[rgba(255,255,255,0.1)]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.slice(indexOfFirstProduct, indexOfLastProduct).map((product) => (
                <Link 
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-lg overflow-hidden
                    relative transition-all duration-300 hover:border-[#FFD700] flex flex-col h-[450px]"
                >
                  {/* Image Section - Fixed height */}
                  <div className="relative w-full h-[200px]">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                    {product.isBundle && (
                      <span className="absolute top-4 left-4 bg-[#FFD700] text-black text-xs font-medium px-2 py-1 rounded-md">
                        Bundle
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className="absolute top-4 right-4 bg-[#FFD700] text-black text-xs font-medium px-2 py-1 rounded-md">
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col flex-grow p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[rgba(255,255,255,0.74)] text-sm">
                        {product.profession}
                      </span>
                      <div className="flex items-center text-[#FFD700]">
                        <span className="text-sm mr-1">{product.rating}</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>

                    <h3 className="text-white text-xl font-semibold mb-4 line-clamp-2 h-[56px]">
                      {product.name}
                    </h3>

                    <div className="mt-auto">
                      <div className="flex flex-col">
                        {product.discount > 0 ? (
                          <>
                            <span className="text-[rgba(255,255,255,0.74)] line-through text-sm mb-1">
                              {formatPrice(product.price)}
                            </span>
                            <span className="text-white text-2xl font-bold">
                              {formatPrice(product.discountedPrice)}
                            </span>
                          </>
                        ) : (
                          <span className="text-white text-2xl font-bold">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button with Quantity Controls */}
                  <div 
                    onClick={(e) => e.preventDefault()}
                    className="absolute bottom-4 right-4 flex items-center bg-[#232323] rounded-lg 
                      overflow-hidden border border-[rgba(255,255,255,0.1)]"
                  >
                    <button
                      onClick={() => {
                        const existingItem = cart.find(item => item._id === product._id);
                        if (existingItem && existingItem.quantity > 1) {
                          updateQuantity(product._id, existingItem.quantity - 1);
                        } else {
                          removeFromCart(product._id);
                        }
                      }}
                      className="p-2 text-white hover:text-[#FFD700] transition-colors"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    
                    <span className="px-2 text-white min-w-[20px] text-center">
                      {cart.find(item => item._id === product._id)?.quantity || 0}
                    </span>
                    
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 text-white hover:text-[#FFD700] transition-colors"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {displayProducts.length === 0 && (
              <div className="text-center text-[rgba(255,255,255,0.74)]">
                No products found. Try adjusting your filters.
              </div>
            )}

            {displayProducts.length > productsPerPage && <Pagination />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;