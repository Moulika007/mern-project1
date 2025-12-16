import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Calendar } from 'lucide-react';

const PetCard = ({ pet }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const likedPets = JSON.parse(localStorage.getItem('likedPets') || '[]');
    setIsLiked(likedPets.some(p => p._id === pet._id));
  }, [pet._id]);

  const handleAdoptClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/login', { state: { returnTo: `/pet/${pet._id}` } });
  };

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    // Store in localStorage
    const likedPets = JSON.parse(localStorage.getItem('likedPets') || '[]');
    if (newLikedState) {
      if (!likedPets.find(p => p._id === pet._id)) {
        likedPets.push(pet);
      }
    } else {
      const index = likedPets.findIndex(p => p._id === pet._id);
      if (index > -1) likedPets.splice(index, 1);
    }
    localStorage.setItem('likedPets', JSON.stringify(likedPets));
    
    // Animation
    const button = e.currentTarget;
    button.classList.add('animate-bounce');
    setTimeout(() => button.classList.remove('animate-bounce'), 600);
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-orange-100 hover:border-orange-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={pet.image} 
          alt={pet.name} 
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" 
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            🐕 {pet.category}
          </span>
        </div>
        
        {/* Heart Icon - Fixed positioning at top */}
        <button 
          onClick={handleLikeClick}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110 z-10"
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-200 ${
              isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-600 hover:text-red-500'
            }`} 
          />
        </button>
        
        {/* Price Overlay */}
        <div className="absolute bottom-4 right-4">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-3 py-1 rounded-full text-lg font-bold shadow-lg">
            {pet.price > 0 ? `💰 $${pet.price}` : "🆓 Free"}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 bg-gradient-to-b from-white to-orange-50">
        {/* Pet Name and Age */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
            {pet.name}
          </h3>
          <div className="flex items-center text-orange-600 text-sm bg-orange-100 px-2 py-1 rounded-full">
            <Calendar className="w-4 h-4 mr-1" />
            {pet.age || '2 years'}
          </div>
        </div>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-3 bg-white px-3 py-1 rounded-lg shadow-sm">
          <MapPin className="w-4 h-4 mr-1 text-orange-500" />
          <span>{pet.location || 'Local Shelter'}</span>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 bg-white p-3 rounded-lg shadow-sm">
          {pet.description}
        </p>
        
        {/* Pet Traits */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(pet.traits || ['Friendly', 'Trained']).slice(0, 3).map((trait, index) => (
            <span 
              key={index}
              className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-2 py-1 rounded-lg text-xs font-medium shadow-sm"
            >
              {trait}
            </span>
          ))}
        </div>
        
        {/* Action Button */}
        <button 
          onClick={handleAdoptClick}
          className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse hover:animate-none"
        >
          {pet.price > 0 ? `🛒 Buy Me Now!` : "🏠 Adopt Me Today!"}
        </button>
      </div>
    </div>
  );
};

export default PetCard;