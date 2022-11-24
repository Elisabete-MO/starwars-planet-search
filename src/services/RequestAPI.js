import axios from 'axios';

const requestAPIFetch = async () => {
  try {
    const request = await fetch('https://swapi.dev/api/planets');
    const { results } = await request.json();
    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const axiosAPI = axios.create({
  baseURL: 'https://swapi.dev/api/planets',
});

export const requestAPIAxios = async () => {
  try {
    const { data: { results } } = await axiosAPI.get('/character');
    console.log('axios', results);
    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default requestAPIFetch;
