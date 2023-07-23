const router = require("express").Router();

const {
  createThought,
  getThoughtbyId,
  getAllThoughts,
  updateThought,
  deleteThought,
  addReactiontoThought,
} = require("../../controllers/thought-controller");

router.route('/').post(createThought).get(getAllThoughts);

router.route("/:thoughtId").get(getThoughtbyId).put(updateThought).delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReactiontoThought);

module.exports = router;