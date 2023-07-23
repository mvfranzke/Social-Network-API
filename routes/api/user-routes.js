const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
} = require ('../../controllers/user-controller');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUserById).post(updateUser);

module.exports = router;