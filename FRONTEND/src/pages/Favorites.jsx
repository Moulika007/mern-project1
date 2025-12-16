import { useState, useEffect } from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PetCard from '../components/UI/PetCard';

const Favorites = () => {
  const [likedPets, setLikedPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pets = JSON.parse(localStorage.getItem('likedPets') || '[]');
    setLikedPets(pets);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-12">
      <div className="container mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-orange-600 hover:text-orange-700 font-medium bg-white px-4 py-2 rounded-lg shadow-md"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-red-500 fill-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Favorite Pets</h1>
          <p className="text-xl text-gray-600">
            {likedPets.length} pets you've fallen in love with
          </p>
        </div>

        {likedPets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {likedPets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No favorites yet</h3>
            <p className="text-gray-500 mb-8">Start browsing pets and click the heart to add them here!</p>
            <button
              onClick={() => navigate('/dogs')}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Browse Dogs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;