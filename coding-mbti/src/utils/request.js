import axios from 'axios';

const baseAPIURL = 'http://localhost:8000/api/';
const axiosInstance = axios.create({
    baseURL: baseAPIURL,
});

export default axiosInstance;
