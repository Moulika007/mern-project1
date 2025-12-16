import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, User, ShoppingBag } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [likedCount, setLikedCount] = useState(0);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const updateLikedCount = () => {
      const likedPets = JSON.parse(localStorage.getItem('likedPets') || '[]');
      setLikedCount(likedPets.length);
    };
    updateLikedCount();
    window.addEventListener('storage', updateLikedCount);
    const interval = setInterval(updateLikedCount, 1000);
    return () => {
      window.removeEventListener('storage', updateLikedCount);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl group-hover:scale-110 transition-transform duration-200">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">
              Pet<span className="text-orange-600">Haven</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dogs" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group"
            >
              🐕 Find Dogs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link 
              to="/cats" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group"
            >
              🐱 Find Cats
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link 
              to="/sell" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group"
            >
              🏠 Rehome Pet
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link 
              to="/success" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group"
            >
              ✨ Success Stories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/favorites" className="relative p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
              <Heart className="w-5 h-5" />
              {likedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {likedCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-medium">Hi, {user.name || user.email}</span>
                <button 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-semibold px-4 py-2 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-indigo-600 hover:text-indigo-700 font-semibold px-4 py-2 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/dogs" 
                className="text-gray-700 hover:text-indigo-600 font-medium px-4 py-2 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                🐕 Find Dogs
              </Link>
              <Link 
                to="/cats" 
                className="text-gray-700 hover:text-indigo-600 font-medium px-4 py-2 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                🐱 Find Cats
              </Link>
              <Link 
                to="/sell" 
                className="text-gray-700 hover:text-indigo-600 font-medium px-4 py-2 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                🏠 Rehome Pet
              </Link>
              <Link 
                to="/success" 
                className="text-gray-700 hover:text-indigo-600 font-medium px-4 py-2 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                ✨ Success Stories
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-gray-600">Liked Pets</span>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-red-500 font-semibold">{likedCount}</span>
                  </div>
                </div>
                {user ? (
                  <>
                    <div className="px-4 py-2 text-gray-700">Hi, {user.name || user.email}</div>
                    <button 
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      className="text-red-600 font-semibold px-4 py-2 hover:bg-red-50 rounded-lg transition-all duration-200 text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="text-indigo-600 font-semibold px-4 py-2 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link 
                      to="/signup" 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;