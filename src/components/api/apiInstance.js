import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: 'http://localhost:3000',
});

export default axiosInstance;
