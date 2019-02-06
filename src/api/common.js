import axios from 'axios';

export const routes = {
    rules: '',
    countries: 'https://pastebin.com/raw/sHWRWzEn',
};

const client = axios.create();

export default client;