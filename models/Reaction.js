//This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.

//import mongoose
const { Schema, Types } = require("mongoose");

// set schema/ blueprint for reaction
const reactionSchema = new Schema(
  {
    reactionID: {
      type: Schema.Types.ObjectID,
      //Default value is set to a new ObjectId
      default: new mongoose.Types.ObjectID(),
    },
    reactionBody: {
      type: String,
      required: true,
      //280 character maximum
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      // Set default value to the current timestamp
      default: Date.now,
    },
  },
  {
    //custom getter method for 'createdAt' field to format the timestamp on query
    toJSON: {
      getters: true,
    },
  }
);

// getter method to format the timestamp on query
reactionSchema.path('createdAt').get(function(value) {
  return value.toLocaleString('en-US', {timeZone: 'UTC'});
});

// export reactionSchema to be used in other file
module.exports = reactionSchema;