import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const deployUrl = import.meta.env.VITE_DEPLOY_URL
export default axios.create({
    baseURL: deployUrl
});