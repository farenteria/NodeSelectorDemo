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

// File Reading
function getLocations(location, type, res){
    fs.readFile(`./locations/${location}.txt`, {encoding: "utf-8"}, (err, data) => {
        if(!err){
            switch(type){
                case "country":
                    countries = data.split("\n");
                    // make sure to clear state and cities when country is changed
                    states = [];
                    cities = [];
                    res.render("index", {countries: countries, states: states, cities: cities});
                    break;
                case "state":
                    states = data.split("\n");
                    res.send({countries: countries, states: states, cities: cities});
                    break;   
                case "city":
                    cities = data.split("\n");
                    res.send({countries: countries, states: states, cities: cities});
                    break;
            }
        }
    });
}

// ROUTES
app.get("/", (req, res) => {
    getLocations("Countries", "country", res);
});

app.get("/country/:name", (req, res) => {
    // set and return the apporpriate states for that country
    getLocations(req.params.name, "state", res);
});

app.get("/state/:name", (req, res) => {
    // set and return appropriate cities for that state
    getLocations(req.params.name, "city", res);
});

app.get("/city/:city", (req, res) => {
    res.send("city");
});

// Server initialization
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});