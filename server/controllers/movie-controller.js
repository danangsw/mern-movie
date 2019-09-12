const Movie = require('../models/movie-model')

createMovie = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to create!',
        })
    }

    const movie = new Movie(body)

    if (!movie) {
        return res.status(400).json({ success: false, error: 'Failed to mapping a body data to movie schema!' })
    }

    await Movie.find({ title: movie.title, director: movie.director }, (error, movies) => {
        if(movies && movies.length > 0) {
            return res.status(400).json({ success: false, error: 'Failed to create. Duplicate data!' })
        }

        movie
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: movie._id,
                message: 'Movie created!',
            })
        })
        .catch(error => {
            console.error(error)
            return res.status(400).json({
                error,
                message: 'Failed to create movie!',
            })
        })
    })
}

updateMovie = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update!',
        })
    }

    await Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        movie.title = body.title ? body.title : movie.title
        movie.synopsis = body.synopsis ? body.synopsis : movie.synopsis
        movie.director = body.director ? body.director : movie.director
        movie.writers = body.writers ? body.writers : movie.writers
        movie.stars = body.stars ? body.stars : movie.stars
        movie.rating = body.rating ? body.rating : movie.rating
        movie.showtimes = body.showtimes ? body.showtimes : movie.showtimes
        movie
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: movie._id,
                    message: 'Movie updated!',
                })
            })
            .catch(error => {
                console.error(error)
                return res.status(404).json({
                    error,
                    message: 'Failed to update Movie!',
                })
            })
    })
}

deleteMovie = async (req, res) => {
    await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: movie, message: 'Movie deleted!' })
    })
    .catch(error => {
        console.error(error)
        return res.status(400).json({
            error,
            message: 'Failed to delete Movie!',
        })
    })
}

findMovieById = async (req, res) => {
    await Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        if (err) {
            console.error(err)
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: movie })
    })
    .catch(error => {
        console.error(error)
        return res.status(400).json({
            error,
            message: 'Failed to find a Movie!',
        })
    })
}

findAllMovies = async (req, res) => {
    await Movie.find({}, (err, movies) => {
        if (!movies | !movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        if (err) {
            console.error(err)
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: movies })
    })
    .catch(error => {
        console.error(error)
        return res.status(400).json({
            error,
            message: 'Failed to find all Movie!',
        })
    })
}

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    findMovieById,
    findAllMovies
}
