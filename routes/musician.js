// import express
const express = require('express');

//import Musician 
const { Musician } = require("../models/index");

// create router
const musician_router = express.Router(); 
//routes

//musicians route to return all musicians 
 musician_router.get('/musicians', async (req, res, next) => {
    try{
        const getMusician = await Musician.findAll();
        if (!getMusician) {
            throw new Error ('error');
        }
        res.json(getMusician);
        console.log(getMusician)
    } catch (error) {
        next(error)
    }
})


// get a specific musician 
musician_router.get('/musicians/:id', async (req, res, next) => {
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

// post musicians (create new musician) 
musician_router.post('/musicians/:id', async(req, res, next) => {
    try{
        const {name, instrument} = req.body;
        const newMuscian = await Musician.create({name, instrument});
        res.json(newMuscian);
    } catch (error){
        next(error)
    }   
})

// put (update musician and repsond w updated musician)
musician_router.put('/musicians/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {name, instrument} = req.body; 
        const updateMusician = await Musician.findByPk(id);
        // update musician 
        updateMusician.name = name
        updateMusician.instrument = instrument;
        // sequelize to udpate database
        await updateMusician.save();
        // send back updated musician 
        res.json(updateMusician);
    } catch (error) {
        next(error);
    }
});

// delete musician 
musician_router.delete('/musicians/:id', async (req, res, next) => {
    try{
    const id = req.params.id;
    const deleteMusician = await Musician.findByPk(id);
    await deleteMusician.destroy();
    res.json(deleteMusician);
    } catch(error) {
        next(error);
    }
})

module.exports = musician_router;