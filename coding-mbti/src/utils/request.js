import axios from 'axios';

const baseAPIURL = 'http://localhost:8000/api/';
const axiosInstance = axios.create({
    baseURL: baseAPIURL,
    withCredentials: true,
    headers: {
        Authorization: `Token ${localStorage.getItem('token') || null}`
    },
});
axiosInstance.defaults.xsrfCookieName = 'csrftoken';
axiosInstance.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

export default axiosInstance;
