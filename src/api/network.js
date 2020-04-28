import axios from 'axios';
import { AsyncStorage } from 'react-native';

let url = "http://172.20.10.8:5000";

const instance = axios.create({
  baseURL: url
});

instance.interceptors.request.use(
  async config => {
    const cookie = await AsyncStorage.getItem('cookie');
    if (cookie) {
      config.headers.Authorization = `Bearer ${cookie}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;
