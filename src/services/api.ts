import axios from 'axios';

const api = axios.create({
    baseURL: `https://library-api-igrek.azurewebsites.net`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;