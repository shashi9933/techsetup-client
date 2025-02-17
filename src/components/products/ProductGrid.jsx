import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, title, description }) => {
  return (
    <div>
      {title && (
        <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-4">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {description}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid; 