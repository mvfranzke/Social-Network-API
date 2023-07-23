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
      const dbThoughtData = await Thought.find().sort({ createdAt: -1 });

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
      const dbThoughtData = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!dbThoughtData) {
        return res.status(404).json("Not found");
      }
      const dbUserData = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!dbUserData) {
        return res
          .status(404)
          .json("Thought created but no user found in system");
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

module.exports = thoughtController;