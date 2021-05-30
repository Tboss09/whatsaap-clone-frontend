import axios from 'axios'

export const instance = axios.create({
    baseUrl: 'http://localhost:5000/'
})