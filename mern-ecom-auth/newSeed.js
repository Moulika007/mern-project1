const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Pet = require('./models/Pet');

dotenv.config();

// Helper to get diverse images from Unsplash
const getImages = (keyword) => {
  return [
    `https://source.unsplash.com/600x400/?${keyword},pet`,
    `https://source.unsplash.com/600x400/?${keyword},dog`,
    `https://source.unsplash.com/600x400/?${keyword},cute`,
    `https://source.unsplash.com/600x400/?${keyword},animal`,
    `https://source.unsplash.com/600x400/?${keyword},puppy`,
    `https://source.unsplash.com/600x400/?${keyword},playing`,
    `https://source.unsplash.com/600x400/?${keyword},sleeping`,
    `https://source.unsplash.com/600x400/?${keyword},park`
  ];
};

const pets = [
  // --- DOGS (Expanded Variety) ---
  {
    name: 'Bruno', category: 'Dog', breed: 'Labrador Retriever', age: '2 years', gender: 'Male', size: 'Large', price: 12000,
    images: getImages('labrador'), description: 'Friendly and energetic Labrador.', location: 'Bangalore, Karnataka', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Rocky', category: 'Dog', breed: 'German Shepherd', age: '1 year', gender: 'Male', size: 'Large', price: 18000,
    images: getImages('german-shepherd'), description: 'Smart and protective.', location: 'Delhi, NCR', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Bella', category: 'Dog', breed: 'Golden Retriever', age: '3 years', gender: 'Female', size: 'Large', price: 15000,
    images: getImages('golden-retriever'), description: 'The perfect family dog.', location: 'Mumbai, Maharashtra', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Charlie', category: 'Dog', breed: 'Beagle', age: '1 year', gender: 'Male', size: 'Medium', price: 14000,
    images: getImages('beagle'), description: 'Curious and merry Beagle.', location: 'Pune, Maharashtra', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Max', category: 'Dog', breed: 'Rottweiler', age: '2 years', gender: 'Male', size: 'Large', price: 20000,
    images: getImages('rottweiler'), description: 'Loyal guardian.', location: 'Chennai, Tamil Nadu', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Zoey', category: 'Dog', breed: 'Shih Tzu', age: '1 year', gender: 'Female', size: 'Small', price: 15000,
    images: getImages('shih-tzu'), description: 'Adorable lap dog.', location: 'Hyderabad, Telangana', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Cooper', category: 'Dog', breed: 'Pug', age: '3 years', gender: 'Male', size: 'Small', price: 10000,
    images: getImages('pug'), description: 'Charming and mischievous.', location: 'Kolkata, WB', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Luna', category: 'Dog', breed: 'Husky', age: '2 years', gender: 'Female', size: 'Large', price: 25000,
    images: getImages('husky'), description: 'Energetic and vocal.', location: 'Chandigarh', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Duke', category: 'Dog', breed: 'Boxer', age: '4 years', gender: 'Male', size: 'Large', price: 16000,
    images: getImages('boxer-dog'), description: 'Fun-loving and bright.', location: 'Jaipur, Rajasthan', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Oreo', category: 'Dog', breed: 'Dalmatian', age: '2 years', gender: 'Male', size: 'Large', price: 18000,
    images: getImages('dalmatian'), description: 'Spotty and sporty.', location: 'Ahmedabad, Gujarat', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },

  // --- CATS ---
  {
    name: 'Misty', category: 'Cat', breed: 'Persian', age: '2 years', gender: 'Female', size: 'Medium', price: 8000,
    images: getImages('persian-cat'), description: 'Fluffy and calm.', location: 'Mumbai, Maharashtra', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Leo', category: 'Cat', breed: 'Siamese', age: '1 year', gender: 'Male', size: 'Medium', price: 9000,
    images: getImages('siamese-cat'), description: 'Vocal and affectionate.', location: 'Delhi, NCR', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },

  // --- BIRDS ---
  {
    name: 'Rio', category: 'Bird', breed: 'Macaw', age: '5 years', gender: 'Male', size: 'Large', price: 45000,
    images: getImages('macaw'), description: 'Colorful and talkative.', location: 'Goa', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Sky', category: 'Bird', breed: 'Budgie', age: '1 year', gender: 'Female', size: 'Small', price: 1000,
    images: getImages('budgie'), description: 'Sweet little friend.', location: 'Bangalore, Karnataka', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await Pet.deleteMany({});
    await Pet.insertMany(pets);
    console.log('✅ Database seeded with 14+ Pets (8 Images each)!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();