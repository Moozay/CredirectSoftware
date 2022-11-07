import axios from 'axios'

const baseURL = 'http://192.168.11.200:8000/api/v1/'

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