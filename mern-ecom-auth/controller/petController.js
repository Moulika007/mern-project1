const asyncHandler = require('express-async-handler');
const Pet = require('../models/Pet');
const { validationResult } = require('express-validator');

// @desc    Get all pets with filtering and pagination
// @route   GET /api/pets
// @access  Public
const getPets = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Build filter object
  let filter = { status: 'Available' };
  
  if (req.query.category) {
    filter.category = req.query.category;
  }
  
  if (req.query.breed) {
    filter.breed = new RegExp(req.query.breed, 'i');
  }
  
  if (req.query.size) {
    filter.size = req.query.size;
  }
  
  if (req.query.location) {
    filter.location = new RegExp(req.query.location, 'i');
  }
  
  if (req.query.priceMin || req.query.priceMax) {
    filter.price = {};
    if (req.query.priceMin) filter.price.$gte = parseInt(req.query.priceMin);
    if (req.query.priceMax) filter.price.$lte = parseInt(req.query.priceMax);
  }
  
  if (req.query.search) {
    filter.$text = { $search: req.query.search };
  }

  // Sort options
  let sort = {};
  if (req.query.sort) {
    switch (req.query.sort) {
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'oldest':
        sort = { createdAt: 1 };
        break;
      case 'price-low':
        sort = { price: 1 };
        break;
      case 'price-high':
        sort = { price: -1 };
        break;
      case 'popular':
        sort = { views: -1, likes: -1 };
        break;
      default:
        sort = { createdAt: -1 };
    }
  } else {
    sort = { featured: -1, createdAt: -1 };
  }

  const pets = await Pet.find(filter)
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .select('-__v');

  const total = await Pet.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  res.json({
    pets,
    pagination: {
      currentPage: page,
      totalPages,
      totalPets: total,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  });
});

// @desc    Get single pet by ID
// @route   GET /api/pets/:id
// @access  Public
const getPetById = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  
  if (pet) {
    // Increment view count
    pet.views += 1;
    await pet.save();
    
    res.json(pet);
  } else {
    res.status(404);
    throw new Error('Pet not found');
  }
});

// @desc    Create a pet
// @route   POST /api/pets
// @access  Private
const createPet = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error('Validation failed');
  }

  const {
    name,
    category,
    breed,
    age,
    gender,
    size,
    price,
    images,
    description,
    location,
    traits,
    healthInfo,
    contact
  } = req.body;

  const pet = new Pet({
    name,
    category,
    breed,
    age,
    gender,
    size,
    price: price || 0,
    images: images || [],
    description,
    location,
    traits: traits || [],
    healthInfo: healthInfo || {},
    contact
  });

  const createdPet = await pet.save();
  res.status(201).json(createdPet);
});

// @desc    Update a pet
// @route   PUT /api/pets/:id
// @access  Private
const updatePet = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id);

  if (pet) {
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    res.json(updatedPet);
  } else {
    res.status(404);
    throw new Error('Pet not found');
  }
});

// @desc    Delete a pet
// @route   DELETE /api/pets/:id
// @access  Private
const deletePet = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id);

  if (pet) {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet removed' });
  } else {
    res.status(404);
    throw new Error('Pet not found');
  }
});

// @desc    Get featured pets
// @route   GET /api/pets/featured
// @access  Public
const getFeaturedPets = asyncHandler(async (req, res) => {
  const pets = await Pet.find({ featured: true, status: 'Available' })
    .sort({ createdAt: -1 })
    .limit(8);
  
  res.json(pets);
});

// @desc    Like/Unlike a pet
// @route   POST /api/pets/:id/like
// @access  Public
const likePet = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  
  if (pet) {
    pet.likes += 1;
    await pet.save();
    res.json({ message: 'Pet liked', likes: pet.likes });
  } else {
    res.status(404);
    throw new Error('Pet not found');
  }
});

// @desc    Get pets by category
// @route   GET /api/pets/category/:category
// @access  Public
const getPetsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const pets = await Pet.find({ 
    category: category,
    status: 'Available'
  })
    .sort({ featured: -1, createdAt: -1 })
    .limit(limit)
    .skip(skip);

  const total = await Pet.countDocuments({ 
    category: category,
    status: 'Available'
  });

  res.json({
    pets,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPets: total
    }
  });
});

module.exports = {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  getFeaturedPets,
  likePet,
  getPetsByCategory
};