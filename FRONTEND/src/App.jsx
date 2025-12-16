import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import FloatingActionButton from './components/UI/FloatingActionButton';
import ProtectedRoute from './components/UI/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup'; // Renamed from Register to match your file
import PetDetails from './pages/PetDetails';
import SellPet from './pages/SellPet';

import Dogs from './pages/Dogs';
import Cats from './pages/Cats';

import Favorites from './pages/Favorites';
import SuccessStories from './pages/SuccessStories';

import AllPets from './pages/AllPets';
import Birds from './pages/Birds';

import PetCare from './pages/Resources/PetCare';
import FAQs from './pages/Resources/FAQs';
import Safety from './pages/Resources/Safety';
import Pricing from './pages/Resources/Pricing';
import Support from './pages/Resources/Support';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/pet/:id" element={<PetDetails />} />
              <Route path="/dogs" element={<Dogs />} />
              <Route path="/cats" element={<Cats />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/success" element={<SuccessStories />} />
              <Route path="/all-pets" element={<AllPets />} />
              <Route path="/birds" element={<Birds />} />
              <Route path="/care-guide" element={<PetCare />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/support" element={<Support />} />
                {/* Protected Routes (Require Login) */}
              <Route 
                path="/sell" 
                element={
                  <ProtectedRoute>
                    <SellPet />
                  </ProtectedRoute>
                } 
              />
              
              {/* Add 404 Route if needed */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </main>
          
          <FloatingActionButton />
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;