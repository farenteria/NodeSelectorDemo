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
function getLocations(location, type, res){
    fs.readFile(`./locations/${location}.txt`, {encoding: "utf-8"}, (err, data) => {
        if(!err){
            // Only one location per line in text file!
            let result = data.split("\n");

            switch(type){
                case "country":
                    countries = data.split("\n");
                    // res.send(countries);
                    break;
                case "state":
                    states = data.split("\n");
                    res.send(states);
                    break;   
                case "city":
                    cities = data.split("\n");
                    break;
            }
        }
    });
}

// ROUTES
app.get("/", (req, res) => {
    getLocations("Countries", "country");
    res.render("index", {countries: countries, states: states, cities: cities});
});

app.get("/country/:name", (req, res) => {
    console.log("/:country get", req.params.name);

    // set and return the apporpriate states for that country
    getLocations(req.params.name, "state", res);
});

app.get("/state/:state", (req, res) => {
    console.log("/:state get", req.params.state);
    getLocations(req.params.name, "city", res);
});

app.get("/city/:city", (req, res) => {
    console.log("/:city get", req.params.city);
    res.send("city");
});

// Server initialization
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});