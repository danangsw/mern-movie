const express = require('express')

const MovieController = require('../controllers/movie-controller')

const router = express.Router()

router.post('/movie', MovieController.createMovie)
router.put('/movie/:id', MovieController.updateMovie)
router.delete('/movie/:id', MovieController.deleteMovie)
router.get('/movie/:id', MovieController.findMovieById)
router.get('/movies', MovieController.findAllMovies)

module.exports = router
