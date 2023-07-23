const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUserById,
} = require ('../../controllers/user-controller');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUserById);

module.exports = router;