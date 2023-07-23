const router = require("express").Router();

const {
  createThought,
  getThoughtbyId,
  getAllThoughts,
  updateThought,
  deleteThought,
} = require("../../controllers/thought-controller");

router.route('/').post(createThought).get(getAllThoughts);

router.route("/:thoughtId").get(getThoughtbyId).put(updateThought).delete(deleteThought);



module.exports = router;