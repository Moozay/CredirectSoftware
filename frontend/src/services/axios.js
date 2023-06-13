import axios from 'axios'

const baseURL = 'http://197.230.72.125:8000/api/v1/'

const axiosInstance = axios.create({
    baseURL
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance