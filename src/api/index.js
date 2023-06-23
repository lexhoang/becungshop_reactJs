import axios from 'axios';

const instances = axios.create({
    baseURL: 'https://becungshop-backend.vercel.app/'
});
export default instances;