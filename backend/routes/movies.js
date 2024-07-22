const express = require("express");
const router = express.Router();
const app = express();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { Movies } = require("../db");
const { authMiddleware } = require("../middlewares/authMiddleware");

//here we will get all the requests as /api/movies/favorites


// URL: POST /api/movies/favorites
// Add a movie to the user’s list of favorite movies.
// Store movie details and user reference in MongoDB Atlas.
router.post("/favorites", authMiddleware, async (req, res) => {
    const body = req.body;
    const favoriteMovie = await Movies.create(body);
    res.status(201).json(favoriteMovie);
});


// URL: GET /api/movies/favorites
// Fetch the list of favorite movies for the logged-in user.
router.get("/favorites", authMiddleware, async (req, res) => {
    const favoriteMovies = await Movies.find({userId: req.user._id});
    res.status(201).send(favoriteMovies);
});


// URL: DELETE /api/movies/favorites/:movieId
// Remove a movie from the user’s list of favorite movies.
router.delete("/favorites/:movieId", authMiddleware, async (req, res) => {
    await Movies.deleteOne({movieId: req.params.movieId,
        userId: req.user._id
    })
    res.status(201).send({
        message: "favorite removed"
    })
});


module.exports = router;