import axios from 'axios'

const apiHost = 'https://api.vdorchan.com'
// const apiHost = 'http://localhost:8080'

axios.defaults.withCredentials = true

export const getMovieById = id => axios.get(`${apiHost}/movie/subject/${id}`)

export const getMovieRecommand = (id, start, count) => axios.get(`${apiHost}/movie/subject/${id}/recommands/`, { params: { start, count } })

export const getMovies = (type, start, count) => axios.get(`${apiHost}/movie/${type}`, { params: { start, count } })

export const getInTheater = (start, count) => axios.get(`${apiHost}/movie/in_theaters`, { params: { start, count } })

export const getComingSoon = (start, count) => axios.get(`${apiHost}/movie/coming_soon`, { params: { start, count } })

export const searchMovies = (tag, start, count) => axios.get(`${apiHost}/movie/search`, { params: { start, count, tag } })

export const login = (nickname, password) => axios.post(`${apiHost}/session`, { nickname, password })

export const logout = (nickname, password) => axios.delete(`${apiHost}/session`)

export const register = (nickname, password) => axios.post(`${apiHost}/user`, { nickname, password })

export const getUser = () => axios.get(`${apiHost}/session`)

export const addToFavorites = movie => axios.post(`${apiHost}/favorites`, { movie })

export const removeFromFavorites = movieId => axios.delete(`${apiHost}/favorites/`, { params: { movieId } })
