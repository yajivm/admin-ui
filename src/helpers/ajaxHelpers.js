import axios from 'axios';
import Config from '../config';

const { BASE_URL } = Config;

const ajax = axios.create({
  baseURL: BASE_URL,
});

export default ajax;