const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

// body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const port = 3000;

// import router
const musician_router = require('../routes/musician');
app.use('/', musician_router);

module.exports = app;