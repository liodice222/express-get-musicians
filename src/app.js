const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 
 app.get('/musicians', async (req, res, next) => {
    try{
        const getMusician = await Musician.findAll();
        if (!getMusician) {
            throw new Error ('error');
        }
        res.json(getMusician);
    } catch (error) {
        next(error)
    }
})


// get a specific musician 
app.get('/musicians/:id', async (req, res, next) => {
    try{
        const num = req.params.id
        const getMusician = await Musician.findByPk(num);
        if (!getMusician) {
            throw new Error ('error');
        }
        res.json(getMusician);
    } catch (error) {
        next(error)
    }
})




module.exports = app;