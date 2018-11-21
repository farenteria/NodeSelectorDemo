// modules
const express = require("express");
const path = require("path");
const fs = require("fs");

// globals
const PORT = process.env.PORT || 8081;
const app = express();
let countries = [];

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));

// File Reading
function getLocations(){
    fs.readFile("./public/Countries.txt", {encoding: "utf-8"}, (err, data) => {
        if(!err){
            // Only one location per line in text file!
            countries = data.split("\n");
        }
    });
}

// ROUTES
app.get("/", (req, res) => {
    getLocations();
    res.render("index", {countries: countries});
});

app.post("/", (req, res) => {
    console.log(req.body);
});

// Server initialization
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});