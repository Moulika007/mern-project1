const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Product = require('./model/Product');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/house_rental_db');

const types = ['Dog', 'Cat', 'Bird', 'Rabbit'];
const breeds = {
  Dog: ['Golden Retriever', 'Husky', 'Pug', 'Labrador', 'Beagle'],
  Cat: ['Siamese', 'Persian', 'Maine Coon', 'Bengal', 'Sphynx'],
  Bird: ['Parrot', 'Canary', 'Cockatiel', 'Lovebird', 'Finch'],
  Rabbit: ['Holland Lop', 'Rex', 'Lionhead', 'Dutch', 'Angora']
};
const images = {
  Dog: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500',
  Cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500',
  Bird: 'https://images.unsplash.com/photo-1552728089-57bdde30ebd1?w=500',
  Rabbit: 'https://images.unsplash.com/photo-1585110396065-88b74f03eee9?w=500'
};

const seedData = async () => {
  await Product.deleteMany({}); // Clear old data
  let pets = [];
  
  types.forEach(type => {
    for(let i=1; i<=10; i++) {
      pets.push({
        title: `${type} Friend ${i}`,
        type: type,
        breed: breeds[type][Math.floor(Math.random() * 5)],
        age: Math.floor(Math.random() * 5) + 1,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        price: Math.floor(Math.random() * 300) + 50,
        description: `A lovely ${type} looking for a home. Very friendly and healthy.`,
        location: ['New York', 'California', 'Texas', 'Florida'][Math.floor(Math.random() * 4)],
        image: images[type],
        vaccinated: true,
        status: 'Available'
      });
    }
  });

  await Product.insertMany(pets);
  console.log('✅ 40 Pets Added!');
  process.exit();
};

seedData();