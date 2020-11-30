import axios from 'axios';

const baseAPIURL = process.env.REACT_APP_BACKEND_URL;

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
