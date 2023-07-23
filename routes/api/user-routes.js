const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
} = require ('../../controllers/user-controller');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUserById).post(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend)

module.exports = router;