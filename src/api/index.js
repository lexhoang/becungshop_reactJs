import axios from 'axios';

const instances = axios.create({
    baseURL: 'https://becungshop-backend.vercel.app/'
    // baseURL: 'http://localhost:8080/'
})

export default instances;