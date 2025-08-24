import axios from 'axios';

const API = 'http://localhost:8080/api/';

const instance = axios.create({
    baseURL: API,
    timeout: 10000,
});

instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
         if (error.response) {
        console.error("HTTP Error:", error.response.status, error.response.data);
        } 
        else if (error.request) {
        console.error("Network Error:", error.message);
        } 
        else {
        console.error("Error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default instance;