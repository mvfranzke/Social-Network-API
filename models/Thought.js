// import mongoose
const { Schema, model } = require('mongoose');

//import reactionSchema as subdocument in thought model
const reactionSchema = require('./Reaction');

// sets the schema/blueprint for thoughtSchema based from README guideline
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    //Array of nested documents created with the `reactionSchema`
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      //Include getters (e.g., the 'createdAt' getter) when converting to JSON
      getters: true,
    },
    id: false,
  }
);

// custom getter function to format the date from createdAt
thoughtSchema.path('createdAt').get(function(value){
  return value.toLocaleString("en-US", { timeZone: "UTC" });
});

//retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual('reactionCount').get( function() { return this.reactions.length;} );

// creates model Thought from thoughtSchema
const Thought = model('Thought', thoughtSchema);

//exports Thought class to be used in other portion of application
module.exports = Thought