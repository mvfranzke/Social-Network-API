//import express, thought-routes.js and user-routes.js
const router = require("express").Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

//mounts the userRoutes middleware onto the main router at the endpoint /users
router.use('/users', userRoutes);

//mounts the thoughtRoutes middleware onto the main router at the endpoint /thoughts
router.use('/thoughts', thoughtRoutes);

//main router with the mounted userRoutes and thoughtRoutes to be used in other app
module.exports = router;
