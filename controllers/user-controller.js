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
        .populate("friends")  //populates the "friends" field with the corresponding user data
        .populate("thoughts"); //populates the "thoughts" field with the corresponding thought data

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
      res.json({
        success: true,
        message: "Successfully created a new user!",
        user: dbUserData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //update an existing user
  async updateUser(req, res) {
    try {
      //locate the user by their _id and update their information based on the data in req.body
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          //$set operator updates the fields specified in req.body
          $set: req.body,
        },
        {
          runValidators: true, // ensures all required field are enforces and regular expression
          new: true, //returns the updated user data after the update is applied
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
      //user data will be stored in dbUserData before it is deleted
      const dbUserData = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!dbUserData) {
        return res.status(404).json("No user found");
      }
      //once user is successfully deleted, we will also delete all thoughts associated with the user
      await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } }); //$in operator is used to match the user's thoughts from the dbUserData.thoughts array
      res.json("Successfully deleted user");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // add other users inside the friends array
  async addFriend(req, res) {
    try {
      //locate the user by their _id and update their 'friends' array
      const dbUserdata = await User.findOneAndUpdate(
        { _id: req.params.userId },
        //$addToSet operator is used to add the friend's ID to the 'friends' array
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
      //locate the user by their _id and use $pull to remove the friend with the provided friendId from the friends array
      const dbUserdata = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!dbUserdata) {
        return res.status(404).json("No user found");
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

//exports userController to be used in other app
module.exports = userController;