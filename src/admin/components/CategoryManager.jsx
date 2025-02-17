import React, { useState, useEffect } from 'react';
import { PlusIcon, ChevronDownIcon } from '@heroicons/react/outline';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    parentId: null,
    attributes: [],
    sortOrder: 0
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddAttribute = () => {
    setFormData(prev => ({
      ...prev,
      attributes: [
        ...prev.attributes,
        { name: '', type: 'text', required: false, options: [] }
      ]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchCategories();
        setShowAddForm(false);
        setFormData({
          name: '',
          parentId: null,
          attributes: [],
          sortOrder: 0
        });
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="bg-[#181818] rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Categories</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFE55C]"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Category Tree */}
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category._id} className="border border-[rgba(255,255,255,0.1)] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ChevronDownIcon className="w-5 h-5 text-white" />
                <span className="text-white font-medium">{category.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-[#FFD700] hover:text-[#FFE55C]">Edit</button>
                <button className="text-red-500 hover:text-red-400">Delete</button>
              </div>
            </div>
            
            {/* Attributes */}
            {category.attributes && category.attributes.length > 0 && (
              <div className="mt-4 pl-6 border-l border-[rgba(255,255,255,0.1)]">
                <h3 className="text-sm font-medium text-[rgba(255,255,255,0.74)] mb-2">
                  Attributes
                </h3>
                <div className="space-y-2">
                  {category.attributes.map((attr, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-white">{attr.name}</span>
                      <span className="text-[rgba(255,255,255,0.74)]">{attr.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Form fields */}
        </form>
      )}
    </div>
  );
};

export default CategoryManager; 