//import models
const { User, Thought } = require ('../models');

const userController = {
  //display all users
  async getUSers (req, res) {
    // Query the database to get all users and exclude the '__v' field from the result and send the fetched user data as a JSON response
    try {const dbUserdata = await User.find().select('-__v')res.json(dbUserdata);}
    //error handling
    catch(err) {
      console.log(err);res.status(500).json(err);
    }
  }
  //get single user by using their id
  //create a new user
  //update an existing user
  //delete a user, cascade to delete user thoughts as well
  // add other users inside the friends array
  // delete other user inside the friends array
};
