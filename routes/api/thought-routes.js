const router = require("express").Router();

const {
  createThought,
  getThoughtbyId,
} = require("../../controllers/thought-controller");

router.route('/').post(createThought);

router.route("/:thoughtId").get(getThoughtbyId);

module.exports = router;