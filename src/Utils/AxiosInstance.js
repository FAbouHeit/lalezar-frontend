import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5100',
    withCredentials: true
})

export default axiosInstance
