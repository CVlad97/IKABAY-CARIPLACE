import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'living', name: 'Living Room' },
  { id: 'dining', name: 'Dining Room' },
  { id: 'bedroom', name: 'Bedroom' },
  { id: 'office', name: 'Office' },
  { id: 'outdoor', name: 'Outdoor' },
];

const products = [
  {
    id: 1,
    name: 'Ergonomic Office Chair',
    price: 249.99,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'office',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'Modern Sofa',
    price: 899.99,
    image: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'living',
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 3,
    name: 'Dining Table Set',
    price: 649.99,
    image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'dining',
    rating: 4.9,
    reviews: 67,
  },
  {
    id: 4,
    name: 'King Size Bed',
    price: 799.99,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'bedroom',
    rating: 4.6,
    reviews: 85,
  },
  {
    id: 5,
    name: 'Coffee Table',
    price: 199.99,
    image: 'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'living',
    rating: 4.5,
    reviews: 42,
  },
  {
    id: 6,
    name: 'Nightstand',
    price: 149.99,
    image: 'https://images.pexels.com/photos/2082092/pexels-photo-2082092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'bedroom',
    rating: 4.7,
    reviews: 36,
  },
  {
    id: 7,
    name: 'Dining Chairs (set of 4)',
    price: 349.99,
    image: 'https://images.pexels.com/photos/1813502/pexels-photo-1813502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'dining',
    rating: 4.8,
    reviews: 53,
  },
  {
    id: 8,
    name: 'Bookshelf',
    price: 279.99,
    image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'living',
    rating: 4.6,
    reviews: 29,
  },
  {
    id: 9,
    name: 'Outdoor Dining Set',
    price: 599.99,
    image: 'https://images.pexels.com/photos/261154/pexels-photo-261154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'outdoor',
    rating: 4.7,
    reviews: 41,
  },
  {
    id: 10,
    name: 'Standing Desk',
    price: 349.99,
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'office',
    rating: 4.9,
    reviews: 87,
  },
  {
    id: 11,
    name: 'Lounge Chair',
    price: 249.99,
    image: 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'living',
    rating: 4.8,
    reviews: 64,
  },
  {
    id: 12,
    name: 'Outdoor Sofa',
    price: 449.99,
    image: 'https://images.pexels.com/photos/3216564/pexels-photo-3216564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'outdoor',
    rating: 4.5,
    reviews: 32,
  },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    document.title = 'Products - IKABAY';
  }, []);

  useEffect(() => {
    let result = activeCategory === 'all'
      ? [...products]
      : products.filter(product => product.category === activeCategory);

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, you'd use date fields
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - use default order
        break;
    }

    setFilteredProducts(result);
  }, [activeCategory, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Collection</h1>
          <p className="text-xl text-gray-300 mb-8">
            Explore our carefully curated selection of furniture and home accessories.
            Each piece is designed with both aesthetics and functionality in mind.
          </p>
        </div>
      </Section>

      {/* Products Section */}
      <Section className="bg-white">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="border-t border-gray-200 my-6 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="price-any"
                      type="radio"
                      name="price"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="price-any" className="ml-2 text-gray-700">
                      Any
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="price-under-200"
                      type="radio"
                      name="price"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="price-under-200" className="ml-2 text-gray-700">
                      Under $200
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="price-200-500"
                      type="radio"
                      name="price"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="price-200-500" className="ml-2 text-gray-700">
                      $200 - $500
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="price-500-1000"
                      type="radio"
                      name="price"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="price-500-1000" className="ml-2 text-gray-700">
                      $500 - $1000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="price-over-1000"
                      type="radio"
                      name="price"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="price-over-1000" className="ml-2 text-gray-700">
                      Over $1000
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 my-6 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input
                        id={`rating-${rating}`}
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                      />
                      <label htmlFor={`rating-${rating}`} className="ml-2 flex items-center text-gray-700">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        <span className="ml-1">& Up</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center"
              >
                <Filter size={18} className="mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-3 py-1 rounded-md text-sm transition-colors ${
                          activeCategory === category.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 my-4 pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Price Range</h3>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue="any"
                    >
                      <option value="any">Any</option>
                      <option value="under-200">Under $200</option>
                      <option value="200-500">$200 - $500</option>
                      <option value="500-1000">$500 - $1000</option>
                      <option value="over-1000">Over $1000</option>
                    </select>
                  </div>

                  <div className="border-t border-gray-200 my-4 pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Rating</h3>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue="any"
                    >
                      <option value="any">Any</option>
                      <option value="4">4★ & Up</option>
                      <option value="3">3★ & Up</option>
                      <option value="2">2★ & Up</option>
                      <option value="1">1★ & Up</option>
                    </select>
                  </div>

                  <Button variant="primary" size="md" className="w-full mt-4">
                    Apply Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Product Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <p className="text-gray-600 mb-4 sm:mb-0">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
                <div className="flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2 ${
                      view === 'grid' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-2 ${
                      view === 'list' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'
                    }`}
                    aria-label="List view"
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid or List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`${
                view === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'grid grid-cols-1 gap-6'
              }`}
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants} className="group">
                  {view === 'grid' ? (
                    // Grid View
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="primary" size="sm" fullWidth>
                            Quick View
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                        <p className="mt-1 text-xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-1 text-sm text-gray-500">
                              ({product.reviews})
                            </span>
                          </div>
                          <span className="text-sm text-green-600">In Stock</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div className="flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="sm:w-1/3 relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 sm:h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 sm:p-6 sm:w-2/3 flex flex-col">
                        <h3 className="text-xl font-medium text-gray-900">{product.name}</h3>
                        <p className="mt-1 text-xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                        
                        <div className="mt-2 flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-sm text-gray-500">
                            ({product.reviews} reviews)
                          </span>
                        </div>
                        
                        <p className="mt-3 text-gray-600 flex-grow">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        
                        <div className="mt-4 flex gap-4">
                          <Button variant="primary" size="md">
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="md">
                            Quick View
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center">
                <button className="px-2 py-1 border border-gray-300 rounded-l-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border-t border-b border-gray-300 text-blue-600 bg-blue-50 font-medium">
                  1
                </button>
                <button className="px-3 py-1 border-t border-b border-gray-300 text-gray-700 bg-white hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border-t border-b border-gray-300 text-gray-700 bg-white hover:bg-gray-50">
                  3
                </button>
                <span className="px-3 py-1 border-t border-b border-gray-300 text-gray-700 bg-white">
                  ...
                </span>
                <button className="px-3 py-1 border-t border-b border-gray-300 text-gray-700 bg-white hover:bg-gray-50">
                  10
                </button>
                <button className="px-2 py-1 border border-gray-300 rounded-r-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ProductsPage;