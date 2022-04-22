import axios from 'axios';


export const createApi = () => axios.create({
  baseURL: `http://localhost:3001`,
  timeout: 5000,
  withCredentials: true
});
