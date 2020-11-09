import axios from 'axios';

const baseAPIURL = 'api/';
const axiosInstance = axios.create({
    baseURL: baseAPIURL,
});

export default axiosInstance;
