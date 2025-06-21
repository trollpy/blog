const express = require('express');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Category = require('../models/Category');

const router = express.Router();

router
  .route('/')
  .get(advancedResults(Category), getCategories)
  // Allow any authenticated user to create categories
  .post(protect, createCategory);

router
  .route('/:id')
  .get(getCategory)
  // Only admin can update or delete categories
  .put(protect, authorize('admin'), updateCategory)
  .delete(protect, authorize('admin'), deleteCategory);

module.exports = router;
