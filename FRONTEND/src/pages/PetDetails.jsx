// ... existing imports ...
import { useState, useEffect, useContext } from 'react'; // Add useState
// ... imports ...

const PetDetails = () => {
  // ... existing hooks ...
  const [activeImage, setActiveImage] = useState(0); // For gallery

  // ... fetchPet useEffect ...

  // ... handleAdopt ...

  if (loading) return <div className="flex justify-center items-center h-screen"><LoadingSpinner size="large" /></div>;
  if (!pet) return <div className="text-center py-20">Pet not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* IMAGE GALLERY SECTION */}
          <div className="space-y-4">
            {/* Main Large Image */}
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-lg bg-gray-200">
               <img 
                 src={pet.images?.[activeImage] || 'https://via.placeholder.com/600'} 
                 alt={pet.name} 
                 className="w-full h-full object-cover"
               />
            </div>
            
            {/* Thumbnails (Up to 5) */}
            <div className="grid grid-cols-5 gap-2">
              {pet.images?.map((img, index) => (
                <button 
                  key={index} 
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    activeImage === index ? 'border-indigo-600' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-white p-8 rounded-3xl shadow-sm">
             <div className="flex justify-between items-start">
               <h1 className="text-4xl font-bold text-gray-900">{pet.name}</h1>
               <div className="text-2xl font-bold text-indigo-600">
                 ₹{pet.price.toLocaleString('en-IN')}
               </div>
             </div>
             {/* ... Rest of your existing info code ... */}
             {/* Just ensure the Adopt button logic is preserved */}
             <div className="mt-8">
                <Button onClick={handleAdopt} className="w-full py-4 text-lg">
                  Adopt {pet.name}
                </Button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PetDetails;