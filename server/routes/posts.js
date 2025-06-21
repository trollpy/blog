const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  postPhotoUpload
} = require('../controllers/postController');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Post = require('../models/Post');
const upload = require('../middleware/upload');

const router = express.Router();

// Middleware to protect only when author=me
const protectIfAuthorMe = (req, res, next) => {
  if (req.query.author === 'me') {
    return protect(req, res, next);
  }
  next();
};

router.route('/')
  .get(
    protectIfAuthorMe,
    advancedResults(Post, [
      { path: 'category', select: 'name description' },
      { path: 'author', select: 'name email avatar' }
    ]),
    getPosts
  )
  .post(protect, createPost);

router.route('/:id')
  .get(getPost)
  .put(protect, authorize('admin', 'publisher'), updatePost)
  .delete(protect, authorize('admin', 'publisher'), deletePost);

router.route('/:id/photo')
  .put(protect, authorize('admin', 'publisher'), upload, postPhotoUpload);

module.exports = router;
