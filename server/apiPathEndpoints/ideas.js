const express = require('express'); // Import the Express library
const ideasRouter = express.Router(); // Create an instance of an Express router and save it under minionsRouter
const { getAllFromDatabase, 
        addToDatabase, 
        getFromDatabaseById, 
        updateInstanceInDatabase, 
        deleteFromDatabasebyId } = require('../db') // import database functions from './db.js'

ideasRouter.param('ideaId', (req,res,next,id) => {
    let ideaId = Number(id);
    try {
        const found = getFromDatabaseById('ideas', ideaId);
    
        if (found) {
            req.id = ideaId;
            next();
        } else {
            next(new Error("The requested idea was not found in our database. Please try a different Id."))
        }
    } catch (err) {
        next(err);
    }
})

// GET request that returns an array of all ideas
ideasRouter.get('/', (req,res,next) => {
    res.status(200).send(getAllFromDatabase('ideas'));
})

// POST request that creates a new idea and saves it to the database
ideasRouter.post('/', (req,res,next) => {
    const newIdeaToCreate = req.body;

    if(newIdeaToCreate.name && newIdeaToCreate.description && newIdeaToCreate.weeklyRevenue && newIdeaToCreate.numWeeks) {
        const newIdea = addToDatabase('ideas', newIdeaToCreate);
        res.status(201).send(newIdea);
    } else {
        res.status(400).send("Idea must have all fields filled out to be created!")
    }
})

// GET request that returns a single idea by id
ideasRouter.get('/:ideaId', (req,res,next) => {
    res.status(200).send(getFromDatabaseById('ideas', req.id));
})

// PUT request that updates a single idea by id
ideasRouter.put('/:ideaId', (req,res,next) => {
    const ideaToUpdate = req.body;
    const updatedIdea = updateInstanceInDatabase('ideas', ideaToUpdate);
    if(updatedIdea) {
        res.status(200).send(updatedIdea);
    } else {
        res.status(400).send("Invalid input")
    }
})

// DELETE request that deletes a single idea by id
ideasRouter.delete('/:ideaId', (req,res,next) => {
    res.status(200).send(deleteFromDatabasebyId('ideas', req.id));
})

module.exports = ideasRouter;