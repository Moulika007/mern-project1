import { useState, useEffect } from 'react';
import PetCard from '../components/UI/PetCard';
import AnimatedProgressBar from '../components/UI/AnimatedProgressBar';
import FloatingActionButton from '../components/UI/FloatingActionButton';
import { Search, Filter, Heart, Star, MapPin, Sparkles } from 'lucide-react';

const Cats = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [ageFilter, setAgeFilter] = useState('All');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero carousel images for cats
  const heroImages = [
    'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=1200&q=80',
    'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=1200&q=80',
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=80',
    'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1200&q=80'
  ];

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Comprehensive cat data with 15+ cats and breed variety
  const [cats] = useState([
    {
      _id: '1',
      name: 'Bella',
      category: 'Cat',
      breed: 'Persian',
      price: 75,
      image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600&q=80',
      description: 'Quiet Persian cat who loves naps and gentle cuddles. Perfect for calm households.',
      age: '3 years',
      location: 'Downtown Shelter',
      traits: ['Quiet', 'Cuddly', 'Independent', 'Gentle']
    },
    {
      _id: '2',
      name: 'Luna',
      category: 'Cat',
      breed: 'Maine Coon',
      price: 0,
      image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&q=80',
      description: 'Very independent and calm Maine Coon. Great with other pets and loves to explore.',
      age: '2 years',
      location: 'Westside Rescue',
      traits: ['Independent', 'Calm', 'Large', 'Friendly']
    },
    {
      _id: '3',
      name: 'Whiskers',
      category: 'Cat',
      breed: 'Siamese',
      price: 120,
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80',
      description: 'Talkative Siamese cat with beautiful blue eyes. Very social and loves attention.',
      age: '1 year',
      location: 'City Animal Center',
      traits: ['Talkative', 'Social', 'Beautiful', 'Attention-seeking']
    },
    {
      _id: '4',
      name: 'Shadow',
      category: 'Cat',
      breed: 'Black Cat',
      price: 0,
      image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&q=80',
      description: 'Mysterious black cat with golden eyes. Playful and loves to hunt toy mice.',
      age: '4 years',
      location: 'Black Cat Rescue',
      traits: ['Mysterious', 'Playful', 'Hunter', 'Sleek']
    },
    {
      _id: '5',
      name: 'Mittens',
      category: 'Cat',
      breed: 'Ragdoll',
      price: 200,
      image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&q=80',
      description: 'Gentle Ragdoll cat who goes limp when picked up. Perfect lap cat and very docile.',
      age: '3 years',
      location: 'Gentle Cats Sanctuary',
      traits: ['Gentle', 'Docile', 'Lap Cat', 'Relaxed']
    },
    {
      _id: '6',
      name: 'Tiger',
      category: 'Cat',
      breed: 'Orange Tabby',
      price: 0,
      image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=600&q=80',
      description: 'Friendly orange tabby with distinctive stripes. Loves to play and very social.',
      age: '2 years',
      location: 'Tabby Cat Haven',
      traits: ['Friendly', 'Social', 'Playful', 'Distinctive']
    },
    {
      _id: '7',
      name: 'Princess',
      category: 'Cat',
      breed: 'Russian Blue',
      price: 150,
      image: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&q=80',
      description: 'Elegant Russian Blue with silvery coat. Quiet and reserved but very loyal.',
      age: '5 years',
      location: 'Elite Cat Rescue',
      traits: ['Elegant', 'Quiet', 'Reserved', 'Loyal']
    },
    {
      _id: '8',
      name: 'Smokey',
      category: 'Cat',
      breed: 'British Shorthair',
      price: 180,
      image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&q=80',
      description: 'Chunky British Shorthair with round face. Very calm and great for apartments.',
      age: '4 years',
      location: 'British Cat Society',
      traits: ['Chunky', 'Calm', 'Round Face', 'Apartment Friendly']
    },
    {
      _id: '9',
      name: 'Cleo',
      category: 'Cat',
      breed: 'Egyptian Mau',
      price: 250,
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80',
      description: 'Exotic Egyptian Mau with natural spotted coat. Very active and athletic.',
      age: '2 years',
      location: 'Exotic Cats',
      traits: ['Exotic', 'Spotted', 'Active', 'Athletic']
    },
    {
      _id: '10',
      name: 'Patches',
      category: 'Cat',
      breed: 'Calico',
      price: 0,
      image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&q=80',
      description: 'Beautiful Calico cat with tri-color coat. Sassy personality and very independent.',
      age: '3 years',
      location: 'Colorful Cats',
      traits: ['Beautiful', 'Tri-color', 'Sassy', 'Independent']
    },
    {
      _id: '11',
      name: 'Snowball',
      category: 'Cat',
      breed: 'Turkish Angora',
      price: 220,
      image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&q=80',
      description: 'Fluffy white Turkish Angora with long silky coat. Playful and loves to climb.',
      age: '1 year',
      location: 'Fluffy Friends',
      traits: ['Fluffy', 'White', 'Silky', 'Climber']
    },
    {
      _id: '12',
      name: 'Ginger',
      category: 'Cat',
      breed: 'Scottish Fold',
      price: 300,
      image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=600&q=80',
      description: 'Adorable Scottish Fold with folded ears. Very sweet and loves to be petted.',
      age: '2 years',
      location: 'Scottish Cats',
      traits: ['Adorable', 'Folded Ears', 'Sweet', 'Loves Petting']
    },
    {
      _id: '13',
      name: 'Midnight',
      category: 'Cat',
      breed: 'Bombay',
      price: 0,
      image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&q=80',
      description: 'Sleek black Bombay cat with copper eyes. Very affectionate and dog-like personality.',
      age: '3 years',
      location: 'Midnight Cats',
      traits: ['Sleek', 'Copper Eyes', 'Affectionate', 'Dog-like']
    },
    {
      _id: '14',
      name: 'Duchess',
      category: 'Cat',
      breed: 'Himalayan',
      price: 280,
      image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600&q=80',
      description: 'Regal Himalayan cat with color-point coat. Quiet and dignified, loves luxury.',
      age: '4 years',
      location: 'Royal Cats',
      traits: ['Regal', 'Color-point', 'Quiet', 'Dignified']
    },
    {
      _id: '15',
      name: 'Mochi',
      category: 'Cat',
      breed: 'Japanese Bobtail',
      price: 0,
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80',
      description: 'Unique Japanese Bobtail with short tail. Very playful and brings good luck!',
      age: '1 year',
      location: 'Lucky Cats',
      traits: ['Unique', 'Short Tail', 'Playful', 'Lucky']
    },
    {
      _id: '16',
      name: 'Oreo',
      category: 'Cat',
      breed: 'Tuxedo',
      price: 90,
      image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&q=80',
      description: 'Dapper Tuxedo cat with formal black and white coat. Very intelligent and social.',
      age: '2 years',
      location: 'Formal Cats',
      traits: ['Dapper', 'Formal', 'Intelligent', 'Social']
    }
  ]);

  // Get unique breeds for filter
  const breeds = ['All', ...new Set(cats.map(cat => cat.breed))];
  const ageOptions = ['All', 'Kitten (0-1 year)', 'Young (1-3 years)', 'Adult (3-7 years)', 'Senior (7+ years)'];
  const priceOptions = ['All', 'Free', 'Under $150', '$150-$250', 'Over $250'];

  // Filter cats based on search and filters
  const filteredCats = cats.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cat.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cat.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBreed = selectedBreed === 'All' || cat.breed === selectedBreed;
    
    let matchesAge = true;
    if (ageFilter !== 'All') {
      const age = parseInt(cat.age);
      switch (ageFilter) {
        case 'Kitten (0-1 year)':
          matchesAge = age <= 1;
          break;
        case 'Young (1-3 years)':
          matchesAge = age > 1 && age <= 3;
          break;
        case 'Adult (3-7 years)':
          matchesAge = age > 3 && age <= 7;
          break;
        case 'Senior (7+ years)':
          matchesAge = age > 7;
          break;
      }
    }
    
    let matchesPrice = true;
    if (priceFilter !== 'All') {
      switch (priceFilter) {
        case 'Free':
          matchesPrice = cat.price === 0;
          break;
        case 'Under $150':
          matchesPrice = cat.price > 0 && cat.price < 150;
          break;
        case '$150-$250':
          matchesPrice = cat.price >= 150 && cat.price <= 250;
          break;
        case 'Over $250':
          matchesPrice = cat.price > 250;
          break;
      }
    }
    
    return matchesSearch && matchesBreed && matchesAge && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Animated Hero Section with Carousel */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-rose-700 text-white">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-30' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 animate-bounce-slow">
            <div className="w-16 h-16 bg-yellow-400 rounded-full opacity-20"></div>
          </div>
          <div className="absolute top-40 right-20 animate-pulse-slow">
            <div className="w-12 h-12 bg-pink-400 rounded-full opacity-20"></div>
          </div>
          <div className="absolute bottom-20 left-1/4 animate-bounce">
            <div className="w-8 h-8 bg-purple-400 rounded-full opacity-20"></div>
          </div>
          {/* Floating cat paw prints */}
          <div className="absolute top-32 right-1/3 text-4xl animate-pulse opacity-30">🐾</div>
          <div className="absolute bottom-32 left-1/3 text-3xl animate-bounce opacity-30">🐾</div>
        </div>

        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full animate-pulse">
                <Heart className="w-12 h-12 text-pink-300" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              🐱 Find Your Perfect
              <span className="text-pink-300 animate-pulse"> Feline Friend</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Discover amazing cats from various breeds waiting for their purr-fect homes
            </p>
            
            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-8 mb-8 max-w-2xl mx-auto">
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold text-pink-300">{cats.length}+</div>
                <div className="text-purple-100">Cats Available</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold text-pink-300">{breeds.length - 1}</div>
                <div className="text-purple-100">Different Breeds</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold text-pink-300">∞</div>
                <div className="text-purple-100">Purrs Guaranteed</div>
              </div>
            </div>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="flex bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border-2 border-white/20">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for Persian, Kitten, etc..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 text-lg focus:outline-none bg-transparent"
                  />
                </div>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 text-white font-semibold transition-all duration-200 transform hover:scale-105">
                  <Sparkles className="w-5 h-5 inline mr-2" />
                  Search Cats
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">🏠 Adoption Success</div>
              <AnimatedProgressBar percentage={85} label="Cats Adopted" color="purple" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600 mb-2">❤️ Purr-fect Matches</div>
              <AnimatedProgressBar percentage={94} label="Satisfaction Rate" color="pink" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-2">🐱 Available Cats</div>
              <AnimatedProgressBar percentage={72} label="Ready for Adoption" color="indigo" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters Section */}
      <div className="bg-white/80 backdrop-blur-sm py-6 sticky top-20 z-40 shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-700">Filters:</span>
              </div>
              
              {/* Breed Filter */}
              <select 
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm"
              >
                {breeds.map(breed => (
                  <option key={breed} value={breed}>🐱 {breed}</option>
                ))}
              </select>
              
              {/* Age Filter */}
              <select 
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm"
              >
                {ageOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              
              {/* Price Filter */}
              <select 
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm"
              >
                {priceOptions.map(option => (
                  <option key={option} value={option}>💰 {option}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-gray-600">
                <span className="font-semibold text-purple-600">{filteredCats.length}</span> cats found
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-pink-500 animate-pulse" />
                <span className="text-sm text-gray-600">Premium breeds available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Section Header with Animation */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
            <Heart className="w-8 h-8 text-purple-600 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🐱 Amazing Cats Looking for Homes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each of these wonderful cats has a unique purr-sonality and is ready to bring comfort, companionship, and endless purrs to your family
          </p>
          
          {/* Animated Breed Showcase */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {breeds.slice(1, 8).map((breed, index) => (
              <div
                key={breed}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedBreed(breed)}
              >
                {breed}
              </div>
            ))}
          </div>
        </div>

        {/* Cats Grid with Stagger Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCats.map((cat, index) => (
            <div
              key={cat._id}
              className="transform hover:scale-105 transition-all duration-300"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <PetCard pet={cat} />
            </div>
          ))}
        </div>
        
        {filteredCats.length === 0 && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6 animate-bounce">🔍</div>
            <h3 className="text-3xl font-bold text-gray-700 mb-4">No cats found</h3>
            <p className="text-gray-500 text-lg mb-6">Try adjusting your search or filters to find more feline friends</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBreed('All');
                setAgeFilter('All');
                setPriceFilter('All');
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white py-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-pink-400/20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-400/20 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-1/4 text-6xl animate-pulse opacity-20">🐾</div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Welcome a Purr-fect Companion?</h2>
            <p className="text-xl mb-8 text-purple-100">Join thousands of happy families who found their perfect feline friend</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-xl">
                🏠 Start Adoption Process
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200 transform hover:scale-105">
                💝 Donate to Help Cats
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes wiggle {
          0%, 7%, 14%, 21%, 28%, 35%, 42%, 49%, 56%, 63%, 70%, 77%, 84%, 91%, 98%, 100% {
            transform: rotate(0deg);
          }
          3.5%, 10.5%, 17.5%, 24.5%, 31.5%, 38.5%, 45.5%, 52.5%, 59.5%, 66.5%, 73.5%, 80.5%, 87.5%, 94.5% {
            transform: rotate(1deg);
          }
        }
        
        .wiggle-animation {
          animation: wiggle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Cats;