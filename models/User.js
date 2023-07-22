//import mongoose 
const { Schema, model } = require('mongoose');

//define user schema using the mongoose schema constructor
//sets the blueprint/structure of userSchema based from the README guideline
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, //regular expression matcing a valid email address
    },
    // Array of `_id` values referencing the `Thought` model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    //Array of `_id` values referencing the `User` model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJson: { virtuals: true }, //setting toJson to inclde virtuals when converting to JSON
    id: false, //setting id to false to exclude _id from the schema
  }
);

//virtual called `friendCount` that retrieves the length of the user's `friends` array field on query
userSchema.virtual('friendCount').get(function() {return this.friends.length;});

// create the User model using the userSchema
const User = model('User', userSchema);

// exports User model to be used in other parts of the application
module.exports = User;