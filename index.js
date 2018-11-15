// modules
const express = require("express");
const path = require("path");

// globals
const PORT = process.env.PORT || 8081;
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));

// GET ROUTES
app.get("/", (req, res) => {
    res.render("index");
});

// Server initialization
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});