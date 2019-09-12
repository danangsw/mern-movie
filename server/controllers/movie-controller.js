const Movie = require('../models/movie-model')

createMovie = (req, res) => {
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
        if (err) {
            console.error(err)
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }

        movie.title = body.title
        movie.synopsis = body.synopsis
        movie.director = body.director
        movie.writers = body.writers
        movie.stars = body.stars
        movie.rating = body.rating
        movie.showtimes = body.showtimes
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
        if (err) {
            return res.status(400).json({ success: false, error: 'You must provide a body to delete' })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
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
        if (err) {
            console.error(err)
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
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
        if (err) {
            console.error(err)
            return res.status(400).json({ success: false, error: err })
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
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
