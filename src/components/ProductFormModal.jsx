import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';

const ProductFormModal = ({ product, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(product || {
        name: '',
        description: '',
        price: '',
        discountedPrice: '',
        image: '',
        category: '',
        profession: '',
        brand: '',
        stock: '',
        discount: 0,
        isBundle: false,
        specifications: {},
        features: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(product?._id, formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#181818] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">
                            {product ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-[#FFD700]"
                        >
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Basic Information */}
                        <div>
                            <label className="block text-white mb-2">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-[#232323] text-white px-4 py-2 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full bg-[#232323] text-white px-4 py-2 rounded"
                                rows="3"
                                required
                            />
                        </div>

                        {/* Pricing */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white mb-2">Price</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                    className="w-full bg-[#232323] text-white px-4 py-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">Discounted Price</label>
                                <input
                                    type="number"
                                    value={formData.discountedPrice}
                                    onChange={(e) => setFormData({...formData, discountedPrice: Number(e.target.value)})}
                                    className="w-full bg-[#232323] text-white px-4 py-2 rounded"
                                    required
                                />
                            </div>
                        </div>

                        {/* Image and Category */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                                    className="w-full bg-[#232323] text-white px-4 py-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    className="w-full bg-[#232323] text-white px-4 py-2 rounded"
                                    required
                                />
                            </div>
                        </div>

                        {/* Profession and Brand */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white mb-2">Profession</label>
                                <input
                                    type="text"
                                    value={formData.profession}
                                    onChange={(e) => setFormData({...formData, profession: e.target.value})}
                                    className="w-full bg-[#232323] text-white px-4 py-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">Brand</label>
                                <input
                                    type="text"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                                    className="w-full bg-[#232323] text-white px-4 py-2 rounded"
                                    required
                                />
                            </div>
                        </div>

                        {/* Stock and Discount */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white mb-2">Stock</label>
                                <input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                                    className="w-full bg-[#232323] text-white px-4 py-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">Discount %</label>
                                <input
                                    type="number"
                                    value={formData.discount}
                                    onChange={(e) => setFormData({...formData, discount: Number(e.target.value)})}
                                    className="w-full bg-[#232323] text-white px-4 py-2 rounded"
                                    min="0"
                                    max="100"
                                />
                            </div>
                        </div>

                        {/* Bundle Option */}
                        <div>
                            <label className="flex items-center space-x-2 text-white">
                                <input
                                    type="checkbox"
                                    checked={formData.isBundle}
                                    onChange={(e) => setFormData({...formData, isBundle: e.target.checked})}
                                    className="form-checkbox text-[#FFD700]"
                                />
                                <span>Is Bundle</span>
                            </label>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-white hover:text-[#FFD700]"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#FFD700] text-black rounded hover:bg-[#FFE55C]"
                            >
                                {product ? 'Update' : 'Add'} Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductFormModal; 