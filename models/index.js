//create connection between user and thought js and import them to be used in other file

//import user model from user.js file
const User = require ('./User');

//import thought model from thought.js file
const Thought = require ('./Thought');

//exports both user and thought to be used in other file
module.exports = { User, Though};