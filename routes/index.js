//import express router and api directory
const router = require('express').Router();
const apiRoutes = require('./api');

//import the API routes from the './api' directory
router.use('/api', apiRoutes);

//mount the API routes on the '/api' path. All the routes defined in the 'apiRoutes' will have '/api' as their base path.
router.use((req, res) => {
  return res.send("Routes not found"); //catch error message
});


  //exporting router to be used in other app
module.exports = router;
