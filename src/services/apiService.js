import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const uploadFile = (data) => {
  return apiClient.post('/upload', data);
};

export const getGroups = () => {
  return apiClient.get('/groups');
};

export const updatedGroups = (data) => {
  return apiClient.put('/groups', data);
};

export const postMultiplicators = (data) => {
  return apiClient.post('/multiplicators', data);
};

export const postData = () => {
  return apiClient.post('/data');
};
