import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  UploadIcon, 
  FilterIcon,
  PencilIcon,
  TrashIcon,
  ExclamationIcon 
} from '@heroicons/react/outline';
import { Dialog } from '@headlessui/react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fileUpload, setFileUpload] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountedPrice: '',
    category: '',
    profession: '',
    stock: '',
    brand: '',
    images: [],
    specifications: {},
    features: [],
    isBundle: false,
    bundleItems: []
  });

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      // Handle image upload to cloud storage first
      const imageUrls = await Promise.all(
        formData.images.map(async (image) => {
          const formData = new FormData();
          formData.append('file', image);
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          });
          return response.json();
        })
      );

      // Create product with image URLs
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          images: imageUrls
        })
      });

      if (response.ok) {
        fetchProducts();
        setShowAddModal(false);
        setFormData({
          name: '',
          description: '',
          price: '',
          discountedPrice: '',
          category: '',
          profession: '',
          stock: '',
          brand: '',
          images: [],
          specifications: {},
          features: [],
          isBundle: false,
          bundleItems: []
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', fileUpload);

    try {
      const response = await fetch('/api/admin/products/bulk-upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        fetchProducts();
        setFileUpload(null);
      }
    } catch (error) {
      console.error('Error uploading products:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Products</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFE55C]"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Product</span>
          </button>
          <label className="flex items-center space-x-2 px-4 py-2 bg-[#181818] text-white rounded-lg hover:bg-[#232323] cursor-pointer">
            <UploadIcon className="w-5 h-5" />
            <span>Bulk Upload</span>
            <input
              type="file"
              className="hidden"
              accept=".csv,.xlsx"
              onChange={(e) => setFileUpload(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-[#181818] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#232323]">
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,255,255,0.1)]">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-[#232323]">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {product.name}
                      </div>
                      <div className="text-sm text-[rgba(255,255,255,0.74)]">
                        {product.brand}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  ₹{product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.stock > 10
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setFormData(product);
                      setShowAddModal(true);
                    }}
                    className="text-[#FFD700] hover:text-[#FFE55C] mr-4"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-500 hover:text-red-400"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Modal */}
      <Dialog
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        {/* Modal content */}
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        {/* Modal content */}
      </Dialog>
    </div>
  );
};

export default Products; 