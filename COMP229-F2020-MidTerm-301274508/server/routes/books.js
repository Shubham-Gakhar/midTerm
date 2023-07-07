// Shubham Gakhar - 301274505 - COMP229 - MidTerm
var importFunction = (this && this.importDefault) || function(mod){
  return (mod && mod._esModule ? mod : {"default" : mod});
}


// Modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


// Define the book model
let thisBook = importFunction(require('../models/books'));


/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // Find all books in the books collection
  thisBook.default.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });
});


// GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', { title: 'Add Book', page: 'books', books: '' });
});


router.post('/add', (req, res, next) => {
  let newBook = new thisBook.default({
    "Title": req.body.title,
    "Description": "",
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  thisBook.default.create(newBook, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.redirect('/books');
  });
});


router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  thisBook.default.findById(id, {}, {}, (err, bookItemToEdit) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.render('books/details', { title: 'Edit', page: 'books', books: bookItemToEdit });
  });
});


router.post('/:id', (req, res, next) => {
  let id = req.params.id;

  let editBookItem = new thisBook.default({
    "_id": id,
    "Title": req.body.title,
    "Description": "",
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  thisBook.default.updateOne({ _id: id }, editBookItem, {}, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.redirect('/books');
  });
});

router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  thisBook.default.remove({ _id: id }, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.redirect('/books');
  });
});

module.exports = router;