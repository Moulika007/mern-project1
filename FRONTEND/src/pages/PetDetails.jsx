import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Calendar, Phone, Mail, User, Shield, Home } from 'lucide-react';
import { petAPI } from '../services/api';
import AuthContext from '../context/AuthContext';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('PetDetails: Loading pet with ID:', id);
    const fetchPet = async () => {
      try {
        const response = await petAPI.getPetById(id);
        setPet(response.data);
        console.log('PetDetails: Pet data loaded:', response.data);
      } catch (err) {
        console.error('Error fetching pet:', err);
        // Fallback pet data for demo
        const fallbackPet = {
          _id: id,
          name: id === '1' ? 'Max' : id === '2' ? 'Charlie' : id === '3' ? 'Bella' : id === '4' ? 'Rocky' : id === '5' ? 'Luna' : 'Buddy',
          category: 'Dog',
          breed: id === '1' ? 'Golden Retriever' : id === '2' ? 'Border Collie' : id === '3' ? 'Labrador' : id === '4' ? 'German Shepherd' : id === '5' ? 'Husky' : 'Golden Retriever',
          age: '3 years',
          price: id === '2' ? 150 : id === '4' ? 200 : id === '5' ? 300 : 0,
          images: [
            id === '1' ? 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80' : 
            id === '2' ? 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80' :
            id === '3' ? 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80' :
            id === '4' ? 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80' :
            id === '5' ? 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&q=80' :
            'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80',
            'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80',
            'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80'
          ],
          image: id === '1' ? 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80' : 
                 id === '2' ? 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80' :
                 id === '3' ? 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80' :
                 id === '4' ? 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80' :
                 id === '5' ? 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&q=80' :
                 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80',
          description: 'Friendly dog who loves kids and playing fetch. House trained and great with other pets. Very social and loves meeting new people.',
          location: 'Downtown Shelter',
          traits: ['Friendly', 'House Trained', 'Good with Kids'],
          healthInfo: {
            vaccinated: true,
            houseTrained: true,
            spayedNeutered: true
          },
          previousOwner: {
            name: id === '2' ? 'Sarah Johnson' : id === '4' ? 'Mike Wilson' : id === '5' ? 'Emma Davis' : null,
            reason: id === '2' ? 'Moving to apartment' : id === '4' ? 'New job requires travel' : id === '5' ? 'Family allergies' : null,
            yearsOwned: id === '2' ? 2 : id === '4' ? 3 : id === '5' ? 1 : null
          },
          contact: {
            name: 'Downtown Animal Shelter',
            email: 'contact@shelter.com',
            phone: '(555) 123-4567',
            organization: 'Downtown Animal Shelter'
          }
        };
        setPet(fallbackPet);
        console.log('PetDetails: Using fallback data:', fallbackPet);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPet();
    }
  }, [id]);

  const handleAdopt = () => {
    console.log('Adopt button clicked for pet:', pet?.name);
    if (!user) {
      console.log('User not logged in, redirecting to login');
      navigate('/login', { state: { returnTo: `/pet/${pet._id}` } });
      return;
    }
    // Show adoption form or contact info
    const action = pet.price > 0 ? 'Purchase' : 'Adoption';
    alert(`🎉 ${action} process started for ${pet?.name}! Contact details are shown below.`);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100">
      <div className="text-center">
        <LoadingSpinner size="xl" color="orange" />
        <p className="mt-4 text-lg text-orange-600 font-medium">Loading pet details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">😿</div>
        <h2 className="text-2xl font-bold text-gray-700">{error}</h2>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-orange-600 hover:text-orange-700 font-medium bg-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
        >
          ← Back to {pet.category}s
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Pet Images */}
            <div className="relative">
              {pet.images && pet.images.length > 1 ? (
                <div className="grid grid-cols-1 gap-2">
                  <img
                    src={pet.images[0]}
                    alt={pet.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {pet.images.slice(1, 3).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${pet.name} ${idx + 2}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <img
                  src={pet.images?.[0] || pet.image}
                  alt={pet.name}
                  className="w-full h-96 lg:h-full object-cover"
                />
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  🐕 {pet.category}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-white/95 text-gray-900 px-4 py-2 rounded-full text-xl font-bold shadow-lg">
                  {pet.price > 0 ? `💰 $${pet.price}` : "🆓 Free"}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm text-white p-4 rounded-xl">
                  <h2 className="text-2xl font-bold mb-1">{pet.name}</h2>
                  <p className="text-orange-200">{pet.breed} • {pet.age}</p>
                </div>
              </div>
            </div>

            {/* Pet Details */}
            <div className="p-8 bg-gradient-to-br from-white to-orange-50">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">{pet.name}</h1>
                  <p className="text-xl text-gray-600 font-medium">{pet.breed}</p>
                </div>
                <button className="p-3 bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 rounded-full transition-all duration-200 transform hover:scale-110 shadow-lg">
                  <Heart className="w-6 h-6 text-red-500" />
                </button>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-700 bg-white p-3 rounded-lg shadow-sm">
                  <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                  <span className="font-medium">{pet.age}</span>
                </div>
                <div className="flex items-center text-gray-700 bg-white p-3 rounded-lg shadow-sm">
                  <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                  <span className="font-medium">{pet.location}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-orange-700">🐾 About {pet.name}</h3>
                <p className="text-gray-700 leading-relaxed">{pet.description}</p>
              </div>

              {/* Traits */}
              {pet.traits && pet.traits.length > 0 && (
                <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-orange-700">✨ Personality Traits</h3>
                  <div className="flex flex-wrap gap-2">
                    {pet.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-3 py-2 rounded-full text-sm font-medium shadow-sm"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Health Info */}
              {pet.healthInfo && (
                <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-orange-700">🏥 Health Information</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center bg-green-50 p-3 rounded-lg">
                      <Shield className={`w-5 h-5 mr-2 ${pet.healthInfo.vaccinated ? 'text-green-500' : 'text-gray-400'}`} />
                      <span className={`font-medium ${pet.healthInfo.vaccinated ? 'text-green-700' : 'text-gray-500'}`}>
                        {pet.healthInfo.vaccinated ? '✅ Vaccinated' : '❌ Not Vaccinated'}
                      </span>
                    </div>
                    <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                      <Home className={`w-5 h-5 mr-2 ${pet.healthInfo.houseTrained ? 'text-blue-500' : 'text-gray-400'}`} />
                      <span className={`font-medium ${pet.healthInfo.houseTrained ? 'text-blue-700' : 'text-gray-500'}`}>
                        {pet.healthInfo.houseTrained ? '✅ House Trained' : '❌ Not House Trained'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Previous Owner Info - Only show if user is logged in and pet has previous owner */}
              {user && pet.previousOwner && (
                <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-400">
                  <h3 className="text-xl font-semibold mb-3 text-orange-700">👤 Previous Owner</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Owner:</span> {pet.previousOwner.name}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Owned for:</span> {pet.previousOwner.yearsOwned} years
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Reason for rehoming:</span> {pet.previousOwner.reason}
                    </p>
                  </div>
                </div>
              )}

              {/* Adopt Button */}
              <button
                onClick={handleAdopt}
                className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-xl animate-pulse"
              >
                {pet.price > 0 ? `🛒 Buy ${pet.name} - $${pet.price}` : `🏠 Adopt ${pet.name} Today!`}
              </button>
            </div>
          </div>

          {/* Contact Information */}
          {user && pet.contact && (
            <div className="border-t border-orange-200 p-8 bg-gradient-to-r from-orange-50 to-red-50">
              <h3 className="text-2xl font-semibold mb-6 text-orange-700">📞 Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <User className="w-6 h-6 text-orange-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">{pet.contact.name}</p>
                    {pet.contact.organization && (
                      <p className="text-gray-600 text-sm">{pet.contact.organization}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <Phone className="w-6 h-6 text-orange-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <a href={`tel:${pet.contact.phone}`} className="text-orange-600 hover:text-orange-700 hover:underline font-medium">
                      {pet.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <Mail className="w-6 h-6 text-orange-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <a href={`mailto:${pet.contact.email}`} className="text-orange-600 hover:text-orange-700 hover:underline font-medium">
                      {pet.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Login Prompt */}
          {!user && (
            <div className="border-t border-orange-200 p-8 bg-gradient-to-r from-orange-50 to-red-50">
              <div className="text-center">
                <div className="text-6xl mb-4">🔐</div>
                <h3 className="text-2xl font-semibold mb-3 text-orange-700">
                  {pet.price > 0 ? `Want to buy ${pet.name}?` : `Want to adopt ${pet.name}?`}
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  {pet.price > 0 
                    ? 'Sign in to view detailed information, previous owner details, and complete your purchase'
                    : 'Sign in to view contact information and start the adoption process'
                  }
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => navigate('/login', { state: { returnTo: `/pet/${pet._id}` } })}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    🔑 Sign In
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    📝 Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetDetails;