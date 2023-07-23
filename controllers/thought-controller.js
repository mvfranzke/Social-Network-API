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
        return res
          .status(404)
          .json('Thought saved but no user found');
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
  //get all thoughts
  // get single thought by ID
  // update a thought
  //delete a thought
  // add reaction to thought
  // delete reaction to thought
};

module.exports = thoughtController;