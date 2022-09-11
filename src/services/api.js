import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  headers: { Accept: "application/json" },
});

const getCurrentWeather = async (city) => {
  try {
    const res = await instance.get(
      `/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getForecast = async (city) => {
  try {
    const res = await instance.get(
      `/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
    
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export { getCurrentWeather, getForecast};
