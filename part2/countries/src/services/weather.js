import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${api_key}`;

const getWeather = (capital) => {
  const request = axios.get(`${baseUrl}&q=${capital}&aqi=no`);

  return request.then((response) => response.data);
};

const weatherService = { getWeather };

export default weatherService;
