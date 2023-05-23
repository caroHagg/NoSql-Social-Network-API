const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/responses
//router.route('/:thoughtId/responses').post(addThoughtReactions);

// /api/thoughts/:thoughtId/reactions/:reactionId
//router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReactions);

module.exports = router;
