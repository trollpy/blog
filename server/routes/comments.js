const express = require('express');
const {
  getComments,
  getComment,
  addComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Comment = require('../models/Comment');

const router = express.Router();

router
  .route('/')
  .get(advancedResults(Comment, {
    path: 'user',
    select: 'name avatar'
  }), getComments);

router
  .route('/:id')
  .get(getComment)
  .put(protect, updateComment)
  .delete(protect, deleteComment);

module.exports = router;