import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Pet API endpoints
export const petAPI = {
  // Get all pets with filters
  getPets: (params = {}) => api.get('/pets', { params }),
  
  // Get single pet by ID
  getPetById: (id) => api.get(`/pets/${id}`),
  
  // Get featured pets
  getFeaturedPets: () => api.get('/pets/featured'),
  
  // Get pets by category
  getPetsByCategory: (category, params = {}) => api.get(`/pets/category/${category}`, { params }),
  
  // Create new pet listing
  createPet: (petData) => api.post('/pets', petData),
  
  // Update pet
  updatePet: (id, petData) => api.put(`/pets/${id}`, petData),
  
  // Delete pet
  deletePet: (id) => api.delete(`/pets/${id}`),
  
  // Like a pet
  likePet: (id) => api.post(`/pets/${id}/like`),
};

// User API endpoints
export const userAPI = {
  // Register new user
  register: (userData) => api.post('/users/register', userData),
  
  // Login user
  login: (credentials) => api.post('/users/login', credentials),
  
  // Get user profile
  getProfile: () => api.get('/users/profile'),
  
  // Update user profile
  updateProfile: (userData) => api.put('/users/profile', userData),
  
  // Get user favorites
  getFavorites: () => api.get('/users/favorites'),
  
  // Add to favorites
  addToFavorites: (petId) => api.post(`/users/favorites/${petId}`),
  
  // Remove from favorites
  removeFromFavorites: (petId) => api.delete(`/users/favorites/${petId}`),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;