import { useState, useEffect } from 'react';
import PetCard from '../components/UI/PetCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { petAPI } from '../services/api';
import { Search, Filter, Heart } from 'lucide-react';

// Fallback dog data
const fallbackDogs = [
  {
    _id: '1',
    name: 'Max',
    category: 'Dog',
    breed: 'Golden Retriever',
    price: 0,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80',
    description: 'Friendly Golden Retriever who loves kids and playing fetch.',
    age: '3 years',
    location: 'Downtown Shelter',
    traits: ['Friendly', 'House Trained', 'Good with Kids']
  },
  {
    _id: '2',
    name: 'Charlie',
    category: 'Dog',
    breed: 'Border Collie',
    price: 150,
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80',
    description: 'Energetic Border Collie mix. Perfect for active families.',
    age: '2 years',
    location: 'Westside Rescue',
    traits: ['Energetic', 'Smart', 'Loyal']
  },
  {
    _id: '3',
    name: 'Bella',
    category: 'Dog',
    breed: 'Labrador',
    price: 0,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80',
    description: 'Sweet Labrador who loves swimming and fetch.',
    age: '4 years',
    location: 'City Animal Shelter',
    traits: ['Gentle', 'Water Lover', 'Family Friendly']
  },
  {
    _id: '4',
    name: 'Rocky',
    category: 'Dog',
    breed: 'German Shepherd',
    price: 200,
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80',
    description: 'Loyal German Shepherd, great guard dog and companion.',
    age: '5 years',
    location: 'Rescue Center',
    traits: ['Loyal', 'Protective', 'Intelligent']
  },
  {
    _id: '5',
    name: 'Luna',
    category: 'Dog',
    breed: 'Husky',
    price: 300,
    image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&q=80',
    description: 'Beautiful Husky with striking blue eyes.',
    age: '2 years',
    location: 'Mountain Rescue',
    traits: ['Energetic', 'Beautiful', 'Adventurous']
  },
  {
    _id: '6',
    name: 'Cooper',
    category: 'Dog',
    breed: 'Beagle',
    price: 0,
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&q=80',
    description: 'Friendly Beagle who loves treats and walks.',
    age: '6 years',
    location: 'Local Shelter',
    traits: ['Friendly', 'Food Motivated', 'Calm']
  }
];

const Dogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [dogs, setDogs] = useState(fallbackDogs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('Dogs component rendered with', dogs.length, 'dogs');

  // Fetch dogs from API
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setLoading(true);
        const response = await petAPI.getPetsByCategory('Dog', {
          page: 1,
          limit: 50
        });
        if (response.data.pets && response.data.pets.length > 0) {
          setDogs(response.data.pets);
        }
      } catch (err) {
        console.error('Error fetching dogs:', err);
        // Keep fallback data, don't show error
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  // Get unique breeds for filter
  const breeds = ['All', ...new Set(dogs.map(dog => dog.breed))];
  const priceOptions = ['All', 'Free', 'Under $200', '$200+'];

  // Filter dogs
  const filteredDogs = dogs.filter(dog => {
    const matchesSearch = dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dog.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBreed = selectedBreed === 'All' || dog.breed === selectedBreed;
    
    let matchesPrice = true;
    if (priceFilter === 'Free') matchesPrice = dog.price === 0;
    else if (priceFilter === 'Under $200') matchesPrice = dog.price > 0 && dog.price < 200;
    else if (priceFilter === '$200+') matchesPrice = dog.price >= 200;
    
    return matchesSearch && matchesBreed && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/20 rounded-full animate-bounce"></div>
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full animate-pulse">
              <Heart className="w-12 h-12 text-yellow-200" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            🐕 Find Your Perfect
            <span className="text-yellow-200 animate-pulse"> Dog Companion</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-orange-100">
            🏠 Discover amazing dogs waiting for their forever homes
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-8 max-w-2xl mx-auto">
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-yellow-200">500+</div>
              <div className="text-orange-100">Dogs Available</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-yellow-200">50+</div>
              <div className="text-orange-100">Breeds</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-yellow-200">100%</div>
              <div className="text-orange-100">Love Guaranteed</div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex bg-white/95 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for Golden Retriever, Puppy, etc..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 text-lg focus:outline-none bg-transparent"
                />
              </div>
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 px-8 py-4 text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-xl">
                🔍 Search Dogs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white py-6 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4">
            <Filter className="w-5 h-5 text-orange-600" />
            <span className="font-semibold text-gray-700">Filters:</span>
            
            <select 
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {breeds.map(breed => (
                <option key={breed} value={breed}>🐕 {breed}</option>
              ))}
            </select>
            
            <select 
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {priceOptions.map(option => (
                <option key={option} value={option}>💰 {option}</option>
              ))}
            </select>
            
            <div className="ml-auto text-gray-600">
              <span className="font-semibold text-orange-600">{filteredDogs.length}</span> dogs found
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🐕 Amazing Dogs Looking for Homes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each of these wonderful dogs is ready to bring joy and love to your family
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <LoadingSpinner size="xl" color="indigo" />
              <p className="mt-4 text-lg text-gray-600">Loading amazing dogs...</p>
            </div>
          </div>
        )}



        {/* Dogs Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDogs.map((dog) => {
              console.log('Rendering dog card:', dog._id, dog.name);
              return <PetCard key={dog._id} pet={dog} />;
            })}
          </div>
        )}
        
        {!loading && filteredDogs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-3xl font-bold text-gray-700 mb-4">No dogs found</h3>
            <p className="text-gray-500 text-lg mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBreed('All');
                setPriceFilter('All');
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dogs;