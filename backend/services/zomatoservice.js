// services/zomatoService.js
import axios from 'axios';

const zomatoAPI = axios.create({
  baseURL: 'https://zomato-api1.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'zomato-api1.p.rapidapi.com'
  }
});

export const searchRestaurants = async (query) => {
  const response = await zomatoAPI.get(`/search`, {
    params: { q: query }
  });
  return response.data;
};
