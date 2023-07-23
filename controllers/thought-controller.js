//import models
const { Thought, User } = require('../models')

const thoughtController = {
  // create a thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);

      const dbUserData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json("Thought saved but no user found");
      }
      //message to return after creating a new user on file
      res.json({
        success: true,
        message: "Thought successfully created",
        user: dbUserData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // get single thought by ID
  async getThoughtbyId(req, res) {
    try {
      const dbThoughtData = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!dbThoughtData) {
        return res.status(404).json("Not found");
      }
      //message to return after searching thought by its _id
      res.json({
        success: true,
        message: "Please see thought found based from ID query",
        user: dbThoughtData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //get all thoughts
  async getAllThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find().sort({ createdAt: -1 }); //sort descending by createdAt date
      //message to return after retrieving all thoughts save on file, no filter
      res.json({
        success: true,
        message: "Please see all thoughts saved below",
        user: dbThoughtData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // update a thought
  async updateThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json("No thought found");
      }
      //message to return to update a thought by its `_id
      res.json({
        success: true,
        message: "Thought successfully updated",
        user: dbThoughtData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //delete a thought
  async deleteThought(req, res) {
    try {
      //Find the thought with the given thoughtId and remove it from the database using Thought.findOneAndRemove
      const dbThoughtData = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!dbThoughtData) {
        return res.status(404).json("Not found");
      }
      //If the thought is successfully deleted, find the user with the thoughtId in their thoughts array
      const dbUserData = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        //update the thoughts array to remove the deleted thought using User.findOneAndUpdate with $pull
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!dbUserData) {
        return res
          .status(404)
          .json('No thought found associated with the user');
      }

      res.json({
        success: true,
        message: "Thought successfully deleted on file",
        user: dbUserData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // add reaction to thought
  async addReactiontoThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json("Not found");
      }

      res.json({
        success: true,
        message: "Reaction successfully added on thought",
        thought: dbThoughtData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // delete reaction to thought
  async deleteReactiontoThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json("Not found");
      }

      res.json({
        success: true,
        message: "Reaction successfully deleted on thought",
        user: dbThoughtData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

//export thoughtController to be used in other file
module.exports = thoughtController;