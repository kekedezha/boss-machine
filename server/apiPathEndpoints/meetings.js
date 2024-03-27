const express = require('express'); // Import the Express library
const meetingsRouter = express.Router(); // Create an instance of an Express router and save it under meetingsRouter
const { getAllFromDatabase, deleteAllFromDatabase, addToDatabase } = require('../db') // import database functions from './db.js'

// GET request that returns an array of all meetings
meetingsRouter.get('/', (req,res,next) => {
    res.status(200).send(getAllFromDatabase('meetings'));
})

// POST request that creates a new meeting and saves it to the database
meetingsRouter.post('/', (req,res,next) => {
    const newMeetingToCreate = req.body;

    if (newMeetingToCreate.time && newMeetingToCreate.date && newMeetingToCreate.day && newMeetingToCreate.note) {
        const newIdea = addToDatabase('meetings', newMeetingToCreate);
        res.status(201).send(newIdea);
    } else {
        res.status(400).send("Meetings must have all fields filled out to be created!")
    }
})

// DELETE request that deletes ALL meetings from the database
meetingsRouter.delete('/', (req,res,next) => {
    res.status(200).send(deleteAllFromDatabase('meetings'));
})
module.exports = meetingsRouter;