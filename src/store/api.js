import axios from 'axios'

const apiHost = process.env.NODE_ENV === 'production' ? 'https://api.vdorchan.com' : 'http://localhost:8080'

axios.defaults.withCredentials = true

export const getMovieById = id => axios.get(`${apiHost}/movie/subject/${id}`)

export const getMovieRecommand = (id, start, count) => axios.get(`${apiHost}/movie/subject/${id}/recommands/`, { params: { start, count } })

export const getMovies = (type, start, count) => axios.get(`${apiHost}/movie/${type}`, { params: { start, count } })

export const getInTheater = (start, count) => axios.get(`${apiHost}/movie/in_theaters`, { params: { start, count } })

export const getComingSoon = (start, count) => axios.get(`${apiHost}/movie/coming_soon`, { params: { start, count } })

export const searchMovies = (tag, start, count) => axios.get(`${apiHost}/movie/search`, { params: { start, count, tag } })

export const login = (nickname, password) => axios.post(`${apiHost}/auth/login`, { nickname, password })

export const logout = (nickname, password) => axios.delete(`${apiHost}/session`)

export const register = (email, nickname, password, captcha) => axios.post(`${apiHost}/user`, { email, nickname, password, captcha })

export const sendCaptcha = email => axios.post(`${apiHost}/user/captcha`, { email })

export const getUser = () => axios.get(`${apiHost}/auth/profile`)

export const addToFavorites = movie => axios.post(`${apiHost}/favorites`, { movie })

export const removeFromFavorites = movieId => axios.delete(`${apiHost}/favorites/`, { params: { movieId } })
