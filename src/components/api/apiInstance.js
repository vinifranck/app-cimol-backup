const axios = require('axios');

const axiosInstance = axios.create({
   // baseURL: 'https://www.googleapis.com/books/v1',
   baseURL: 'http://localhost:3000',
});

export default axiosInstance;
