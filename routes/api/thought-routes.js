const router = require("express").Router();

const {
  createThought,
  getThoughtbyId,
  getAllThoughts,
  updateThought,
} = require("../../controllers/thought-controller");

router.route('/').post(createThought).get(getAllThoughts);

router.route("/:thoughtId").get(getThoughtbyId).put(updateThought);

module.exports = router;