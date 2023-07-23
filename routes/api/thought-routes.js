//import express router
const router = require("express").Router();

//impost all controller functions from the thought-controller file, these are functions that handle the query(CRUD) 
const {
  createThought,
  getThoughtbyId,
  getAllThoughts,
  updateThought,
  deleteThought,
  addReactiontoThought,
  deleteReactiontoThought,
} = require("../../controllers/thought-controller");

//routes for thoughts
router
  .route("/")
  .post(createThought) //route for creating a new thought
  .get(getAllThoughts);   //route for getting all thoughts

//routes for a specific thought by its ID
router
  .route("/:thoughtId")
  .get(getThoughtbyId) //  route for getting a single thought by its ID
  .put(updateThought) // route for updating a thought by its ID
  .delete(deleteThought); //for deleting a thought by its ID

//route for adding a reaction to a thought by its ID
router.route("/:thoughtId/reactions")
  .post(addReactiontoThought);

//oute for deleting a reaction from a thought by its ID and reaction ID
router.route("/:thoughtId/reactions/:reactionID")
  .delete(deleteReactiontoThought);

//exporting router to be used in other app
module.exports = router;