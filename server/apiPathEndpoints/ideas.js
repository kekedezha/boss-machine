const express = require('express'); // Import the Express library
const ideasRouter = express.Router(); // Create an instance of an Express router and save it under minionsRouter
const { getAllFromDatabase, 
        addToDatabase, 
        getFromDatabaseById, 
        updateInstanceInDatabase, 
        deleteFromDatabasebyId } = require('../db') // import database functions from './db.js'


// GET request that returns an array of all ideas
ideasRouter.get('/', (req,res,next) => {
    res.status(200).send(getAllFromDatabase('ideas'));
})

// POST request that creates a new idea and saves it to the database


// GET request that returns a single idea by id


// PUT request that updates a single idea by id


// DELETE request that deletes a single idea by id

module.exports = ideasRouter;