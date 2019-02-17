import axios from 'axios';

export const routes = {
    countries: 'https://api.myjson.com/bins/15rx60',
};

const client = axios.create();

export default client;