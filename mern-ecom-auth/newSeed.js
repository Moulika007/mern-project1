const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Pet = require('./models/Pet');
const connectDB = require('./config/db');

// Sample data with comprehensive pet information
const samplePets = [
  {
    name: 'Max',
    category: 'Dog',
    breed: 'Golden Retriever',
    age: '3 years',
    gender: 'Male',
    size: 'Large',
    price: 0,
    images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80'],
    description: 'Friendly Golden Retriever who loves kids and playing fetch. House trained and great with other pets.',
    location: 'Downtown Shelter',
    traits: ['Friendly', 'House Trained', 'Good with Kids', 'Playful'],
    healthInfo: {
      vaccinated: true,
      spayedNeutered: true,
      houseTrained: true,
      specialNeeds: ''
    },
    contact: {
      name: 'Downtown Animal Shelter',
      email: 'contact@downtownshelter.com',
      phone: '(555) 123-4567',
      organization: 'Downtown Animal Shelter'
    },
    featured: true
  },
  {
    name: 'Bella',
    category: 'Cat',
    breed: 'Persian',
    age: '2 years',
    gender: 'Female',
    size: 'Medium',
    price: 75,
    images: ['https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600&q=80'],
    description: 'Quiet Persian cat who loves naps and gentle cuddles. Perfect for calm households.',
    location: 'City Cat Rescue',
    traits: ['Quiet', 'Cuddly', 'Independent', 'Gentle'],
    healthInfo: {
      vaccinated: true,
      spayedNeutered: true,
      houseTrained: true,
      specialNeeds: ''
    },
    contact: {
      name: 'City Cat Rescue',
      email: 'info@citycatrescue.org',
      phone: '(555) 987-6543',
      organization: 'City Cat Rescue'
    },
    featured: true
  },
  {
    name: 'Charlie',
    category: 'Dog',
    breed: 'Border Collie',
    age: '2 years',
    gender: 'Male',
    size: 'Medium',
    price: 150,
    images: ['https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80'],
    description: 'Energetic Border Collie mix. Perfect for active families who love outdoor adventures.',
    location: 'Westside Rescue',
    traits: ['Energetic', 'Smart', 'Loyal', 'Active'],
    healthInfo: {
      vaccinated: true,
      spayedNeutered: false,
      houseTrained: true,
      specialNeeds: ''
    },
    contact: {
      name: 'Westside Animal Rescue',
      email: 'adopt@westsiderescue.com',
      phone: '(555) 456-7890',
      organization: 'Westside Animal Rescue'
    },
    featured: false
  },
  {
    name: 'Luna',
    category: 'Dog',
    breed: 'Husky',
    age: '1 year',
    gender: 'Female',
    size: 'Large',
    price: 0,
    images: ['https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80'],
    description: 'Adorable Husky mix with beautiful blue eyes. Loves cold weather and long walks.',
    location: 'Mountain Rescue',
    traits: ['Beautiful', 'Active', 'Friendly', 'Independent'],
    healthInfo: {
      vaccinated: true,
      spayedNeutered: true,
      houseTrained: false,
      specialNeeds: 'Needs daily exercise'
    },
    contact: {
      name: 'Mountain Pet Rescue',
      email: 'help@mountainpetrescue.org',
      phone: '(555) 321-0987',
      organization: 'Mountain Pet Rescue'
    },
    featured: true
  },
  {
    name: 'Whiskers',
    category: 'Cat',
    breed: 'Maine Coon',
    age: '4 years',
    gender: 'Male',
    size: 'Large',
    price: 0,
    images: ['https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&q=80'],
    description: 'Very independent and calm Maine Coon. Great with other pets and loves to explore.',
    location: 'Feline Friends Sanctuary',
    traits: ['Independent', 'Calm', 'Large', 'Friendly'],
    healthInfo: {
      vaccinated: true,
      spayedNeutered: true,
      houseTrained: true,
      specialNeeds: ''
    },
    contact: {
      name: 'Feline Friends Sanctuary',
      email: 'cats@felinefriends.org',
      phone: '(555) 654-3210',
      organization: 'Feline Friends Sanctuary'
    },
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Pet.deleteMany({});
    console.log('✅ Cleared existing pets');
    
    // Insert sample data
    const createdPets = await Pet.insertMany(samplePets);
    console.log(`✅ ${createdPets.length} sample pets added successfully!`);
    
    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();