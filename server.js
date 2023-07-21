//set up server, import express library, connection file from config folder. Set up port for server to listen to, middleware and start the express server when we run node server

// Import the Express library
const express = require ('express');

// Import the MongoDB connection from the 'config/connection' file
const db = require ('./config/connection');


const routes = require('./');   //missing

// Set the port number for the server to listen on.
const PORT = process.env.PORT || 3001;

// Create an Express application instance.
const app = express();

// Middleware: Parse incoming requests with JSON payloads
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Mount the routes on the application
app.use(routes);

//when we run node server, start the Express server to listen on the specified port.
db.once('open', () => {app.listen(PORT, () => { console.log(`Server running on port ${PORT}`);
});
});


