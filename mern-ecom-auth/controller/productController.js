const asyncHandler = require('express-async-handler');
const Pet = require('../models/Pet');

// Get All Pets (Optional Filter)
const getProducts = asyncHandler(async (req, res) => {
  const { type } = req.query;
  let query = { status: 'Available' };
  if (type && type !== 'all') query.category = type;
  
  const pets = await Pet.find(query).sort({ createdAt: -1 });
  res.status(200).json(pets);
});

// Get Single Pet
const getProductById = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (pet) res.status(200).json(pet);
  else { res.status(404); throw new Error('Pet not found'); }
});

// Add Pet (Sell)
const setProduct = asyncHandler(async (req, res) => {
  const pet = await Pet.create(req.body);
  res.status(200).json(pet);
});

// Adopt Pet (Buy) - Updates Status to Adopted
const adoptPet = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (pet) {
    pet.status = 'Adopted';
    const updatedPet = await pet.save();
    res.json(updatedPet);
  } else {
    res.status(404);
    throw new Error('Pet not found');
  }
});

module.exports = { getProducts, getProductById, setProduct, adoptPet };