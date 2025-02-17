import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/solid';

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    image,
    price,
    rating,
    reviews,
    category,
    brand,
    isAffiliate = true
  } = product;

  return (
    <Link 
      to={`/product/${id}`}
      className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="aspect-w-4 aspect-h-3 bg-gray-200 group-hover:opacity-75 transition-opacity">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-center object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              {name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {brand}
            </p>
          </div>
          {isAffiliate && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
              Affiliate
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={`${
                  product.rating > rating ? 'text-yellow-400' : 'text-gray-200'
                } h-4 w-4 flex-shrink-0`}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="ml-2 text-sm text-gray-500">
            {reviews} reviews
          </p>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium text-gray-900">
            ₹{price.toLocaleString()}
          </p>
          <span className="text-sm text-gray-500">
            {category}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 