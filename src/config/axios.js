// Imports
import axios from 'axios'

console.log(process.env.VUE_APP_BACKEND_URL)
const AxiosConfig = axios.create({
    baseURL: `${process.env.VUE_APP_BACKEND_URL}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    }
})

export default AxiosConfig
