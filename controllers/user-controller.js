//import models
const { User, Thought } = require ('../models');

const userController = {
  //display all users
  async getUsers(req, res) {
    // Query the database to get all users and exclude the '__v' field from the result and send the fetched user data as a JSON response
    try {
      const dbUserdata = await User.find().select("-__v");
      res.json({
        success: true,
        message: "Please see all users saved below",
        user: dbUserdata,
      });
    } catch (err) {
      //error handling
      console.log(err);
      res.status(500).json(err);
    }
  },
  //get single user by using their id
  async getUserById(req, res) {
    try {
      const dbUserData = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");

      if (!dbUserData) {
        return res.status(404).json("No user found");
      }

      res.json({
        success: true,
        message: "Please see details below based from userid query",
        user: dbUserData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //update an existing user
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!dbUserData) {
        return res.status(404).json("No user found");
      }

      res.json({
        success: true,
        message: "Successfully updated user info",
        user: dbUserData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //delete a user, cascade to delete user thoughts as well
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!dbUserData) {
        return res.status(404).json("No user found");
      }
      await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      res.json("Successfully  deleted user");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // add other users inside the friends array
  async addFriend(req, res) {
    try {
      const dbUserdata = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!dbUserdata) {
        return res.status(404).json("No user found");
      }

      res.json({
        success: true,
        message: "Friend successfully added",
        user: dbUserdata,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete other user inside the friends array
  async deleteFriend(req, res) {
    try {
      const dbUserdata = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!dbUserdata) {
        return res.status(404).json('No user found');
      }

      res.json({
        success: true,
        message: "Friend successfully deleted",
        user: dbUserdata,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;