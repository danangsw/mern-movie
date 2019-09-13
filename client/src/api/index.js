import Axios from 'axios'

const api = Axios.create({
    baseURL: 'http://localhost:3000/api/v0.1'
})

export const createMovie = payload => api.post(`/movie`,payload)
export const getAllMovies = () => api.get(`/movies`)
export const getMovieById = id => api.get(`/movie/${id}`)
export const updateMovie = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovie = id => api.delete(`/movie/${id}`)

const movieApis = {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
}

export default movieApis