const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const PORT = 8080;
// Initialize Express
var app = express();

mongoose.connect("mongodb://harris:12345@ds147864.mlab.com:47864/heroku_xf7209r9");
// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs"}));
app.set("view engine", "hbs");

require('./controllers/routes')(app);

app.listen(process.env.PORT  || PORT, () => console.log('listening on :8080'));