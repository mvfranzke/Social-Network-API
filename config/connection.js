//set up connection bt importing mongoose library, connect to mondodb uri or local uri if not available and export object returned by mongoose.connect()

// import mongoose library
const mongoose = require ('mongoose');

//connect to mongodb database using the mongo db URI or the default local URI if not available
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia');

//export the connection object returned by mongoose.connect()
module.exports = mongoose.connection;