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

router
  .route('/')
  .get(
    advancedResults(Post, [
      {
        path: 'category',
        select: 'name description'
      },
      {
        path: 'author',
        select: 'name email avatar'
      }
    ]),
    getPosts
  )
  .post(protect, authorize('publisher', 'admin'), createPost);

router
  .route('/:id')
  .get(getPost)
  .put(protect, authorize('publisher', 'admin'), updatePost)
  .delete(protect, authorize('publisher', 'admin'), deletePost);

router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), upload, postPhotoUpload);

module.exports = router;