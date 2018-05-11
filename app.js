const express = require("express");
var app = express();
const hbs = require("hbs");
const fs = require("fs");

// MIDDLEWEAR
const route = hbs.registerPartials(__dirname + "/views/partials") // takes directory that registers all of your handlebar partials.
app.set("view engine", "hbs");

app.use((req,res,next) => { // register  middlewear
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    // create a log file
    fs.appendFile("server.log", log + "\n", (err) => {
        if(err){
            console.log("Unable to append to server.log");
        }
    });
    next(); // exit the middlewear
});

app.use((req,res,next) => {
    res.render("maintenance.hbs");
});

app.use(express.static(__dirname + "/public")); // Set root folder for web page.

// HELPERS
// Handlebars will look for a helper as well as whatever data you pass to render.
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

// ROUTING
app.get("/", (req,res) => {
	res.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to my website",
        likes: [
            "Biking",
            "Hiking"
        ]
    });
});

app.get("/about", (req,res) => {
    res.render("about.hbs", {
        pageTitle: "About Page",
    }) // The second argument of res.render is used to pass data into the render.
})

app.listen(3000, () => {
    console.log("Up on port 3000")
});

app.get("/bad", (req,res) => {
    res.send({
        errorMessage: "Unable to handle request"
    })
})