import axios from 'axios'
// const {axios} = Vue

// const apiHost = 'http://localhost:3000'
const apiHost = 'http://192.168.16.139:3000'

export const getMovieById = (id) => axios.get(`${apiHost}/movie/subject/${id}`)

export const getMovies = (type, start, count) => axios.get(`${apiHost}/movie/${type}`, { params: { start, count } })

export const getInTheater = (start, count) => axios.get(`${apiHost}/movie/in_theaters`, { params: { start, count } })

export const getComingSoon = (start, count) => axios.get(`${apiHost}/movie/coming_soon`, { params: { start, count } })

export const getUSRank = (start, count) => axios.get(`${apiHost}/movie/us_box`, { params: { start, count } })

export const getMoviesByTag = (tag, start, count) => axios.get(`${apiHost}/movie/search`, { params: { start, count, tag } })

export const getMovieRecommand = (id, start, count) => axios.get(`${apiHost}/movie/recommand/${id}`, { params: { start, count } })