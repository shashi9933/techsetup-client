import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/outline';
import ProductFormModal from '../components/ProductFormModal';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    // Fetch products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/products', {
                withCredentials: true
            });
            
            // Ensure products is always an array
            const productsData = Array.isArray(response.data) ? response.data : 
                               response.data.products || [];
            
            setProducts(productsData);
            setError(null);
        } catch (err) {
            setError('Failed to fetch products');
            console.error('Error fetching products:', err);
            setProducts([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Delete product
    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${productId}`, {
                    withCredentials: true
                });
                await fetchProducts();
            } catch (err) {
                setError('Failed to delete product');
                console.error('Error deleting product:', err);
            }
        }
    };

    // Update product
    const handleUpdate = async (productId, updatedData) => {
        try {
            await axios.put(`http://localhost:5000/api/products/${productId}`, updatedData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await fetchProducts();
            setEditingProduct(null);
        } catch (err) {
            setError('Failed to update product');
            console.error('Error updating product:', err);
        }
    };

    // Add new product
    const handleAdd = async (newProduct) => {
        try {
            await axios.post('http://localhost:5000/api/products', newProduct, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await fetchProducts();
            setShowAddForm(false);
        } catch (err) {
            setError('Failed to add product');
            console.error('Error adding product:', err);
        }
    };

    if (loading) return <div className="text-white text-center py-8">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

    return (
        <div className="min-h-screen bg-[#121212] p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-[#FFD700] text-black px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add Product
                    </button>
                </div>

                {/* Product List */}
                <div className="bg-[#181818] rounded-lg overflow-hidden">
                    <table className="w-full text-white">
                        <thead className="bg-[#232323]">
                            <tr>
                                <th className="px-6 py-3 text-left">Image</th>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Price</th>
                                <th className="px-6 py-3 text-left">Category</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product._id} className="border-t border-[#232323]">
                                        <td className="px-6 py-4">
                                            <img 
                                                src={product.image} 
                                                alt={product.name} 
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4">{product.name}</td>
                                        <td className="px-6 py-4">${product.price}</td>
                                        <td className="px-6 py-4">{product.category}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setEditingProduct(product)}
                                                    className="p-2 text-[#FFD700] hover:bg-[#232323] rounded"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="p-2 text-red-500 hover:bg-[#232323] rounded"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                                        No products found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Edit Modal */}
                {editingProduct && (
                    <ProductFormModal
                        product={editingProduct}
                        onSubmit={handleUpdate}
                        onClose={() => setEditingProduct(null)}
                    />
                )}

                {/* Add Modal */}
                {showAddForm && (
                    <ProductFormModal
                        onSubmit={handleAdd}
                        onClose={() => setShowAddForm(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPanel; 