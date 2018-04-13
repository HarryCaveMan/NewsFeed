const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const PORT = 8080;
// Initialize Express
var app = express();

const db = require("./models");


const conn = mongoose.connect("mongodb://harris:12345@ds147864.mlab.com:47864/heroku_xf7209r9");
// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

app.get("/", (req,res) =>{
	axios.get("https://reddit.com/r/worldnews")
	.then(response =>{
		let $ = cheerio.load(response.data);

        $("a[class='title may-blank outbound']").each((i,element) => {
          let result = {};
	      // Add the text and href of every link, and save them as properties of the result object
	      result.title = element.children[0].data;
	      result.link = element.attribs.href;

          
          db.Article.create(result)
	      //db.Article.create(result);
         .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
         })
          .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
          });
        });
        db.Article.find({})
        .then(function(dbArticle) {
          // If we were able to successfully find Articles, send them back to the client
          res.json(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
    });

        });		
	});


app.listen(process.env.PORT  || PORT, () => console.log('listening on :8080'));