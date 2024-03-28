const express = require('express'); // Import the Express library
const minionsRouter = express.Router(); // Create an instance of an Express router and save it under minionsRouter
const { getAllFromDatabase, 
        addToDatabase, 
        getFromDatabaseById, 
        updateInstanceInDatabase, 
        deleteFromDatabasebyId } = require('../db') // import database functions from './db.js'

minionsRouter.param('minionId', (req,res,next,id) => {
    let minionId = id;
    try {
        const found = getFromDatabaseById('minions', minionId);
        if (found) {
            req.id = minionId;
            next();
        } else {
            req.status = 404;
            next(new Error("The requested minion was not found in our database. Please try a different Id."))
        }
    } catch (err) {
        next(err);
    }
})

// GET request that returns an array of all minions
minionsRouter.get('/', (req,res,next) => {
    res.status(200).send(getAllFromDatabase('minions'));
})

// POST request that creates a new minion and saves it to the database
minionsRouter.post('/', (req,res,next) => {
    if(req.body) {
        const newMinion = addToDatabase('minions', req.body);
        res.status(201).send(newMinion);
    } else {
        res.status(400).send("Minion must have all fields filled out to be created!")
    }
})

// GET request that returns a single minion by id
minionsRouter.get('/:minionId', (req,res,next) => {
    const requestedMinion = getFromDatabaseById('minions', req.id);
    console.log(requestedMinion);
    res.status(200).json(requestedMinion);
})

// PUT request that updates a single minion by id
minionsRouter.put('/:minionId', (req,res,next) => {
    const minionToUpdate = req.body;
    const updatedMinion = updateInstanceInDatabase('minions', minionToUpdate);
    if(updatedMinion) {
        res.status(200).send(updatedMinion);
    } else {
        res.status(400).send("Invalid input")
    }
})

// DELETE request that deletes a single minion by id
minionsRouter.delete('/:minionId', (req,res,next) => {
    res.status(204).send(deleteFromDatabasebyId('minions', req.id));
})

module.exports = minionsRouter;