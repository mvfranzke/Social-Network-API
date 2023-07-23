//import express router
const router = require('express').Router();

//import all controller functions from the user-controller file, these are functions that handle the query(CRUD) 
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require ('../../controllers/user-controller');

// route for getting all users and creating a new user
router.route('/')
  .get(getUsers)
  .post(createUser);

//routes for getting a single user by their ID, updating a user by their ID, and deleting a user by their ID
router.route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// route for adding a friend to a user by their ID and deleting a friend from a user by their ID and friend ID
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

  //exporting router to be used in other app
module.exports = router;