const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Category name cannot be more than 50 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Cascade delete posts when a category is deleted
CategorySchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  await this.model('Post').deleteMany({ category: this._id });
  next();
});

module.exports = mongoose.model('Category', CategorySchema);