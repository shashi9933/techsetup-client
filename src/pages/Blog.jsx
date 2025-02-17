import React from 'react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Essential Tools for Remote Developers",
      excerpt: "Discover the must-have tools and equipment for a productive remote development setup.",
      date: "2024-01-15",
      category: "Development",
      image: "https://example.com/blog1.jpg"
    },
    // Add more blog posts
  ];

  return (
    <div className="min-h-screen bg-[#000000] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-[#181818] rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-[rgba(255,255,255,0.74)] mb-2">
                  <span>{post.category}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
                <p className="text-[rgba(255,255,255,0.74)] mb-4">{post.excerpt}</p>
                <button className="text-[#FFD700] hover:text-[#FFE55C] transition-colors">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog; 