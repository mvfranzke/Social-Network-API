const router = require("express").Router();

const {
  createThought,
  getThoughtbyId,
  getAllThoughts,
} = require("../../controllers/thought-controller");

router.route('/').post(createThought).get(getAllThoughts);

router.route("/:thoughtId").get(getThoughtbyId);

module.exports = router;