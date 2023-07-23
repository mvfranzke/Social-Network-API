const router = require("express").Router();

const {
  createThought,
  getThoughtbyId,
  getAllThoughts,
  updateThought,
  deleteThought,
  addReactiontoThought,
  deleteReactiontoThought,
} = require("../../controllers/thought-controller");

router.route('/').post(createThought).get(getAllThoughts);

router.route("/:thoughtId").get(getThoughtbyId).put(updateThought).delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReactiontoThought);

router.route("/:thoughtId/reactions/:reactionID").delete(deleteReactiontoThought);

module.exports = router;