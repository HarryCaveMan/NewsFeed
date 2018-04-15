const db = require("../../models");
const router = require('express').Router();

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/article/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("notes")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

router.post("/article/:id", function(req, res) {
  // Create a new Book in the database
  db.Note.create(req.body)
    .then(function(comment) {
      // If a Book was created successfully, find one library (there's only one) and push the new Book's _id to the Library's `books` array
      // { new: true } tells the query that we want it to return the updated Library -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({_id:req.params.id}, { $push: { notes: comment._id } }, { new: true });
    })
    .then(function(comments) {
      // If the Library was updated successfully, send it back to the client
      res.json(comments);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

module.exports = router;

