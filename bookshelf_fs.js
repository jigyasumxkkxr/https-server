const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = "D:\\Code\\cohort\\code\\04-http-server\\bookshelf.json";
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let bookShelf = [];

fs.readFile(path, (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    bookShelf = [];
  } else {
    try {
      bookShelf = JSON.parse(data);
    } catch (err) {
      console.error("Error parsing JSON:", err);
      bookShelf = [];
    }
  }
});

app.get('/bookshelf', (req, res) => {
  res.json(bookShelf);
});

app.get('/bookshelf/:id', (req, res) => {
  const bookIndex = bookShelf.findIndex(t => t.id == req.params.id);
  if (bookIndex === -1) {
    res.status(404).send("Invalid ID");
  } else {
    res.json(bookShelf[bookIndex]);
  }
});

app.post('/bookshelf', (req, res) => {
  const newBook = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    author: req.body.author,
    description: req.body.description
  };
  bookShelf.push(newBook);
  fs.writeFile(path, JSON.stringify(bookShelf, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(201).json(newBook);
    }
  });
});

app.put('/bookshelf/:id', (req, res) => {
  const bookIndex = bookShelf.findIndex(t => t.id == req.params.id);
  if (bookIndex === -1) {
    res.status(404).send("Invalid ID");
  } else {
    bookShelf[bookIndex].title = req.body.title;
    bookShelf[bookIndex].author = req.body.author;
    bookShelf[bookIndex].description = req.body.description;
    fs.writeFile(path, JSON.stringify(bookShelf, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).json(bookShelf[bookIndex]);
      }
    });
  }
});

app.delete('/bookshelf/:id', (req, res) => {
  const bookIndex = bookShelf.findIndex(t => t.id == req.params.id);
  if (bookIndex === -1) {
    res.status(404).send("Invalid ID");
  } else {
    bookShelf.splice(bookIndex, 1);
    fs.writeFile(path, JSON.stringify(bookShelf, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).send();
      }
    });
  }
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
