const db = require("../../models");
const axios = require("axios");
const cheerio = require("cheerio");
const router = require('express').Router();

router.get("/", (req,res) =>{
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
          // If an error occurred, do nothing
          console.log("filtered duplicate entry");
          });
        });
        db.Article.find({})
        .then(function(dbArticle) {
        console.log(dbArticle);
          // If we were able to successfully find Articles, render homepage with them
          res.render("index",{articles:dbArticle});
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
    });

        });		
	});


module.exports = router