const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://localhost:27017/museum", {
  useNewUrlParser: true,
});

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  director: String,
  producer: String,
  studio: String,
  year: String,
  rating: String,
  likes: Number,
  image_path: String,
});

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  publisher: String,
  year: String,
  pages: String,
  likes: Number,
  image_path: String,
});

const characterSchema = new mongoose.Schema({
  name: String,
  description: String,
  species: String,
  age: String,
  likes: Number,
  image_path: String,
});

const Movie = mongoose.model("Movie", movieSchema);
const Book = mongoose.model("Book", bookSchema);
const Character = mongoose.model("Character", characterSchema);

// Configure multer so that it will upload to '/var/www/lab4.stevenrummler.com/images/'
const multer = require("multer");
const upload = multer({
  dest: "/var/www/cp4.stevenrummler.com/images/",
  limits: {
    fileSize: 10000000,
  },
});

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post("/api/photos", upload.single("photo"), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename,
  });
});

app.post("/api/movies", async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    director: req.body.director,
    producer: req.body.producer,
    studio: req.body.studio,
    year: req.body.year,
    rating: req.body.rating,
    likes: req.body.likes,
    image_path: req.body.image_path,
  });
  try {
    await movie.save();
    res.send(movie);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/api/books", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    publisher: req.body.publisher,
    year: req.body.year,
    pages: req.body.pages,
    likes: req.body.likes,
    image_path: req.body.image_path,
  });
  try {
    await book.save();
    res.send(book);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/api/characters", async (req, res) => {
  const character = new Character({
    name: req.body.name,
    description: req.body.description,
    species: req.body.species,
    age: req.body.age,
    likes: req.body.likes,
    image_path: req.body.image_path,
  });
  try {
    await character.save();
    res.send(character);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/api/movies", async (req, res) => {
  try {
    let movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/api/books", async (req, res) => {
  try {
    let books = await Book.find();
    res.send(books);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/api/characters", async (req, res) => {
  try {
    let characters = await Character.find();
    res.send(characters);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete("/api/movies/:id", async (req, res) => {
  try {
    await Movie.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete("/api/books/:id", async (req, res) => {
  try {
    await Book.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete("/api/characters/:id", async (req, res) => {
  try {
    await Character.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put("/api/movies/:id", async (req, res) => {
  try {
    let movie = await Movie.findOne({ _id: req.params.id });
    (movie.title = req.body.title),
      (movie.description = req.body.description),
      (movie.director = req.body.director),
      (movie.producer = req.body.producer),
      (movie.studio = req.body.studio),
      (movie.year = req.body.year),
      (movie.rating = req.body.rating),
      (movie.likes = req.body.likes),
      (movie.image_path = req.body.image_path),
      await movie.save();
    res.send(movie);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put("/api/books/:id", async (req, res) => {
  try {
    let book = await Book.findOne({ _id: req.params.id });
    (book.title = req.body.title),
      (book.description = req.body.description),
      (book.author = req.body.author),
      (book.publisher = req.body.publisher),
      (book.year = req.body.year),
      (book.pages = req.body.pages),
      (book.likes = req.body.likes),
      (book.image_path = req.body.image_path),
      await book.save();
    res.send(book);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put("/api/characters/:id", async (req, res) => {
  try {
    let character = await Character.findOne({ _id: req.params.id });
    (character.name = req.body.name),
      (character.description = req.body.description),
      (character.species = req.body.species),
      (character.age = req.body.age),
      (character.likes = req.body.likes),
      (character.image_path = req.body.image_path),
      await character.save();
    res.send(character);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log("Server listening on port 3001!"));
