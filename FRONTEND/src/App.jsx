import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Dogs from './pages/Dogs';
import Cats from './pages/Cats';
import PetDetails from './pages/PetDetails';
import SellPet from './pages/SellPet';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Favorites from './pages/Favorites';
import TestNavigation from './pages/TestNavigation';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dogs" element={<Dogs />} />
              <Route path="/cats" element={<Cats />} />
              <Route path="/pet/:id" element={<PetDetails />} />
              <Route path="/sell" element={<SellPet />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/test" element={<TestNavigation />} />
              <Route path="/success" element={<Home />} />
              <Route path="/shelters" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;