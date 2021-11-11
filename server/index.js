const MovieModel = require("./database/movies");
require('dotenv').config()
const express = require("express");
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));

// http://localhost:5000/
app.get("/", (req, res) => {
    return res.json({"WELCOME": `to my Backend Software for the BookMyShow`});
});

/*
Route            /movies
Description      Get all the movies
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
// http://localhost:5000/movies
app.get("/movies", async (req, res) => {
    const getAllMovies = await MovieModel.find();
    return res.json(getAllMovies);
});

/*
Route            /movies/:id
Description      Get a single movie
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
// http://localhost:5000/movie/:id
app.get("/movie/:id", async (req, res) => {
    const {id} = req.params;
    const getMovie = await MovieModel.findOne({_id: id});
    return res.json(getMovie);
});

app.listen(5000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
});