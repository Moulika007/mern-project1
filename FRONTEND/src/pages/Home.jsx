import { useState } from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../components/UI/PetCard';
import { Search, Filter, Heart, Star, MapPin } from 'lucide-react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');

  // Enhanced Mock Data - Dogs first as requested
  const [pets] = useState([
    { 
      _id: '1', 
      name: 'Max', 
      category: 'Dog', 
      price: 0, 
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80', 
      description: 'Friendly Golden Retriever who loves kids and playing fetch. House trained and great with other pets.',
      age: '3 years',
      location: 'Downtown Shelter',
      traits: ['Friendly', 'House Trained', 'Good with Kids']
    },
    { 
      _id: '2', 
      name: 'Charlie', 
      category: 'Dog', 
      price: 150, 
      image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80', 
      description: 'Energetic Border Collie mix. Perfect for active families who love outdoor adventures.',
      age: '2 years',
      location: 'Westside Rescue',
      traits: ['Energetic', 'Smart', 'Loyal']
    },
    { 
      _id: '3', 
      name: 'Cooper', 
      category: 'Dog', 
      price: 0, 
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80', 
      description: 'Sweet Labrador who loves to run and play fetch. Great companion for jogging.',
      age: '4 years',
      location: 'City Animal Center',
      traits: ['Playful', 'Trained', 'Active']
    },
    { 
      _id: '4', 
      name: 'Buddy', 
      category: 'Dog', 
      price: 200, 
      image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&q=80', 
      description: 'Gentle German Shepherd mix. Protective yet loving, perfect family guardian.',
      age: '5 years',
      location: 'North Valley Shelter',
      traits: ['Protective', 'Gentle', 'Loyal']
    },
    { 
      _id: '5', 
      name: 'Luna', 
      category: 'Dog', 
      price: 0, 
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80', 
      description: 'Adorable Husky mix with beautiful blue eyes. Loves cold weather and long walks.',
      age: '1 year',
      location: 'Mountain Rescue',
      traits: ['Beautiful', 'Active', 'Friendly']
    },
    { 
      _id: '6', 
      name: 'Bella', 
      category: 'Cat', 
      price: 75, 
      image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600&q=80', 
      description: 'Quiet Persian cat who loves naps and gentle cuddles. Perfect for calm households.',
      age: '3 years',
      location: 'Downtown Shelter',
      traits: ['Quiet', 'Cuddly', 'Independent']
    },
    { 
      _id: '7', 
      name: 'Rocky', 
      category: 'Dog', 
      price: 100, 
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80', 
      description: 'Strong Pitbull mix with a heart of gold. Loves belly rubs and playing tug-of-war.',
      age: '4 years',
      location: 'Eastside Rescue',
      traits: ['Strong', 'Loving', 'Playful']
    },
    { 
      _id: '8', 
      name: 'Daisy', 
      category: 'Dog', 
      price: 0, 
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80', 
      description: 'Sweet Beagle mix who loves treats and exploring. Great nose for adventures!',
      age: '2 years',
      location: 'South Bay Shelter',
      traits: ['Curious', 'Sweet', 'Food Motivated']
    }
  ]);

  // Filter pets based on search and filters
  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pet.category === selectedCategory;
    const matchesPrice = priceFilter === 'All' || 
                        (priceFilter === 'Free' && pet.price === 0) ||
                        (priceFilter === 'Paid' && pet.price > 0);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const categories = ['All', 'Dog', 'Cat', 'Bird'];
  const priceOptions = ['All', 'Free', 'Paid'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect 
              <span className="text-yellow-300"> Furry Friend</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              🐕 Discover amazing dogs and pets waiting for their forever homes
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for Golden Retriever, Puppy, etc..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 text-lg focus:outline-none"
                  />
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 text-white font-semibold transition-colors duration-200">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 border-b">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">15,000+</div>
              <div className="text-gray-600">Pets Adopted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">Partner Shelters</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">100%</div>
              <div className="text-gray-600">Love Guaranteed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white py-6 sticky top-20 z-40 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Filters:</span>
              
              {/* Category Filter */}
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              {/* Price Filter */}
              <select 
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {priceOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div className="text-gray-600">
              <span className="font-semibold">{filteredPets.length}</span> pets found
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🐕 Amazing Dogs Looking for Homes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each of these wonderful dogs has a unique personality and is ready to bring joy to your family
          </p>
        </div>

        {/* Pet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPets.map(pet => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
        
        {filteredPets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No pets found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Add a New Family Member?</h2>
          <p className="text-xl mb-8 text-indigo-100">Join thousands of happy families who found their perfect pet</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dogs" className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-xl">
              🐕 Find Dogs
            </Link>
            <Link to="/cats" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-200 transform hover:scale-105">
              🐱 Find Cats
            </Link>
            <Link to="/sell" className="bg-yellow-400 text-indigo-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-all duration-200 transform hover:scale-105">
              💰 List Your Pet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;