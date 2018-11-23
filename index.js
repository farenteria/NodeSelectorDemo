// modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

// globals
const PORT = process.env.PORT || 8081;
const app = express();
let countries = [];
let states = [];
let cities = [];

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// Process application/json
// app.use(bodyParser.json());

// File Reading
function getLocations(){
    fs.readFile("./public/Countries.txt", {encoding: "utf-8"}, (err, data) => {
        if(!err){
            // Only one location per line in text file!
            countries = data.split("\n");
        }
    });

    fs.readFile("./public/CanadaStates.txt", {encoding: "utf-8"}, (err, data) => {
        if(!err){
            // Only one location per line in text file!
            states = data.split("\n");
        }
    });
}

// ROUTES
app.get("/", (req, res) => {
    getLocations();
    console.log('From get, req.body is:', req.body);
    res.render("index", {countries: countries, states: states, cities: cities});
});

app.get("/:location", (req, res) => {
    console.log("/:location get", req.params.location);
    res.send("here you go");
});

// Server initialization
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});